import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../Pagination";

const TabelPengolahan = () => {
  // === STATE DECLARATION ===
  const [pengolahanData, setPengolahanData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // === MODAL STATES ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedItemId, setEditedItemId] = useState(null);

  const [formData, setFormData] = useState({
    nama_tanaman: "",
    olahan: "",
    kegunaan_olahan: "",
    langkah: [""],
    dosis: "",
  });

  const openEditModal = (pengolahan) => {
    setEditedItemId(pengolahan.id);
    setFormData({
      nama_tanaman: pengolahan.nama_tanaman,
      olahan: pengolahan.olahan || "",
      kegunaan_olahan: pengolahan.kegunaan_olahan || "",
      langkah:
        pengolahan.langkah && pengolahan.langkah.length > 0
          ? pengolahan.langkah
          : [""],
      dosis: pengolahan.dosis || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditedItemId(null);
    setIsModalOpen(false);
    setFormData({
      nama_tanaman: "",
      olahan: "",
      langkah: [""],
      dosis: "",
    });
  };

  // === FORM HANDLERS ===
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLangkahChange = (index, value) => {
    const newLangkah = [...formData.langkah];
    newLangkah[index] = value;
    setFormData({ ...formData, langkah: newLangkah });
  };

  const addLangkahField = () => {
    setFormData({ ...formData, langkah: [...formData.langkah, ""] });
  };

  const removeLangkahField = (index) => {
    const newLangkah = formData.langkah.filter((_, i) => i !== index);
    setFormData({ ...formData, langkah: newLangkah });
  };

  // === API CALLS ===
  const fetchPengolahan = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/pengolahan"
      );
      setPengolahanData(response.data);
    } catch (error) {
      console.error("Error fetching pengolahan data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        nama_tanaman: formData.nama_tanaman,
        olahan: formData.olahan,
        kegunaan_olahan: formData.kegunaan_olahan,
        langkah: formData.langkah.filter((l) => l.trim() !== ""),
        dosis: formData.dosis,
      };
      await axios.put(
        `http://localhost:5000/admin/pengolahan/${editedItemId}`,
        dataToSend,
      );
      closeModal();
      fetchPengolahan();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert(
        "Gagal menyimpan data. Pastikan tanaman ini belum memiliki data pengolahan.",
      );
    }
  };

  useEffect(() => {
    fetchPengolahan();
  }, []);

  //   Filter data berdasarkan search
  const filteredData = pengolahanData.filter((pengolahan) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      pengolahan.nama_tanaman?.toLowerCase().includes(searchLower) ||
      pengolahan.olahan?.toLowerCase().includes(searchLower)
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden w-full">
      {/* Judul & Tombol Tambah */}
      <div className="flex justify-between items-center px-6 py-4 border-b-2 border-gray-200">
        <h3 className="font-lexend text-xl font-semibold text-[#2C2C2C]">
          Tabel Cara Pengolahan
        </h3>
      </div>
      {/* Search Bar & Info */}
      <div className="px-6 py-4 border-b-2 border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <input
              type="text"
              placeholder="Cari nama tanaman atau metode..."
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
              Nama Tanaman
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Nama Olahan
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Kegunaan Olahan
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Langkah-langkah
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Dosis
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((pengolahan) => {
              const isDataKosong =
                !pengolahan.olahan ||
                !pengolahan.kegunaan_olahan ||
                !pengolahan.langkah ||
                pengolahan.langkah.length === 0;
                !pengolahan.dosis;

              return (
                <tr
                  key={pengolahan.id}
                  className={`border-b-2 border-gray-200 last:border-b-0 ${isDataKosong ? "bg-yellow-50" : ""}`}
                >
                  <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">
                    {pengolahan.nama_tanaman}
                  </td>
                  <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">
                    {pengolahan.olahan ? (
                      <span className="text-[#ACACAC]">{pengolahan.olahan}</span>
                    ) : (
                      <span className="text-orange-500 italic">⚠️ Belum diisi</span>
                    )}
                  </td>
                  <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">
                    {pengolahan.kegunaan_olahan ? (
                      <span className="text-[#ACACAC]">{pengolahan.kegunaan_olahan}</span>
                    ) : (
                      <span className="text-orange-500 italic">⚠️ Belum diisi</span>
                    )}
                  </td>
                  <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">
                    {Array.isArray(pengolahan.langkah) &&
                    pengolahan.langkah.length > 0 ? (
                      <ol className="list-decimal list-inside">
                        {pengolahan.langkah.map((langkah, index) => (
                          <li key={index} className="text-left">
                            {langkah}
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <span className="text-orange-500 italic">⚠️ Belum diisi</span>
                    )}
                  </td>
                  <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">
                    {pengolahan.dosis ? (
                      <span className="text-[#ACACAC]">{pengolahan.dosis}</span>
                    ) : (
                      <span className="text-orange-500 italic">⚠️ Belum diisi</span>
                    )}
                  </td>
                  <td className="font-lexend text-xs py-4 text-center px-2">
                    <button
                      onClick={() => openEditModal(pengolahan)}
                      className={`px-4 py-2 ${isDataKosong ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-500 hover:bg-blue-600"} text-white rounded-lg transition-colors duration-300 font-medium cursor-pointer`}
                    >
                      {isDataKosong ? "Isi" : "Edit"}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                Tidak ada data pengolahan yang ditemukan.
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
            <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <h3 className="font-lexend text-xl font-semibold text-[#2C2C2C]">
                Edit Cara Pengolahan
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
              {/* Nama Tanaman (Dropdown saat tambah, Read-only saat edit) */}
              <div className="mb-4">
                <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                  Nama Tanaman <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama_tanaman"
                  value={formData.nama_tanaman}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Nama Olahan */}
              <div className="mb-4">
                <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                  Olahan<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="olahan"
                  value={formData.olahan}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Teh Sereh, Wedang Jahe, dll"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Kegunaan Olahan */}
              <div className="mb-4">
                <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                  Kegunaan Olahan<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="kegunaan_olahan"
                  value={formData.kegunaan_olahan}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: Teh Sereh, Wedang Jahe, dll"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Langkah-langkah */}
              <div className="mb-4">
                <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                  Langkah-langkah <span className="text-red-500">*</span>
                </label>
                {formData.langkah.map((langkah, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={langkah}
                      onChange={(e) =>
                        handleLangkahChange(index, e.target.value)
                      }
                      placeholder={`Langkah ${index + 1}`}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.langkah.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLangkahField(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLangkahField}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-lexend cursor-pointer"
                >
                  + Tambah Langkah
                </button>
              </div>

              {/* Dosis */}
              <div className="mb-4">
                <label className="block font-lexend text-sm font-medium text-gray-700 mb-2">
                  Dosis<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="dosis"
                  value={formData.dosis}
                  onChange={handleInputChange}
                  required
                  placeholder="Contoh: 100mg, 200ml, dll"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-lexend text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabelPengolahan;
