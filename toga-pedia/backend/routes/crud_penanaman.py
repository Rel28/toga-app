from flask import Blueprint, request, jsonify

# Blueprint untuk penanaman
penanaman_bp = Blueprint('penanaman', __name__, url_prefix='/admin/penanaman')

# Global list
db = None
PlantingGuides = None
Alternative = None

def init_penanaman_routes(database, planting_guides_model, alternative_model):
    global db, PlantingGuides, Alternative
    db = database
    PlantingGuides = planting_guides_model
    Alternative = alternative_model

# ==============================================================================
# CRUD PENANAMAN
# ==============================================================================

@penanaman_bp.route('', methods=['GET'])
def get_all_penanaman():
    try:
        penanaman_list = PlantingGuides.query.join(Alternative).all()
        return jsonify([item.to_dict() for item in penanaman_list])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@penanaman_bp.route('', methods=['POST'])
def create_penanaman():
    try:
        data = request.get_json()
        nama_tanaman = data.get('nama_tanaman')
        metode = data.get('metode', '')
        langkah = data.get('langkah', [])
        
        # Cari alternative_id berdasarkan nama tanaman
        alternative = Alternative.query.filter_by(nama_tanaman=nama_tanaman).first()
        if not alternative:
            return jsonify({'error': 'Tanaman tidak ditemukan'}), 404
        
        # Cek apakah sudah ada data penanaman untuk tanaman ini
        existing = PlantingGuides.query.filter_by(alternative_id=alternative.id).first()
        if existing:
            return jsonify({'error': 'Data penanaman untuk tanaman ini sudah ada'}), 400
        
        langkah_str = ';'.join(langkah) if langkah else ''
        # Buat data penanaman baru
        new_penanaman = PlantingGuides(
            alternative_id=alternative.id,
            metode=metode,
            langkah_langkah=langkah_str
        )
        
        db.session.add(new_penanaman)
        db.session.commit()
        
        return jsonify({
            'message': 'Data penanaman berhasil ditambahkan',
            'data': new_penanaman.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@penanaman_bp.route('/<int:id>', methods=['PUT'])
def update_penanaman(id):
    try:
        data = request.get_json()
        penanaman = PlantingGuides.query.get(id)
        
        if not penanaman:
            return jsonify({'error': 'Data tidak ditemukan'}), 404
        
        # Update data
        if 'metode' in data:
            penanaman.metode = data['metode']
        if 'langkah' in data:
            penanaman.langkah_langkah = ';'.join(data['langkah']) if data['langkah'] else ''
        
        db.session.commit()
        
        return jsonify({
            'message': 'Data berhasil diupdate',
            'data': penanaman.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@penanaman_bp.route('/<int:id>', methods=['DELETE'])
def delete_penanaman(id):
    try:
        penanaman = PlantingGuides.query.get(id)
        
        if not penanaman:
            return jsonify({'error': 'Data tidak ditemukan'}), 404
        
        db.session.delete(penanaman)
        db.session.commit()
        
        return jsonify({'message': 'Data berhasil dihapus'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
