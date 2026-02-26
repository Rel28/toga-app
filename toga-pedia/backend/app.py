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

class Criteria(db.Model):
    __tablename__ = 'criteria'
    id = db.Column(db.Integer, primary_key=True)
    kode = db.Column(db.String(5))
    nama_kriteria = db.Column(db.String(50))
    # ... atribut lain opsional jika tidak dipakai API

class SubCriteria(db.Model):
    __tablename__ = 'sub_criteria'
    id = db.Column(db.Integer, primary_key=True)
    criteria_id = db.Column(db.Integer, db.ForeignKey('criteria.id'))
    label = db.Column(db.String(100))
    nilai = db.Column(db.Integer)
    
    # Relasi untuk join
    criteria = db.relationship('Criteria', backref='sub_criteria')

# ==============================================================================
# ALGORITMA HYBRID: SAW + TOPSIS
# ==============================================================================
def hitung_spk(df, weights):
    """
    Metode Hybrid:
    1. Normalisasi Matris menggunakan SAW (Min/Val atau Val/Max sesuai Cost/Benefit)
    2. Hitung Matriks Terbobot (y_ij = w_i * r_ij)
    3. Cari Solusi Ideal Positif & Negatif (A+ & A-)
    4. Hitung Jarak (D+ & D-)
    5. Hitung Nilai Preferensi (V_i)
    """

    # 1. NORMALISASI MATRIKS (METODE SAW)
    
    R = pd.DataFrame()
    
    # C1 (Cost)
    min_c1 = df['c1_panen'].min()
    R['c1'] = min_c1 / df['c1_panen']
    
    # C2 (Benefit)
    max_c2 = df['c2_manfaat'].max()
    R['c2'] = df['c2_manfaat'] / max_c2
    
    # C3 (Cost) - Ingat: 1=Mudah (Best), 3=Sulit (Worst)
    min_c3 = df['c3_kesulitan'].min()
    R['c3'] = min_c3 / df['c3_kesulitan']
    
    # C4 (Cost) - Ingat: 1=Sempit (Best), 3=Luas (Worst)
    min_c4 = df['c4_lahan'].min()
    R['c4'] = min_c4 / df['c4_lahan']
    
    # C5 (Cost) - Ingat: 1=Sederhana (Best), 3=Rumit (Worst)
    min_c5 = df['c5_pengolahan'].min()
    R['c5'] = min_c5 / df['c5_pengolahan']
    
    # C6 (Benefit) - Ingat: 1=Murah, 7=Mahal (Best)
    max_c6 = df['c6_range_harga'].max()
    R['c6'] = df['c6_range_harga'] / max_c6
    
    # 2. HITUNG MATRIKS TERBOBOT

    # Normalisasi bobot agar jumlahnya 1
    total_w = sum(weights)
    W = [w/total_w for w in weights]

    Y = pd.DataFrame()
    Y['c1'] = R['c1'] * W[0]
    Y['c2'] = R['c2'] * W[1]
    Y['c3'] = R['c3'] * W[2]
    Y['c4'] = R['c4'] * W[3]
    Y['c5'] = R['c5'] * W[4]
    Y['c6'] = R['c6'] * W[5]
    
    # 3. CARI SOLUSI IDEAL POSITIF & NEGATIF
    A_plus = Y.max()
    A_minus = Y.min()
    
    # 4. HITUNG JARAK IDEAL POSITIF & NEGATIF
    D_plus = np.sqrt(((A_plus - Y) ** 2 ).sum(axis=1))
    D_minus = np.sqrt(((Y - A_minus) ** 2 ).sum(axis=1))

    # 5. HITUNG NILAI PREFERENSI
    V = D_minus / (D_plus + D_minus + 1e-9)

    return V


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

    # Pengambilan Panen Label
    panen_label = f"{item.c1_panen} Bulan" if item.c1_panen else "-"

    # Kriteria yang diambil dari SubCriteria
    config_mapping = [
        ('kesulitan', 'C3', item.c3_kesulitan),
        ('lahan', 'C4', item.c4_lahan),
        ('pengolahan', 'C5', item.c5_pengolahan),
    ]

    labels = {}

    labels['panen'] = panen_label

    # Loop mencari label sisa
    for key, kode, val in config_mapping:
        if val is None:
            labels[key] = "-"
            continue

        sub = SubCriteria.query.join(Criteria).filter(
            Criteria.kode == kode,
            SubCriteria.nilai == val
        ).first()

        if sub:
            labels[key] = sub.label
        else:
            labels[key] = f"Level {val}"
    
    response['labels'] = labels

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
    query = """SELECT a.*, c.nama_kategori 
    FROM alternatives a
    LEFT JOIN categories c ON a.category_id = c.id"""
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

    # 4. Hitung Hybrid SAW + TOPSIS pada data terfilter
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
                'image': None,
                'kategori': row['nama_kategori'] if pd.notnull(row['nama_kategori']) else "Umum",
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