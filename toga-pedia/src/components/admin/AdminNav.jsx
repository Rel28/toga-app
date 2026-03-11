import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import dashboardIcon from "../../assets/dashboard.svg";
import tableIcon from "../../assets/data_table.svg";
import logo from "../../assets/images/toga_logo.svg";

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <nav
      className={`h-screen bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 z-30 shadow-lg transition-all duration-300 ${
        isOpen ? "w-56" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-4 min-h-16">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
          <img src={logo} alt="logo" className="w-8 h-8" />
        </div>
        <span
          className={`text-[#357C23] font-lexend font-bold text-sm whitespace-nowrap transition-all duration-200 ${
            isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          TogaPed Admin
        </span>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer absolute -right-3 top-15 w-6 h-6 bg-[#357C23] rounded-full flex items-center justify-center shadow-md hover:bg-[#2A6B1C] transition-colors"
      >
        <svg
          className={`w-3 h-3 text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Nav Items */}
      <div className="flex flex-col gap-1 px-2 py-4 flex-1">
        <p
          className={`text-[10px] font-lexend font-semibold text-gray-400 uppercase tracking-widest px-2 mb-1 transition-all duration-200 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Menu
        </p>

        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `cursor-pointer group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-[#357C23] hover:shadow-md ${
              isActive ? "bg-[#357C23] shadow-md" : ""
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={dashboardIcon}
                alt="Dashboard"
                className={`w-5 h-5 shrink-0 transition-all group-hover:brightness-0 group-hover:invert ${
                  isActive ? "brightness-0 invert" : ""
                }`}
              />
              <span
                className={`text-sm font-lexend font-medium whitespace-nowrap transition-all duration-200 group-hover:text-white ${
                  isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                } ${isActive ? "text-white" : "text-gray-600"}`}
              >
                Dashboard
              </span>
            </>
          )}
        </NavLink>

        {/* Tabel Data */}
        <NavLink
          to="/admin/table-data"
          className={({ isActive }) =>
            `cursor-pointer group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-[#357C23] hover:shadow-md ${
              isActive ? "bg-[#357C23] shadow-md" : ""
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={tableIcon}
                alt="Tabel Data"
                className={`w-5 h-5 shrink-0 transition-all group-hover:brightness-0 group-hover:invert ${
                  isActive ? "brightness-0 invert" : ""
                }`}
              />
              <span
                className={`text-sm font-lexend font-medium whitespace-nowrap transition-all duration-200 group-hover:text-white ${
                  isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                } ${isActive ? "text-white" : "text-gray-600"}`}
              >
                Tabel Data
              </span>
            </>
          )}
        </NavLink>
      </div>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="cursor-pointer group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-all duration-200"
        >
          <svg
            className="w-5 h-5 text-red-400 shrink-0 group-hover:text-red-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
          <span
            className={`text-sm font-lexend font-medium text-red-400 group-hover:text-red-600 whitespace-nowrap transition-all duration-200 ${
              isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            Logout
          </span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;