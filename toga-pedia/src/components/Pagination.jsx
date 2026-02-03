import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  
  const renderPageNumbers = () => {
    const pages = []
    
    if (totalPages <= 7) {
      // Jika halaman sedikit, tampilkan semua
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Selalu tampilkan halaman pertama
      pages.push(1)
      
      if (currentPage > 3) {
        pages.push('...') // Ellipsis kiri
      }
      
      // Tampilkan halaman di sekitar halaman aktif
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...') // Ellipsis kanan
      }
      
      // Selalu tampilkan halaman terakhir
      pages.push(totalPages)
    }
    
    return pages
  }

  const goToPage = (page) => {
    onPageChange(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-1 md:gap-2">
      {/* Tombol Previous */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 md:px-4 md:py-2 rounded-md font-medium text-sm md:text-base transition ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        &laquo;
      </button>

      {/* Nomor Halaman */}
      {renderPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          )
        }
        
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-3 py-2 md:px-4 md:py-2 rounded-md font-medium text-sm md:text-base transition ${
              currentPage === page
                ? 'bg-[#357C23] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        )
      })}

      {/* Tombol Next */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 md:px-4 md:py-2 rounded-md font-medium transition ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        &raquo;
      </button>
    </div>
  )
}

export default Pagination