import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import dashboardIcon from '../../assets/dashboard.svg'
import tableIcon from '../../assets/data_table.svg'

const AdminNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const navigate = useNavigate();

  return (
    <nav className={`h-full bg-white shadow-md flex flex-col items-start px-4 py-6 fixed ${isOpen ? 'w-54' : 'w-20'} transition-width duration-300 z-30`}>
        {/* Tombol Expand */}
        <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 bg-white shadow-md flex flex-col items-center justify-center rounded-lg p-3 gap-1.5 ${isOpen ? 'translate-x-34' : 'translate-x-0'} transition-all duration-300`}
        >
            <span className={`block h-0.5 w-full bg-black transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-black transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-full bg-black transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Menu Items */}
        {/* Dashboard */}
            <Link 
            to="/admin/dashboard"
            className={`group h-10 bg-gray-100 rounded-md flex items-center mt-5 px-1 mx-1 hover:bg-[#357C23] transition-[width,colors] duration-300 ${isOpen ? 'w-44 gap-3' : 'w-10'}`}
            >
                <img src={dashboardIcon} alt="Dashboard" className="w-8 h-8 group-hover:brightness-0 group-hover:invert transition-all shrink-0" />
                <span className={`text-sm font-lexend font-medium text-[#8D8D8D] group-hover:text-white whitespace-nowrap transition-all ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                    Dashboard
                </span>
            </Link>

            {/* Tabel Data */}
            <Link 
            to="/admin/table-data"
            className={`group h-10 bg-gray-100 rounded-md flex items-center mt-5 px-1 mx-1 hover:bg-[#357C23] transition-[width,colors] duration-300 ${isOpen ? 'w-44 gap-3' : 'w-10'}`}
            >
                <img src={tableIcon} alt="Dashboard" className="w-8 h-8 group-hover:brightness-0 group-hover:invert transition-all shrink-0" />
                <span className={`text-sm font-lexend font-medium text-[#8D8D8D] group-hover:text-white whitespace-nowrap transition-all ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                    Tabel Data
                </span>
            </Link>
    </nav>
  )
}

export default AdminNav