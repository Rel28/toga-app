from flask import Blueprint, request, jsonify


# Blueprint untuk kategori
kategori_bp = Blueprint('kategori', __name__, url_prefix='/admin/kategori')

# Global list untuk menyimpan data kategori
db = None
Category = None

def init_kategori_routes(database, category_model):
    global db, Category
    db = database
    Category = category_model

# ==============================================================================
# CRUD KATEGORI
# ==============================================================================

# Read Data Kategori
@kategori_bp.route('', methods=['GET'])
def get_all_kategori():
    kategoris = Category.query.all()
    return jsonify([kat.to_dict() for kat in kategoris])


# Create Data Kategori
@kategori_bp.route('', methods=['POST'])
def create_kategori():
    data = request.json

    # Validasi input
    required_fields = ['nama_kategori', 'deskripsi']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
        
    # Cek apakah nama kategori sudah ada
    existing_kategori = Category.query.filter_by(nama_kategori=data.get('nama_kategori')).first()
    if existing_kategori:
        return jsonify({'error': 'Nama kategori sudah ada'}), 400
    
    try: 
        # Buat kategori baru
        new_kategori = Category(
            nama_kategori=data.get('nama_kategori'),
            deskripsi=data.get('deskripsi')
        )

        db.session.add(new_kategori)
        db.session.commit()

        return jsonify({
            'status': 'success',
            'message': 'Kategori berhasil ditambahkan',
            'id': new_kategori.id
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Edit Data Kategori
@kategori_bp.route('/<int:id>', methods=['PUT'])
def update_kategori(id):
    try:
        kategori = Category.query.get_or_404(id)
        data = request.json

        # Update field
        if 'nama_kategori' in data:
            kategori.nama_kategori = data['nama_kategori']
        if 'deskripsi' in data:
            kategori.deskripsi = data['deskripsi']
        
        db.session.commit()

        return jsonify({
            'status': 'success',
            'message': f'Kategori {kategori.nama_kategori} berhasil diperbarui'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Delete Data Kategori
@kategori_bp.route('/<int:id>', methods=['DELETE'])
def delete_kategori(id):
    try:
        kategori = Category.query.get_or_404(id)
        nama_kategori = kategori.nama_kategori

        # Cek apakah kategori masih digunakan
        if kategori.alternatives:
            return jsonify({
                'error': f'Kategori "{nama_kategori}" masih digunakan oleh {len(kategori.alternatives)} tanaman. Hapus tanaman terlebih dahulu.'
            }), 400

        db.session.delete(kategori)
        db.session.commit()

        return jsonify({
            'status': 'success', 
            'message': f'Kategori "{nama_kategori}" berhasil dihapus'
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


