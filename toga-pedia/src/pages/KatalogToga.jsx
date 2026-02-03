import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import closeIcon from '../assets/close.svg'
import searchIcon from '../assets/search.svg'
import TogaCard from '../components/TogaCard'
import Pagination from '../components/Pagination'
import axios from 'axios'; // Import Axios
import { motion } from 'framer-motion'

const KatalogToga = () => {

  const [togaData, setTogaData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [currentPage, setCurrentPage] = useState(1)
  
  const categories = ['Semua', 'Rimpang', 'Daun & Herba', 'Buah', 'Bunga', 'Batang', 'Pohon', 'Umbi']

  const itemsPerPage = 5

  const fetchToga = async () => {
    try {
      // Panggil API Backend
      const response = await axios.get('http://127.0.0.1:5000/api/tanaman');
      setTogaData(response.data); // Simpan data ke state
      setLoading(false);
    } catch (error) {
      console.error("Gagal ambil data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToga();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Filter data berdasarkan pencarian dan kategori
  const filteredToga = togaData.filter(toga => {
    const matchSearch = toga.nama.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === 'Semua' || toga.kategori === selectedCategory
    return matchSearch && matchCategory
  })

  const totalPages = Math.ceil(filteredToga.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredToga.slice(startIndex, endIndex)


  if (loading) return <div className="text-center p-10">Loading Data Tanaman...</div>;

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Navbar />

      {/* Title Section */}
      <section className="pt-38 md:pb-12 pb-8 px-6 md:px-16">
        <div className="max-w-screen mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-lexend font-normal text-black">
            Katalog <span className="text-[#357C23]">TOGA</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-lg mx-auto mt-2 md:mt-3">
            Jelajahi berbagai tanaman obat keluarga (TOGA) yang tersedia
          </p>
        </div>
      </section>

      {/* Filter Seaction */}
      <section className="py-8 px-6 md:px-32">
        <div className="max-w-screen mx-auto">
          <div className="flex flex-col gap-2 items-center justify-between">

            {/* Search Bar */}
            <div className="w-full md:w-3/4">
            <div className="flex items-center gap-2 px-3 py-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#357C23]">
              <input 
              type="text" 
              placeholder="Cari tanaman..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              />

              {/* X Button */}
              <button
              onClick={() => setSearchTerm('')}
              className="p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              >
                <img src={closeIcon} alt="Clear" className="w-2 h-2"/>
              </button>

              <div className="w-px h-8 bg-gray-300 mx-2"></div>

              {/* Search Icon */}
              <button 
              className="p-2.5 text-white bg-[#357C23] rounded-md hover:bg-[#2a5d1a] transition"
              >
                <img src={searchIcon} alt="Search" className="w-4 h-4"/>
              </button>

            </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-hide mt-2">
              {categories.map((category) => (
                <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 md:px-6 py-2 text-sm md:text-base rounded-md font-medium whitespace-nowrap transition shrink-0 ${selectedCategory === category ? 'bg-[#357C23] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {category}
                </button>
              ))}
                
            </div>
          </div>
        </div>
      </section>

      {/* Katalog Konten */}
      <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.02 }}
      className="py-2 md:py-12 px-6 md:px-16"
      >
        <div className="max-w-screen mx-auto">
          <div className="grid grid-cols-1 gap-6">
            {currentData.map((item) => (
              <TogaCard 
                key={item.id}
                nama={item.nama}
                image={item.image} // Placeholder gambar jika belum ada
                kategori={item.kategori}
                deskripsi={item.deskripsi}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pagination Component */}
      {filteredToga.length > 0 && (
        <section className="py-8 px-6 md:px-16">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          />
        </section>
      )}
    </div>
  )
}

export default KatalogToga