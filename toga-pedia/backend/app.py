from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from routes.crud_kategori import kategori_bp, init_kategori_routes
from routes.crud_tanaman import tanaman_bp, init_tanaman_routes
from routes.crud_subkriteria import subkriteria_bp,init_subkriteria_routes
from routes.crud_penanaman import penanaman_bp, init_penanaman_routes
from routes.crud_pengolahan import pengolahan_bp, init_pengolahan_routes
from routes.crud_kriteria import kriteria_bp, init_kriteria_routes
import pandas as pd
import numpy as np
import google.generativeai as genai
from werkzeug.security import check_password_hash

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:theepic28@localhost/toga_db_2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inisialisasi SQLAlchemy
db = SQLAlchemy(app)

# API Key Chatbot Gemini (GEMINI-3-FLASH-PREVIEW)
genai.configure(api_key="AIzaSyByTegs5cFY_BrKfPA3voPIZJJWFdorHH8")

# SECRET_KEY untuk session login admin
app.secret_key = 'ce5d52ee31095bd051dc6f82d253478935bba70e91acd0b5'


# ==============================================================================
# DEFINISI MODEL (MENCERMINKAN STRUKTUR DATABASE BARU)
# ==============================================================================

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    nama_kategori = db.Column(db.String(50))
    deskripsi = db.Column(db.Text)
    def to_dict(self):
        return {
            'id': self.id,
            'nama_kategori': self.nama_kategori,
            'deskripsi': self.deskripsi
        }

class Alternative(db.Model):
    __tablename__ = 'alternatives'
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    nama_tanaman = db.Column(db.String(100))
    deskripsi_pendek = db.Column(db.Text)
    detail_kegunaan = db.Column(db.Text)
    
    harga_bibit = db.Column(db.String(50))
    harga_hasil_panen = db.Column(db.String(50))
    masa_panen = db.Column(db.String(50))
    image_url = db.Column(db.String(255))
    
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
            'kategori': self.category.nama_kategori if self.category else "Umum",
            'deskripsi': self.deskripsi_pendek,
            'kegunaan': self.detail_kegunaan.split(';') if self.detail_kegunaan else [],
            'harga_bibit': self.harga_bibit,
            'harga_panen': self.harga_hasil_panen,
            'masa_panen': self.masa_panen,
            'image': self.image_url,
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

    def to_dict(self):
        return {
            'id': self.id,
            'alternative_id': self.alternative_id,
            'nama_tanaman': self.alternative.nama_tanaman if self.alternative else None,
            'metode': self.metode if self.metode else '',
            'langkah': self.langkah_langkah.split(';') if self.langkah_langkah else [],
        }

class ProcessingGuide(db.Model):
    __tablename__ = 'processing_guides'
    id = db.Column(db.Integer, primary_key=True)
    alternative_id = db.Column(db.Integer, db.ForeignKey('alternatives.id'))
    nama_olahan = db.Column(db.String(100))
    kegunaan_olahan = db.Column(db.Text)
    langkah_langkah = db.Column(db.Text)
    dosis_pemakaian = db.Column(db.String(100))

    def to_dict(self):
        return {
            'id': self.id,
            'alternative_id': self.alternative_id,
            'nama_tanaman': self.alternative.nama_tanaman if self.alternative else None,
            'olahan': self.nama_olahan if self.nama_olahan else '',
            'kegunaan_olahan': self.kegunaan_olahan if self.kegunaan_olahan else '',
            'langkah': self.langkah_langkah.split(';') if self.langkah_langkah else [],
            'dosis': self.dosis_pemakaian if self.dosis_pemakaian else ''
        }

class Criteria(db.Model):
    __tablename__ = 'criteria'
    id = db.Column(db.Integer, primary_key=True)
    kode = db.Column(db.String(5))
    nama_kriteria = db.Column(db.String(50))
    atribut = db.Column(db.String(10)) # 'cost' atau 'benefit'
    bobot_default = db.Column(db.Float)
    
    def to_dict(self):
        return {
            'id': self.id,
            'kode': self.kode,
            'nama_kriteria': self.nama_kriteria,
            'atribut': self.atribut,
            'bobot': self.bobot_default
        }

class SubCriteria(db.Model):
    __tablename__ = 'sub_criteria'
    id = db.Column(db.Integer, primary_key=True)
    criteria_id = db.Column(db.Integer, db.ForeignKey('criteria.id'))
    label = db.Column(db.String(100))
    nilai = db.Column(db.Integer)
    # Relasi untuk join
    criteria = db.relationship('Criteria', backref='sub_criteria')

    def to_dict(self):
        return {
            'id': self.id,
            'label': self.label,
            'nilai': self.nilai,
            'kode': self.criteria.kode if self.criteria else None,
        }
        
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    password_hash = db.Column(db.String(255), nullable=False)

class Feedbacks(db.Model):
    __tablename__ = 'feedbacks'
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), default='Pengguna') 
    pesan = db.Column(db.Text, nullable=False)
    tanggal = db.Column(db.DateTime, default=db.func.current_timestamp())
    
    def to_dict(self):
        return {
            'id': self.id,
            'nama': self.nama,
            'pesan': self.pesan,
            'tanggal': str(self.tanggal),
        }


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
    data = Alternative.query.order_by(Alternative.id).all()
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

@app.route('/api/chat', methods=['POST'])
def chat_bot():
    try:
        input_user = request.json
        pesan = input_user.get('message', '').lower()

        # 1. Ambil semua data tanaman dari database
        tanaman_list = Alternative.query.all()
        
        # 2. Bangun konteks dari dataset
        konteks = ""
        for t in tanaman_list:
            planting = "; ".join([f"{p.metode}: {p.langkah_langkah}" for p in t.planting_guides]) or "Tidak ada data"
            processing = "; ".join([f"{p.nama_olahan}: {p.langkah_langkah}" for p in t.processing_guides]) or "Tidak ada data"
            konteks += f"""
---
Tanaman: {t.nama_tanaman}
Kategori: {t.category.nama_kategori if t.category else '-'}
Deskripsi: {t.deskripsi_pendek}
Kegunaan/Khasiat: {t.detail_kegunaan}
Cara Penanaman: {planting}
Cara Pengolahan: {processing}
Harga Bibit: {t.harga_bibit} | Harga Panen: {t.harga_hasil_panen} | Masa Panen: {t.masa_panen}
"""

        # 3. Prompt dengan instruksi ketat berbasis dataset
        system_prompt = f"""Kamu adalah 'Asisten TogaPedia'.
Kamu HANYA boleh menjawab berdasarkan data tanaman berikut ini. Jangan gunakan pengetahuan di luar data ini.
Jika pertanyaan tidak berkaitan dengan tanaman dalam data ini, jawab: "Maaf, saya hanya bisa menjawab seputar tanaman yang ada di TogaPedia."
Jawab dalam bahasa Indonesia yang santai dan ringkas.

=== DATA TANAMAN TOGAPEDIA ===
{konteks}
=== AKHIR DATA ===
"""
        
        full_prompt = f"{system_prompt}\n\nPertanyaan user: {pesan}\nAsisten TogaPedia:"
        
        model = genai.GenerativeModel('gemini-3-flash-preview')
        response = model.generate_content(full_prompt)
        
        return jsonify({'status': 'success', 'reply': response.text})

    except Exception as e:
        print(f"CHAT ERROR: {e}")
        return jsonify({'status': 'error', 'reply': 'Maaf, sistem asisten sedang sibuk atau error.'}), 500
    
@app.route('/api/feedback', methods=['POST'])
def kirim_feedback():
    data = request.get_json()
    pesan = data.get('pesan', '').strip()
    if not pesan:
        return jsonify({'error': 'Pesan tidak boleh kosong'}), 400
    fb = Feedbacks(nama=data.get('nama', 'Pengunjung'), pesan=pesan)
    db.session.add(fb)
    db.session.commit()
    return jsonify({'message': 'Feedback berhasil dikirim'}), 201

@app.route('/api/feedback', methods=['GET'])
def get_feedback():
    feedbacks = Feedbacks.query.order_by(Feedbacks.id.desc()).all()
    return jsonify([f.to_dict() for f in feedbacks])

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
            
            hasil.append({
                'id': int(row['id']),
                'nama': row['nama_tanaman'],
                'image': row['image_url'] if pd.notnull(row['image_url']) else None,
                'kategori': row['nama_kategori'] if pd.notnull(row['nama_kategori']) else "Umum",
                'skor': round(float(row['skor']) * 100, 2), # Persentase
                'harga_bibit': row['harga_bibit'] if pd.notnull(row['harga_bibit']) else '-',
                'harga_hasil_panen': row['harga_hasil_panen'] if pd.notnull(row['harga_hasil_panen']) else '-',
                'masa_panen': row['masa_panen'] if pd.notnull(row['masa_panen']) else '-',
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

@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    admin = User.query.filter_by(username=username).first()
    if admin and check_password_hash(admin.password_hash, password): 
        return jsonify({'status': 'success', 'message': 'Login berhasil'})
    else:
        return jsonify({'status': 'error', 'message': 'Login gagal'})

@app.route('/admin/logout', methods=['POST'])
def admin_logout():
    return jsonify({'status': 'success', 'message': 'Logout berhasil'})
    
    

init_kategori_routes(db, Category)
init_tanaman_routes(db, Category, Alternative)
init_subkriteria_routes(db, Criteria, SubCriteria)
init_penanaman_routes(db, PlantingGuide, Alternative)
init_pengolahan_routes(db, ProcessingGuide, Alternative)
init_kriteria_routes(db, Criteria)

app.register_blueprint(kategori_bp)
app.register_blueprint(tanaman_bp)
app.register_blueprint(subkriteria_bp)
app.register_blueprint(penanaman_bp)
app.register_blueprint(pengolahan_bp)
app.register_blueprint(kriteria_bp)

if __name__ == '__main__':
    with app.app_context():
        # Cek koneksi DB
        try:
            db.engine.connect()
            print("Berhasil terkoneksi ke Database PostgreSQL!")
        except Exception as e:
            print(f"Gagal konek DB: {e}")
            
    app.run(debug=True)