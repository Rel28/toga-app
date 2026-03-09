import React, { useState, useEffect } from "react";
import axios from "axios";

const TabelKriteria = () => {
  // === STATE DECLARATIONS ===
  // == Data States ==
  const [kriteriaData, setKriteriaData] = useState([]);

  // == Modal States ==
  const [isModalOpen, setIsModalOpen] = useState(false);

  // == Edit States ==
  const [editedItemId, setEditedItemId] = useState(null);
  const [formData, setFormData] = useState({
    kode: "",
    nama_kriteria: "",
    atribut: "",
    bobot: "",
  });

  const openEditModal = (kriteria) => {
    setEditedItemId(kriteria.id);
    setFormData({
        kode: kriteria.kode,
        nama_kriteria: kriteria.nama_kriteria,
        atribut: kriteria.atribut,
        bobot: kriteria.bobot,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedItemId(null);
    setFormData({
        kode: "",
        nama_kriteria: "",
        atribut: "",
        bobot: "",
    });
  };

// == FORM HANDLERS ==
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:5000/admin/kriteria/${editedItemId}`, formData,
            );
            alert("Data berhasil diperbarui!");
            closeModal();
            fetchKriteria();
        } catch (error) {
            console.error("Error updating data:", error);
            alert("Gagal memperbarui data. Silakan coba lagi.");
        }
    };


  // == API CALLS ==
  const fetchKriteria = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/admin/kriteria");
      setKriteriaData(response.data);
    } catch (error) {
      console.error("Error fetching kriteria data:", error);
    }
  };

  useEffect(() => {
    fetchKriteria();
  }, []);

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden max-w-3xl">
      {/* Judul */}
      <div className="flex justify-between items-center px-6 py-4 border-b-2 border-gray-200">
        <h3 className="font-lexend text-xl font-semibold text-[#2C2C2C]">
          Tabel Kriteria
        </h3>
        <div className="flex gap-2"></div>
      </div>

      {/* Tabel Data */}
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200 bg-gray-200">
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Kode Kriteria
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Nama Kriteria
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Atribut
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Bobot Kriteria
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
            {kriteriaData.map((kriteria) => (
                <tr key={kriteria.id} className="border-b border-gray-200">
                    <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">{kriteria.kode}</td>
                    <td className="font-lexend text-sm text-[#ACACAC] py-4 text-center">{kriteria.nama_kriteria}</td>
                    <td className="font-lexend text-sm text-[#ACACAC] py-4 text-center">{kriteria.atribut}</td>
                    <td className="font-lexend text-sm text-[#2C2C2C] py-4 text-center">{kriteria.bobot}</td>
                    <td className="font-lexend text-sm text-[#2C2C2C] py-4 text-center">
                        <button 
                        onClick={() => openEditModal(kriteria)}
                        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 cursor-pointer mr-2">
                            Edit
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>

      {/* Modal Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-lexend text-xl font-semibold text-[#2C2C2C]">
                Edit Kriteria
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="grid grid-cols-1 gap-4">
                {/* Kode Kriteria */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Kode Kriteria
                  </label>
                  <input
                    type="text"
                    name="kode"
                    value={formData.kode}
                    onChange={handleInputChange}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm bg-gray-100 cursor-not-allowed"
                  />
                </div>
                {/* Nama Kriteria */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Nama Kriteria
                  </label>
                  <input
                    type="text"
                    name="nama_kriteria"
                    value={formData.nama_kriteria}
                    onChange={handleInputChange}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm bg-gray-100 cursor-not-allowed"
                  />
                </div>
                {/* Atribut */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Atribut
                  </label>
                  <input
                    type="text"
                    name="atribut"
                    value={formData.atribut}
                    onChange={handleInputChange}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm bg-gray-100 cursor-not-allowed"
                  />
                </div>
                {/* Bobot */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Bobot
                  </label>
                  <input
                    type="number"
                    name="bobot"
                    value={formData.bobot}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  Update Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabelKriteria;
