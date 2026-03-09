from flask import Blueprint, request, jsonify

# Blueprint untuk tanaman
tanaman_bp = Blueprint('tanaman', __name__, url_prefix='/admin/tanaman')

# Global list
db = None
Category = None
Alternative = None

def init_tanaman_routes(database, category_model, alternative_model):
    global db, Category, Alternative
    db = database
    Category = category_model
    Alternative = alternative_model

# ==============================================================================
# CRUD TANAMAN
# ==============================================================================

@tanaman_bp.route('', methods=['POST'])
def create_tanaman():
    data = request.json

    # Validasi input
    required_fields = ['nama', 'kategori', 'deskripsi', 'kegunaan', 'harga_bibit', 'harga_panen', 'masa_panen', 'image']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Cari kategori berdasarkan nama
    kategori = Category.query.filter_by(nama_kategori=data.get('kategori')).first()
    if not kategori:
        return jsonify({'error': 'Kategori tidak ditemukan'}), 404
    
    # Buat tanaman baru
    new_tanaman = Alternative(
        category_id=kategori.id,
        nama_tanaman=data.get('nama'),
        deskripsi_pendek=data.get('deskripsi'),
        detail_kegunaan=';'.join(data.get('kegunaan')) if isinstance(data.get('kegunaan'), list) else data.get('kegunaan'),
        harga_bibit=data.get('harga'),
        harga_hasil_panen=data.get('harga_panen'),
        masa_panen=data.get('masa_panen'),
        image=data.get('image'),
        c1_panen=data.get('panen'),
        c2_manfaat=data.get('manfaat'),
        c3_kesulitan=int(data.get('kesulitan')) if data.get('kesulitan') else None,
        c4_lahan=int(data.get('lahan')) if data.get('lahan') else None,
        c5_pengolahan=int(data.get('pengolahan')) if data.get('pengolahan') else None,
        c6_range_harga=int(data.get('harga_range')) if data.get('harga_range') else None
    )

    db.session.add(new_tanaman)
    db.session.commit()

    return jsonify({
        'status': 'success', 
        'message': 'Tanaman berhasil ditambahkan', 
        'id': new_tanaman.id
    }), 201

@tanaman_bp.route('/<int:id>', methods=['DELETE'])
def delete_tanaman(id):
    try:
        tanaman = Alternative.query.get_or_404(id)
        nama_tanaman = tanaman.nama_tanaman

        db.session.delete(tanaman)
        db.session.commit()

        return jsonify({'status': 'success', 'message': f'Tanaman {nama_tanaman} berhasil dihapus'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'status': 'error', 'message': str(e)}), 500

@tanaman_bp.route('/<int:id>', methods=['PUT'])
def update_tanaman(id):
    try:
        tanaman = Alternative.query.get_or_404(id)
        data = request.json

        # Update kategori jika ada
        if 'kategori' in data:
            kategori = Category.query.filter_by(nama_kategori=data.get('kategori')).first()
            if kategori:
                tanaman.category_id = kategori.id
            else:
                return jsonify({'status': 'error', 'message': 'Kategori tidak ditemukan'}), 404
        
        # Update field lainnya
        if 'nama' in data:
            tanaman.nama_tanaman = data.get('nama')
        if 'deskripsi' in data:
            tanaman.deskripsi_pendek = data.get('deskripsi')
        if 'kegunaan' in data:
            val = data.get('kegunaan')
            tanaman.detail_kegunaan = ';'.join(val) if isinstance(val, list) else val
        if 'harga_bibit' in data:
            tanaman.harga_asli = data.get('harga_bibit')
        if 'harga_panen' in data:
            tanaman.harga_hasil_panen = data.get('harga_panen')
        if 'masa_panen' in data:
            tanaman.masa_panen = data.get('masa_panen')
        if 'image' in data:
            tanaman.image = data.get('image')
        if 'panen' in data:
            tanaman.c1_panen = int(data.get('panen')) if data.get('panen') else None
        if 'manfaat' in data:
            tanaman.c2_manfaat = int(data.get('manfaat')) if data.get('manfaat') else None
        if 'kesulitan' in data:
            tanaman.c3_kesulitan = int(data.get('kesulitan')) if data.get('kesulitan') else None
        if 'lahan' in data:
            tanaman.c4_lahan = int(data.get('lahan')) if data.get('lahan') else None
        if 'pengolahan' in data:
            tanaman.c5_pengolahan = int(data.get('pengolahan')) if data.get('pengolahan') else None
        if 'harga_range' in data:
            tanaman.c6_range_harga = int(data.get('harga_range')) if data.get('harga_range') else None

        db.session.commit()

        return jsonify({
            'status': 'success',
            'message': f'Tanaman {tanaman.nama_tanaman} berhasil diperbarui'
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'status': 'error', 
            'message': str(e)}), 500
    
    
