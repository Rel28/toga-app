import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Chatbot from "./ChatBot";
import chatIcon from "../assets/images/chat_bubble.svg";
import logo from "../assets/images/toga_logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navLink = [
    { label: "Beranda", path: "/" },
    { label: "Katalog TOGA", path: "/katalog-toga" },
    { label: "Tentang", path: "/tentang" },
  ];

  const isActive = (to) => {
    return to === "/" ? pathname === "/" : pathname.startsWith(to);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4 shadow-sm bg-white">
        {/* Bagian Logo */}
        <div className="flex items-center gap-1">
          <div className="relative w-12 h-12">
            <img src={logo} alt="Logo Toga Pedia" className="w-full h-full object-contain" />
          </div>
          <div className="text-[#357C23] ml-2 font-lexend text-xl font-semibold">
            TogaPed
          </div>
        </div>

        {/* Navigasi */}
        <div className="hidden md:flex gap-8 text-lg font-medium font-lexend text-gray-500 absolute left-1/2 -translate-x-1/2">
          {navLink.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`group relative pb-1 transition-colors duration-200 ${
                isActive(link.path)
                  ? "text-[#357C23] font-semibold"
                  : "text-gray-500 hover:text-[#357C23]"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-[#357C23] rounded-full transition-all duration-300 ${
                  isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Tombol Chat + Rekomendasi (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            title="Asisten TogaPedia"
            className={`text-xl font-lexend px-5 py-4 rounded-xl font-medium transition shadow-md border-2 ${
              isChatOpen
                ? "bg-[#e8f5e9] text-[#357C23] border-[#357C23]"
                : "bg-white text-[#357C23] border-[#357C23] hover:bg-[#e8f5e9] cursor-pointer"
            }`}
          >
            <img src={chatIcon} alt="" className="" />
          </button>
          <button
            onClick={() => navigate("/rekomendasi")}
            className={`text-xl font-lexend px-10 py-4 rounded-xl font-medium transition shadow-md ${
              isActive("/rekomendasi")
                ? "bg-[#2a5d1a] text-white ring-2 ring-[#357C23]"
                : "bg-[#357C23] text-white hover:bg-[#2a5d1a] cursor-pointer"
            }`}
          >
            Rekomendasi
          </button>
        </div>

        {/* Tombol Chat + Hamburger (Mobile) */}
        <div className="md:hidden flex items-center gap-3">
          {/* Tombol Chatbot */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            title="Asisten TogaPedia"
            className={`text-xl w-9 h-9 flex items-center justify-center rounded-lg border-1.5 transition ${
              isChatOpen
                ? "bg-[#e8f5e9] text-[#357C23] border-[#357C23]"
                : "bg-white text-[#357C23] border-[#357C23] hover:bg-[#e8f5e9]"
            }`}
          >
            <img src={chatIcon} alt="" className="" />
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 w-8 h-8 justify-center"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-full bg-[#357C23] transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block h-0.5 w-full bg-[#357C23] transition-opacity ${isOpen ? "opacity-0" : ""}`}></span>
            <span className={`block h-0.5 w-full bg-[#357C23] transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </nav>

      {/* Chatbot Panel */}
      <Chatbot isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />

      {/* Black Background When Sidebar Open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        ></div>
      )}

      {/* Sidebar Menu Mobile */}
      <div
        className={`fixed top-20 right-0 h-90 w-full bg-white shadow-lg z-30 transform transition-transform ${isOpen ? "translate-y-0" : "-translate-y-full"} md:hidden`}
      >
        <div className="flex flex-col p-6 gap-8">
          <div className="flex flex-col gap-8 font-lexend text-lg font-medium">
            {navLink.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`pb-3 border-b border-gray-300 ${isActive(link.path) ? "text-[#357C23] font-semibold border-[#557C2F]" : "text-gray-500 hover:text-[#357C23] transition"}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Button Rekomendasi di Sidebar */}
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/rekomendasi");
              }}
              className={`text-lg font-lexend py-3 rounded-xl font-medium transition shadow-md mt-4 w-fit px-12 mx-auto ${
                isActive("/rekomendasi")
                  ? "bg-[#2a5d1a] text-white ring-2 ring-[#357C23]"
                  : "bg-[#357C23] text-white hover:bg-[#2a5d1a]"
              }`}
            >
              Rekomendasi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;