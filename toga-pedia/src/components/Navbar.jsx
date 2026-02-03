import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

  return (
    <>
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4 shadow-sm bg-white">
        {/* Bagian Logo */}
        <div className="flex items-center gap-1">
            <div className="relative w-12 h-12">
                <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-gray-300 border border-black/50"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-600 border border-black/50"></div>
            </div>
            <div className="text-[#357C23] ml-2 font-lexend text-2xl font-medium">Toga Pedia</div>
        </div>

        {/* Navigasi */}
        <div className="hidden md:flex gap-8 text-lg font-medium font-lexend text-gray-500">
            <Link to="/" className="text-[#357C23] font-bold border-b-2 border-[#557C2F]">
                Beranda
            </Link>
            <Link to="/katalog-toga" className="hover:text-[#357C23] transition">
                Katalog TOGA
            </Link>
            <Link to="/tentang" className="hover:text-[#357C23] transition">
                Tentang
            </Link>
        </div>

        {/* Button Rekomendasi */}
        <button
        onClick={() => navigate('/rekomendasi')}
        className="hidden md:block bg-[#357C23] text-white text-xl font-lexend px-10 py-4 rounded-full font-medium hover:bg-[#446325] transition shadow-md">
            Rekomendasi
        </button>

        {/* Hamburger Menu (Mobile) */}
        <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center"
        aria-label='Toggle menu'
        >
            <span className={`block h-0.5 w-full bg-[#357C23] transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-[#357C23] transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-[#357C23] transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
    </nav>

    {/* Black Background When Sidebar Open */}
    {isOpen && (
        <div
        onClick={() => setIsOpen(false)} 
        className="fixed inset-0 bg-black/50 z-20 md:hidden"
        ></div>
    )}

    {/* Siderbar Menu Mobile */}
    <div className={`fixed top-20 right-0 h-90 w-full bg-white shadow-lg z-30 transform transition-transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden`}>
        <div className="flex flex-col p-6 gap-8">

            {/* Menu Items */}
            <div className="flex flex-col gap-8 font-lexend text-lg font-medium">
                <Link
                to="/" 
                className="text-[#357C23] font-bold pb-3 border-b border-gray-300"
                onClick={() => setIsOpen(false)}
                >
                    Beranda
                </Link>
                <Link
                to="/katalog-toga" 
                className="text-gray-600 hover:text-[#357C23] transition pb-3 border-b border-gray-300"
                onClick={() => setIsOpen(false)}
                >
                    Katalog TOGA
                </Link>
                <Link
                to="/tentang" 
                className="text-gray-600 hover:text-[#357C23] transition pb-3 border-b border-gray-300"
                onClick={() => setIsOpen(false)}
                >
                    Tentang
                </Link>

                {/* Button Rekomendasi di Sidebar */}
                <button
                onClick={() => {
                    setIsOpen(false);
                    navigate('/rekomendasi');
                }}
                className="bg-[#357C23] text-white text-lg font-lexend py-3 rounded-full font-medium hover:bg-[#446325] transition shadow-md mt-4 w-fit px-12 mx-auto">
                Rekomendasi
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar