from flask import Blueprint, request, jsonify

# Blueprint untuk subkriteria
subkriteria_bp = Blueprint('subkriteria', __name__, url_prefix='/admin/subkriteria')

# Global list
db = None
Criteria = None
SubCriteria = None

def init_subkriteria_routes(database, criteria_model, subkriteria_model):
    global db, Criteria, SubCriteria
    db = database
    Criteria = criteria_model
    SubCriteria = subkriteria_model

# ==============================================================================
# CRUD SUBKRITERIA
# ==============================================================================

@subkriteria_bp.route('/<kode>', methods=['GET'])
def get_subkriteri_by_kode(kode):
    sub_list = SubCriteria.query.join(Criteria).filter(
        Criteria.kode == kode
    ).all()
    return jsonify([sub.to_dict() for sub in sub_list])

@subkriteria_bp.route('/all', methods=['GET'])
def get_all_subkriteria_flat():
    sub_list = SubCriteria.query.join(Criteria).all()
    return jsonify([sub.to_dict() for sub in sub_list])

@subkriteria_bp.route('', methods=['GET'])
def get_all_subkriteria_grouped():
    kriteria_codes = ['C1','C3', 'C4', 'C5', 'C6']
    result = {}

    for kode in kriteria_codes:
        sub_list = SubCriteria.query.join(Criteria).filter(
            Criteria.kode == kode
        ).all()
        result[kode] = [sub.to_dict() for sub in sub_list]

    return jsonify(result)




