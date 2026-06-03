import React, { useState, useEffect } from "react";
import axios from "axios";
import editIcon from "../../../assets/edit.svg";
import deleteIcon from "../../../assets/delete.svg";
import ModalDelete from "../ModalDelete";
import Pagination from "../../Pagination";

const TabelToga = () => {
  // === STATE DECLARATIONS ===
  // Data states
  const [togaData, setTogaData] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [subKriteriaData, setSubKriteriaData] = useState({
    C1: [],
    C3: [],
    C4: [],
    C5: [],
    C6: [],
  });

  // UI states
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("informasi");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  // Edit states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedItemId, setEditedItemId] = useState(null);

  // Filter & pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    deskripsi: "",
    kegunaan: [""],
    harga_bibit: "",
    harga_panen: "",
    masa_panen: "",
    image: "",
    panen: "",
    manfaat: "",
    kesulitan: "",
    lahan: "",
    pengolahan: "",
    harga_range: "",
  });

  // === CONSTANTS ===
  const itemsPerPage = 10;

  // === MODAL HANDLERS ===
  const openModal = () => {
    setIsModalOpen(true);
    setIsEditMode(false);
    setEditedItemId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditedItemId(null);
    setFormData({
      nama: "",
      kategori: "",
      deskripsi: "",
      kegunaan: [""],
      harga_bibit: "",
      harga_panen: "",
      masa_panen: "",
      image: "",
      panen: "",
      manfaat: "",
      kesulitan: "",
      lahan: "",
      pengolahan: "",
      harga_range: "",
    });
  };

  const openEditModal = (toga) => {
    setIsEditMode(true);
    setEditedItemId(toga.id);
    setFormData({
      nama: toga.nama || "",
      kategori: toga.kategori || "",
      deskripsi: toga.deskripsi || "",
      kegunaan:
        toga.kegunaan && toga.kegunaan.length > 0 ? toga.kegunaan : [""],
      harga_bibit: toga.harga_bibit || "",
      harga_panen: toga.harga_panen || "",
      masa_panen: toga.masa_panen || "",
      image: toga.image || "",
      panen: toga.scores?.panen || "",
      manfaat: toga.scores?.manfaat || "",
      kesulitan: toga.scores?.kesulitan || "",
      lahan: toga.scores?.lahan || "",
      pengolahan: toga.scores?.pengolahan || "",
      harga_range: toga.scores?.harga_range || "",
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (toga) => {
    setDeleteItemId(toga);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteItemId(null);
    setIsDeleteModalOpen(false);
  };

  // === FORM HANDLERS ===
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKegunaanChange = (index, value) => {
    const newKegunaan = [...formData.kegunaan];
    newKegunaan[index] = value;
    setFormData({ ...formData, kegunaan: newKegunaan });
  };

  const addKegunaanField = () => {
    setFormData({ ...formData, kegunaan: [...formData.kegunaan, ""] });
  };

  const removeKegunaanField = (index) => {
    const newKegunaan = formData.kegunaan.filter((_, i) => i !== index);
    setFormData({ ...formData, kegunaan: newKegunaan });
  };

  // === API CALLS ===
  const fetchToga = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tanaman");
      setTogaData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal ambil data:", error);
      setLoading(false);
    }
  };

  const fetchKategori = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/kategori");
      setKategoriList(response.data);
    } catch (error) {
      console.error("Gagal ambil kategori:", error);
    }
  };

  const fetchSubKriteria = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/subkriteria",
      );
      setSubKriteriaData(response.data);
    } catch (error) {
      console.error("Gagal ambil subkriteria:", error);
    }
  };

  const dataToSend = {
    ...formData,
    kegunaan: formData.kegunaan.filter((k) => k.trim() !== ""),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/admin/tanaman/${editedItemId}`,
          dataToSend,
        );
        alert("Data berhasil diupdate!");
      } else {
        await axios.post("http://localhost:5000/admin/tanaman", dataToSend);

        try {
          // Buat data penanaman kosong untuk tanaman baru
          await axios.post("http://localhost:5000/admin/penanaman", {
            nama_tanaman: formData.nama,
            metode: "",
            langkah: [],
          });
          console.log(
            "Data penanaman kosong berhasil dibuat untuk tanaman baru.",
          );
        } catch (error) {
          console.error("Gagal membuat data penanaman kosong:", error);
        }

        try {
          // Buat data pengolahan kosong untuk tanaman baru
          await axios.post("http://localhost:5000/admin/pengolahan", {
            nama_tanaman: formData.nama,
            olahan: "",
            langkah: [],
            dosis: "",
          });
          console.log(
            "Data pengolahan kosong berhasil dibuat untuk tanaman baru.",
          );
        } catch (error) {
          console.error("Gagal membuat data pengolahan kosong:", error);
        }
        alert("Data berhasil ditambahkan!");
      }
      closeModal();
      fetchToga();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Gagal menyimpan data. Coba lagi!");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/admin/tanaman/${deleteItemId.id}`,
      );
      alert(`Data "${deleteItemId.nama}" berhasil dihapus!`);
      closeDeleteModal();
      fetchToga();
    } catch (error) {
      console.error("Gagal hapus data:", error);
      alert("Gagal hapus data. Coba lagi!");
    }
  };

  // === EFFECTS ===
  useEffect(() => {
    fetchToga();
    fetchKategori();
    fetchSubKriteria();
  }, []);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // === SEARCH & PAGINATION LOGIC ===
  const filteredData = togaData.filter((toga) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      toga.nama?.toLowerCase().includes(searchLower) ||
      toga.kategori?.toLowerCase().includes(searchLower) ||
      toga.deskripsi?.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // === EARLY RETURN FOR LOADING ===
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        <div className="flex justify-center items-center py-12">
          <p className="font-lexend text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // === RENDER ===
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
      {/* Judul + Tombol Tambah Data */}
      <div className="flex justify-between items-center px-6 py-4 border-b-2 border-gray-200">
        <h3 className="font-lexend text-xl font-semibold text-[#2C2C2C]">
          Tabel Tanaman Obat
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

      {/* Search Bar & Info */}
      <div className="px-6 py-4 border-b-2 border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <input
              type="text"
              placeholder="Cari nama tanaman, kategori..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-4 h-4"
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
            )}
          </div>
        </div>

        {/* Toggle Tabel */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("informasi")}
            className={`px-4 py-2 text-sm font-lexend rounded-md transition-all cursor-pointer ${
              viewMode === "informasi"
                ? "bg-white text-[#357C23] shadow-sm font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Informasi Umum
          </button>
          <button
            onClick={() => setViewMode("kriteria")}
            className={`px-4 py-2 text-sm font-lexend rounded-md transition-all cursor-pointer ${
              viewMode === "kriteria"
                ? "bg-white text-[#357C23] shadow-sm font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Nilai Kriteria (C1-C6)
          </button>
        </div>

        {/* Info Display */}
        <div className="font-lexend text-sm text-gray-600">
          Menampilkan {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredData.length)} dari{" "}
          {filteredData.length} data
        </div>
      </div>

      {/* Tabel Data */}
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200 bg-gray-200">
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Tanaman
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Kategori
            </th>

            {/* TAMPILKAN JIKA MODE INFORMASI */}
            {viewMode === "informasi" && (
              <>
                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
                  Deskripsi Singkat
                </th>
                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
                  Detail Kegunaan
                </th>
                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
                  Harga Bibit
                </th>
                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
                  Harga Hasil Panen
                </th>
                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
                  Masa Panen
                </th>
                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
                  Image
                </th>
              </>
            )}

            {/* TAMPILKAN JIKA MODE KRITERIA */}
            {viewMode === "kriteria" && (
              <>
                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
                  C1 (Panen)
                </th>
                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
                  C2 (Manfaat)
                </th>
                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
                  C3 (Kesulitan)
                </th>
                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
                  C4 (Lahan)
                </th>
                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
                  C5 (Pengolahan)
                </th>
                <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
                  C6 (Harga)
                </th>
              </>
            )}

            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((toga) => (
              <tr
                key={toga.id}
                className="border-b-2 border-gray-200 last:border-b-0"
              >
                <td className="font-lexend text-xs text-gray-800 py-4 text-center px-2">
                  {toga.nama}
                </td>
                <td className="font-lexend text-xs text-gray-800 py-4 text-center px-2">
                  {toga.kategori}
                </td>
                {/* ISI MODE INFORMASI */}
                {viewMode === "informasi" && (
                  <>
                    <td className="font-lexend text-xs text-[#ACACAC] py-4 text-start px-2 max-w-60">
                      {toga.deskripsi}
                    </td>
                    <td className="font-lexend text-xs text-[#ACACAC] py-4 text-start px-2 max-w-70">
                      <ol className="list-decimal list-inside">
                        {toga.kegunaan.map((langkah, index) => (
                          <li key={index} className="text-left">
                            {langkah}
                          </li>
                        ))}
                      </ol>
                    </td>
                    <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">
                      Rp {toga.harga_bibit}
                    </td>
                    <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">
                      Rp {toga.harga_panen}
                    </td>
                    <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">
                      {toga.masa_panen}
                    </td>
                    <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">
                      <img
                        src={toga.image}
                        alt={toga.nama}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </td>
                  </>
                )}
                {viewMode === "kriteria" && (
                  <>
                    <td className="font-lexend text-xs text-[#2C2C2C] py-4 px-3 text-center">
                      {toga.scores?.panen} Bulan
                    </td>
                    <td className="font-lexend text-xs text-[#2C2C2C] py-4 px-3 text-center">
                      {toga.scores?.manfaat}
                    </td>
                    <td className="font-lexend text-xs text-[#2C2C2C] py-4 px-3 text-center">
                      {subKriteriaData.C3?.find(
                        (s) => s.nilai === toga.scores?.kesulitan,
                      )?.label || toga.scores?.kesulitan}
                    </td>
                    <td className="font-lexend text-xs text-[#2C2C2C] py-4 px-3 text-center">
                      {subKriteriaData.C4?.find(
                        (s) => s.nilai === toga.scores?.lahan,
                      )?.label || toga.scores?.lahan}
                    </td>
                    <td className="font-lexend text-xs text-[#2C2C2C] py-4 px-3 text-center">
                      {subKriteriaData.C5?.find(
                        (s) => s.nilai === toga.scores?.pengolahan,
                      )?.label || toga.scores?.pengolahan}
                    </td>
                    <td className="font-lexend text-xs text-[#2C2C2C] py-4 px-3 text-center">
                      {subKriteriaData.C6?.find(
                        (s) => s.nilai === toga.scores?.harga_range,
                      )?.label || toga.scores?.harga_range}
                    </td>
                  </>
                )}
                <td className="font-lexend text-xs py-4 px-3 text-center">
                  <div className="flex justify-center gap-2">
                    {/* Tombol Edit Tanaman */}
                    <button
                      onClick={() => openEditModal(toga)}
                      className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-300 cursor-pointer"
                    >
                      <img src={editIcon} alt="Edit Icon" className="w-5 h-5" />
                    </button>

                    {/* Tombol Delete Tanaman */}
                    <button
                      onClick={() => openDeleteModal(toga)}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 cursor-pointer"
                    >
                      <img src={deleteIcon} alt="Delete Icon" className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="12"
                className="font-lexend text-sm text-gray-500 py-8 text-center"
              >
                {searchTerm
                  ? "Tidak ada data yang sesuai dengan pencarian"
                  : "Belum ada data"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t-2 border-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Modal Tambah/Edit Data */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="font-lexend text-xl font-semibold text-[#2C2C2C]">
                {isEditMode ? "Edit Data Tanaman" : "Tambah Data Tanaman"}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nama */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Nama Tanaman <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Pilih Kategori</option>
                    {kategoriList.map((kat) => (
                      <option key={kat.id} value={kat.nama_kategori}>
                        {kat.nama_kategori}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Deskripsi */}
                <div className="md:col-span-2">
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Deskripsi Singkat <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>

                {/* Kegunaan */}
                <div className="md:col-span-2">
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Detail Kegunaan <span className="text-red-500">*</span>
                  </label>
                  {formData.kegunaan.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleKegunaanChange(index, e.target.value)
                        }
                        placeholder={`Kegunaan ${index + 1}`}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      {formData.kegunaan.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeKegunaanField(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addKegunaanField}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-lexend cursor-pointer"
                  >
                    + Tambah Kegunaan
                  </button>
                </div>

                {/* Harga Bibit */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Harga Bibit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="harga_bibit"
                    value={formData.harga_bibit}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Harga Panen */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Harga Panen <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="harga_panen"
                    value={formData.harga_panen}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Masa Panen */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Masa Panen <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="masa_panen"
                    value={formData.masa_panen}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/*Image */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* C1 - Masa Panen */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    C1 - Masa Panen (Bulan){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="panen"
                    value={formData.panen}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Pilih</option>
                    {subKriteriaData.C1?.map((sub) => (
                      <option key={sub.id} value={sub.nilai}>
                        {sub.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* C2 - Jumlah Manfaat */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    C2 - Jumlah Manfaat <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="manfaat"
                    value={formData.manfaat}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* C3 - Kesulitan Penanaman */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    C3 - Kesulitan Penanaman{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="kesulitan"
                    value={formData.kesulitan}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Pilih</option>
                    {subKriteriaData.C3?.map((sub) => (
                      <option key={sub.id} value={sub.nilai}>
                        {sub.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* C4 - Kebutuhan Lahan */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    C4 - Kebutuhan Lahan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="lahan"
                    value={formData.lahan}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Pilih</option>
                    {subKriteriaData.C4?.map((sub) => (
                      <option key={sub.id} value={sub.nilai}>
                        {sub.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* C5 - Kesulitan Pengolahan */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    C5 - Kesulitan Pengolahan{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="pengolahan"
                    value={formData.pengolahan}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Pilih</option>
                    {subKriteriaData.C5?.map((sub) => (
                      <option key={sub.id} value={sub.nilai}>
                        {sub.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* C6 - Range Harga */}
                <div>
                  <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                    C6 - Range Harga <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="harga_range"
                    value={formData.harga_range}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Pilih</option>
                    {subKriteriaData.C6?.map((sub) => (
                      <option key={sub.id} value={sub.nilai}>
                        {sub.label}
                      </option>
                    ))}
                  </select>
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

      {/* Modal Delete */}
      <ModalDelete
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        itemName={deleteItemId?.nama}
      />
    </div>
  );
};

export default TabelToga;
