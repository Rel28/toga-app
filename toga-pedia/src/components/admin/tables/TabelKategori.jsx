import React, { useState, useEffect } from "react";
import axios from "axios";
import editIcon from "../../../assets/edit.svg";
import deleteIcon from "../../../assets/delete.svg";
import ModalDelete from "../ModalDelete";

const TabelKategori = () => {
  // === STATE DECLARATIONS ===
  // == Data States ==
  const [kategoriData, setKategoriData] = useState([]);

  // == Modal States ==
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // == Edit States ==
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(null);

  // == Form States ==
  const [formData, setFormData] = useState({
    nama_kategori: "",
    deskripsi: "",
  });

  // === MODAL HANDLERS ===
  const openModal = () => {
    setIsModalOpen(true);
    setIsEditMode(false);
    setEditedItemId(null);
  };

  const openEditModal = (kategori) => {
    setIsEditMode(true);
    setEditedItemId(kategori.id);
    setFormData({
      nama_kategori: kategori.nama_kategori,
      deskripsi: kategori.deskripsi,
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (kategori) => {
    setDeleteItemId(kategori);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditedItemId(null);
    setFormData({
      nama_kategori: "",
      deskripsi: "",
    });
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteItemId(null);
  };

  // === FORM HANDLERS ===
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // === API CALLS ===
  const fetchKategori = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/admin/kategori");
      setKategoriData(response.data);
    } catch (error) {
      console.error("Error fetching kategori data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(
          `http://127.0.0.1:5000/admin/kategori/${editedItemId}`,
          formData,
        );
        alert("Data berhasil diupdate!");
      } else {
        await axios.post("http://127.0.0.1:5000/admin/kategori", formData);
        alert("Data berhasil disimpan!");
      }
        closeModal();
        fetchKategori();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Gagal menyimpan data. Coba lagi!");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:5000/admin/kategori/${deleteItemId.id}`,
      );
      alert("Data berhasil dihapus!");
      closeDeleteModal();
      fetchKategori();
    } catch (error) {
      console.error("Gagal hapus data:", error);
      alert("Gagal hapus data. Coba lagi!");
    }
  };

  // === EFFECTS ===
  useEffect(() => {
    fetchKategori();
  }, []);

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden max-w-3xl">
      {/* Judul + Tombol Tambah Data */}
      <div className="flex justify-between items-center px-6 py-4 border-b-2 border-gray-200">
        <h3 className="font-lexend text-xl font-semibold text-[#2C2C2C]">
          Tabel Kategori Tanaman
        </h3>
        <div className="flex gap-2">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-[#357C23] text-white rounded hover:bg-[#2a5d1a] transition-colors duration-300 cursor-pointer"
          >
            <span className="font-semibold">+</span> Tambah Data
          </button>
        </div>
      </div>

      {/* Tabel Data */}
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200 bg-gray-200">
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Nama Kategori
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Deskripsi
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {kategoriData.map((kategori) => (
            <tr
              key={kategori.id}
              className="border-b-2 border-gray-200 last:border-b-0"
            >
              <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">
                {kategori.nama_kategori}
              </td>
              <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">
                {kategori.deskripsi}
              </td>
              <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">
                <div className="flex items-center justify-center gap-4">
                  <button onClick = {() => openEditModal(kategori)} className="p-2 bg-yellow-500 rounded hover:bg-yellow-600 transition-colors duration-300 cursor-pointer">
                    <img src={editIcon} alt="Edit" className="w-4 h-4" />
                  </button>
                  <button onClick = {() => openDeleteModal(kategori)} className="p-2 bg-red-500 rounded hover:bg-red-600 transition-colors duration-300 cursor-pointer">
                    <img src={deleteIcon} alt="Delete" className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Tambah/Edit Data */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-lexend text-xl font-semibold text-[#2C2C2C]">
                {isEditMode ? "Edit Kategori" : "Tambah Kategori"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
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
                {/* Nama Kategori */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Nama Kategori <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama_kategori"
                    value={formData.nama_kategori}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                {/* Deskripsi */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Deskripsi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 cursor-pointer"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

        {/* Modal Hapus Data */}
        {isDeleteModalOpen && (
            <ModalDelete
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onConfirm={handleDeleteConfirm}
            itemName = {deleteItemId?.nama_kategori}
            />
        )}
    </div>
  );
};

export default TabelKategori;
