from flask import Blueprint, request, jsonify

# Blueprint untuk pengolahan
pengolahan_bp = Blueprint('pengolahan', __name__, url_prefix='/admin/pengolahan')

# Global list
db = None
ProcessingGuides = None
Alternative = None

def init_pengolahan_routes(database, processing_guides_model, alternative_model):
    global db, ProcessingGuides, Alternative
    db = database
    ProcessingGuides = processing_guides_model
    Alternative = alternative_model

# ==============================================================================
# CRUD PENGOLAHAN  
# ==============================================================================

@pengolahan_bp.route('', methods=['GET'])
def get_all_pengolahan():
    try:
        pengolahan_list = ProcessingGuides.query.join(Alternative).all()
        return jsonify([item.to_dict() for item in pengolahan_list])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@pengolahan_bp.route('', methods=['POST'])
def create_pengolahan():
    try:
        data = request.get_json()
        langkah = data.get('langkah', [])
        
        # Cari alternative_id berdasarkan nama tanaman
        alternative = Alternative.query.filter_by(nama_tanaman=data.get('nama_tanaman')).first()
        if not alternative:
            return jsonify({'error': 'Tanaman tidak ditemukan'}), 404
        
        # Cek apakah sudah ada data pengolahan untuk tanaman ini
        existing = ProcessingGuides.query.filter_by(alternative_id=alternative.id).first()
        if existing:
            return jsonify({'error': 'Data pengolahan untuk tanaman ini sudah ada'}), 400
        
        langkah_str = ';' .join(langkah) if langkah else ''
        # Buat data pengolahan baru
        new_pengolahan = ProcessingGuides(
            alternative_id=alternative.id,
            nama_olahan=data.get('olahan', ''),
            kegunaan_olahan=data.get('kegunaan_olahan', ''),
            langkah_langkah=langkah_str,
            dosis_pemakaian=data.get('dosis', '')
        )
        
        db.session.add(new_pengolahan)
        db.session.commit()
        
        return jsonify({
            'message': 'Data pengolahan berhasil ditambahkan',
            'data': new_pengolahan.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@pengolahan_bp.route('/<int:id>', methods=['PUT'])
def update_pengolahan(id):
    try:
        data = request.get_json()
        pengolahan = ProcessingGuides.query.get(id)
        
        if not pengolahan:
            return jsonify({'error': 'Data tidak ditemukan'}), 404
        
        # Update data
        if 'olahan' in data:
            pengolahan.nama_olahan = data['olahan']
        if 'kegunaan_olahan' in data:
            pengolahan.kegunaan_olahan = data['kegunaan_olahan']
        if 'langkah' in data:
            pengolahan.langkah_langkah = ';'.join(data['langkah']) if data['langkah'] else ''
        if 'dosis' in data:
            pengolahan.dosis_pemakaian = data['dosis']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Data berhasil diupdate',
            'data': pengolahan.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@pengolahan_bp.route('/<int:id>', methods=['DELETE'])
def delete_pengolahan(id):
    try:
        pengolahan = ProcessingGuides.query.get(id)
        
        if not pengolahan:
            return jsonify({'error': 'Data tidak ditemukan'}), 404
        
        db.session.delete(pengolahan)
        db.session.commit()
        
        return jsonify({'message': 'Data berhasil dihapus'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
        
