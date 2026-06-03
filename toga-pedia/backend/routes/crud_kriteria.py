from flask import Blueprint, request, jsonify

# Blueprint untuk kriteria
kriteria_bp = Blueprint('kriteria', __name__, url_prefix='/admin/kriteria')

# Global list
db = None
Criteria = None

def init_kriteria_routes(database, criteria_model):
    global db, Criteria
    db = database
    Criteria = criteria_model
    
# ==============================================================================
# CRUD KRITERIA
# ==============================================================================

@kriteria_bp.route('', methods=['GET'])
def get_all_kriteria():
    kriteria_list = Criteria.query.order_by(Criteria.id).all()
    return jsonify([kriteria.to_dict() for kriteria in kriteria_list])

@kriteria_bp.route('/<int:id>', methods=['PUT'])
def update_kriteria(id):
    try:
        kriteria = Criteria.query.get_or_404(id)
        data = request.get_json()
        
        # Update Field Kriteria
        if 'nama_kriteria' in data:
            kriteria.nama_kriteria = data['nama_kriteria']
        if 'bobot' in data:
            kriteria.bobot_default = data['bobot']
            
        db.session.commit()
        
        return jsonify({
            'status': 'success',
            'message': 'Kriteria berhasil diperbarui',
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
            
            
        
        