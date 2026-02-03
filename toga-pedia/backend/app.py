from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:theepic28@localhost/toga_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ==============================================================================
# DEFINISI MODEL (MENCERMINKAN STRUKTUR DATABASE BARU)
# ==============================================================================

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    nama_kategori = db.Column(db.String(50))
    deskripsi = db.Column(db.Text)

class Alternative(db.Model):
    __tablename__ = 'alternatives'
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    nama_tanaman = db.Column(db.String(100))
    deskripsi_pendek = db.Column(db.String(255))
    detail_kegunaan = db.Column(db.Text)
    harga_asli = db.Column(db.Numeric(15,2))
    
    # Nilai Kriteria
    c1_panen = db.Column(db.Integer)
    c2_manfaat = db.Column(db.Integer)
    c3_kesulitan = db.Column(db.Integer)
    c4_lahan = db.Column(db.Integer)
    c5_pengolahan = db.Column(db.Integer)
    c6_range_harga = db.Column(db.Integer)

    # Relasi
    category = db.relationship('Category', backref='alternatives')
    planting_guides = db.relationship('PlantingGuide', backref='alternative', lazy=True)
    processing_guides = db.relationship('ProcessingGuide', backref='alternative', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'nama': self.nama_tanaman,
            'image': None,
            'kategori': self.category.nama_kategori if self.category else "Umum",
            'deskripsi': self.deskripsi_pendek,
            'kegunaan': self.detail_kegunaan,
            'harga': float(self.harga_asli) if self.harga_asli else 0,
            # Data Kriteria (Opsional dikirim ke frontend)
            'scores': {
                'panen': self.c1_panen,
                'manfaat': self.c2_manfaat,
                'kesulitan': self.c3_kesulitan,
                'lahan': self.c4_lahan,
                'pengolahan': self.c5_pengolahan,
                'harga_range': self.c6_range_harga
            }
        }

class PlantingGuide(db.Model):
    __tablename__ = 'planting_guides'
    id = db.Column(db.Integer, primary_key=True)
    alternative_id = db.Column(db.Integer, db.ForeignKey('alternatives.id'))
    metode = db.Column(db.String(100))
    langkah_langkah = db.Column(db.Text)
    estimasi_hari = db.Column(db.Integer)

    def to_dict(self):
        return {
            'metode': self.metode,
            'langkah': self.langkah_langkah.split(';') if self.langkah_langkah else [],
            'estimasi': self.estimasi_hari
        }

class ProcessingGuide(db.Model):
    __tablename__ = 'processing_guides'
    id = db.Column(db.Integer, primary_key=True)
    alternative_id = db.Column(db.Integer, db.ForeignKey('alternatives.id'))
    nama_olahan = db.Column(db.String(100))
    langkah_langkah = db.Column(db.Text)
    dosis_pemakaian = db.Column(db.String(100))

    def to_dict(self):
        return {
            'olahan': self.nama_olahan,
            'langkah': self.langkah_langkah.split(';') if self.langkah_langkah else [],
            'dosis': self.dosis_pemakaian
        }

# ==============================================================================
# ALGORITMA SPK (SAW - Simple Additive Weighting)
# ==============================================================================
def hitung_spk(df, weights):
    # weights: [w1, w2, w3, w4, w5, w6]
    # Atribut Kriteria:
    # C1 (Panen)      : Cost (Semakin cepat semakin baik)
    # C2 (Manfaat)    : Benefit (Semakin banyak semakin baik)
    # C3 (Kesulitan)  : Cost (Semakin mudah/kecil angkanya semakin baik) -> 1=Mudah, 3=Sulit
    # C4 (Lahan)      : Cost (Semakin sempit/kecil angkanya semakin baik) -> 1=Sempit, 3=Luas
    # C5 (Pengolahan) : Cost (Semakin sederhana/kecil angkanya semakin baik) -> 1=Sederhana, 3=Rumit
    # C6 (Harga)      : Benefit (Semakin mahal semakin untung buat petani) -> 7=Mahal
    
    # 1. Normalisasi
    # Cost: Min / Nilai
    # Benefit: Nilai / Max
    
    df_norm = pd.DataFrame()
    
    # C1 (Cost)
    min_c1 = df['c1_panen'].min()
    df_norm['c1'] = min_c1 / df['c1_panen']
    
    # C2 (Benefit)
    max_c2 = df['c2_manfaat'].max()
    df_norm['c2'] = df['c2_manfaat'] / max_c2
    
    # C3 (Cost) - Ingat: 1=Mudah (Best), 3=Sulit (Worst)
    min_c3 = df['c3_kesulitan'].min()
    df_norm['c3'] = min_c3 / df['c3_kesulitan']
    
    # C4 (Cost) - Ingat: 1=Sempit (Best), 3=Luas (Worst)
    min_c4 = df['c4_lahan'].min()
    df_norm['c4'] = min_c4 / df['c4_lahan']
    
    # C5 (Cost) - Ingat: 1=Sederhana (Best), 3=Rumit (Worst)
    min_c5 = df['c5_pengolahan'].min()
    df_norm['c5'] = min_c5 / df['c5_pengolahan']
    
    # C6 (Benefit) - Ingat: 1=Murah, 7=Mahal (Best)
    max_c6 = df['c6_range_harga'].max()
    df_norm['c6'] = df['c6_range_harga'] / max_c6
    
    # 2. Perankingan (Kalikan dengan Bobot)
    # Total Skor = (N1*W1) + (N2*W2) + ...
    
    # Pastikan bobot berjumlah 1 (atau normalisasi bobot dulu)
    total_w = sum(weights)
    norm_weights = [w/total_w for w in weights]
    
    df_norm['skor_akhir'] = (
        (df_norm['c1'] * norm_weights[0]) +
        (df_norm['c2'] * norm_weights[1]) +
        (df_norm['c3'] * norm_weights[2]) +
        (df_norm['c4'] * norm_weights[3]) +
        (df_norm['c5'] * norm_weights[4]) +
        (df_norm['c6'] * norm_weights[5])
    )
    
    return df_norm['skor_akhir']

# ==============================================================================
# ROUTE API
# ==============================================================================

@app.route('/api/tanaman', methods=['GET'])
def get_all_tanaman():
    # Ambil semua data (JOIN otomatis via SQLAlchemy)
    data = Alternative.query.all()
    return jsonify([item.to_dict() for item in data])

@app.route('/api/tanaman/<int:id>', methods=['GET'])
def get_detail_tanaman(id):
    # Ambil detail + panduan tanam + panduan olah
    item = Alternative.query.get_or_404(id)
    
    response = item.to_dict()
    # Tambahkan data panduan (List of Objects)
    response['cara_menanam'] = [guide.to_dict() for guide in item.planting_guides]
    response['cara_mengolah'] = [guide.to_dict() for guide in item.processing_guides]
    
    return jsonify(response)

@app.route('/api/rekomendasi', methods=['POST'])
def get_rekomendasi():
    input_user = request.json
    
    # 1. Tangkap Input User
    # Filter Konteks (Penyakit/Kegunaan) - Opsional
    keyword_penyakit = input_user.get('penyakit', '').lower().strip()
    
    # Bobot Kriteria (Default jika user tidak geser slider)
    weights = [
        float(input_user.get('w_panen', 0.15)),      # C1
        float(input_user.get('w_manfaat', 0.20)),    # C2
        float(input_user.get('w_kesulitan', 0.15)),  # C3
        float(input_user.get('w_lahan', 0.20)),      # C4
        float(input_user.get('w_pengolahan', 0.10)), # C5
        float(input_user.get('w_harga', 0.20))       # C6
    ]
    
    # 2. Ambil Data dari Database ke Pandas
    query = "SELECT * FROM alternatives"
    df = pd.read_sql(query, db.engine)
    
    # 3. LOGIKA HYBRID: Content-Based Filtering Dulu
    if keyword_penyakit:
        # Cari tanaman yang 'detail_kegunaan' mengandung kata kunci penyakit
        mask = df['detail_kegunaan'].str.lower().str.contains(keyword_penyakit)
        df_filtered = df[mask].copy()
        
        # Fallback: Jika tidak ditemukan, kembalikan semua data tapi beri notif
        if df_filtered.empty:
            match_status = "Tidak ditemukan spesifik, menampilkan rekomendasi umum."
            df_filtered = df.copy()
        else:
            match_status = f"Disaring berdasarkan keluhan: {keyword_penyakit}"
    else:
        df_filtered = df.copy()
        match_status = "Rekomendasi Umum"

    # 4. Jalankan SPK (SAW) pada data yang sudah difilter
    if len(df_filtered) > 0:
        skor = hitung_spk(df_filtered, weights)
        df_filtered['skor'] = skor
        
        # Urutkan dari skor tertinggi
        df_sorted = df_filtered.sort_values(by='skor', ascending=False)
        
        # Ambil Top 10 (atau semua)
        top_results = df_sorted.head(10)
        
        # Format JSON untuk Frontend
        hasil = []
        for _, row in top_results.iterrows():
            # Cari nama kategori manual (karena Pandas read_sql cuma bawa ID)
            # Opsional: Bisa join SQL di awal, tapi biar simpel kita query nama kategori belakangan atau biarkan ID
            # Agar cepat, kita biarkan di frontend yang mapping, atau query lagi
            
            hasil.append({
                'id': int(row['id']),
                'nama': row['nama_tanaman'],
                'skor': round(float(row['skor']) * 100, 2), # Persentase
                'harga_asli': float(row['harga_asli']),
                'deskripsi': row['deskripsi_pendek'],
                'match_info': match_status
            })
            
        return jsonify({
            'status': 'success',
            'match_info': match_status,
            'data': hasil
        })
    else:
        return jsonify({'status': 'empty', 'data': []})

if __name__ == '__main__':
    with app.app_context():
        # Cek koneksi DB
        try:
            db.engine.connect()
            print("Berhasil terkoneksi ke Database PostgreSQL!")
        except Exception as e:
            print(f"Gagal konek DB: {e}")
            
    app.run(debug=True)