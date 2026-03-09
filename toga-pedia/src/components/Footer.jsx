import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#357C23] text-white">
      
      {/* Bagian Atas */}
      <div className="max-w-screen mx-auto px-6 md:px-16 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
        
        {/* Kiri: Identitas */}
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-white/30 border border-white/50"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white/60 border border-white/50"></div>
            </div>
            <span className="ml-2 font-lexend text-xl font-semibold text-white">Toga Pedia</span>
          </div>

          {/* Nama & Role */}
          <div>
            <p className="font-lexend font-semibold text-white text-base">Verel Aditya</p>
            <p className="text-white/70 text-sm mt-0.5">Developer · Tugas Akhir</p>
          </div>

          {/* Email */}
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Email</p>
            <a
              href="mailto:verel@example.com"
              className="text-white text-sm hover:text-white/80 transition"
            >
              verel@example.com
            </a>
          </div>
        </div>

        {/* Kanan: Tentang Proyek */}
        <div className="flex flex-col gap-4">
          <h3 className="font-lexend font-bold text-white text-xl md:text-2xl">
            Tentang Proyek Ini
          </h3>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            Toga Pedia adalah sistem pendukung keputusan berbasis web yang membantu masyarakat 
            memilih Tanaman Obat Keluarga (TOGA) yang paling sesuai dengan kondisi dan kebutuhan mereka, 
            menggunakan metode SAW dan TOPSIS.
          </p>

          {/* Sosial Media */}
          <div className="flex items-center gap-5 mt-1">
            {/* Instagram */}
            <a href="#" className="text-white/70 hover:text-white transition" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
            </a>
            {/* GitHub */}
            <a href="#" className="text-white/70 hover:text-white transition" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.09.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10Z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="text-white/70 hover:text-white transition" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 mx-6 md:mx-16" />

      {/* Bagian Bawah */}
      <div className="max-w-screen mx-auto px-6 md:px-16 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Nav Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 font-lexend text-sm text-white/70">
          <Link to="/" className="hover:text-white transition">Beranda</Link>
          <Link to="/katalog-toga" className="hover:text-white transition">Katalog TOGA</Link>
          <Link to="/rekomendasi" className="hover:text-white transition">Rekomendasi</Link>
          <Link to="/tentang" className="hover:text-white transition">Tentang</Link>
        </div>

        {/* Copyright */}
        <p className="text-white/50 text-xs">
          © {new Date().getFullYear()} Toga Pedia · Tugas Akhir Verel Aditya
        </p>
      </div>

    </footer>
  );
};

export default Footer;