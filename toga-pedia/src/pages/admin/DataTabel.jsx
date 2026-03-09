import React, { useState, useEffect } from 'react'
import AdminNav from '../../components/admin/AdminNav'
import TabelToga from '../../components/admin/tables/TabelToga'
import TabelKategori from '../../components/admin/tables/TabelKategori'
import TabelPenanaman from '../../components/admin/tables/TabelPenanaman'
import TabelPengolahan from '../../components/admin/tables/TabelPengolahan'
import TabelKriteria from '../../components/admin/tables/TabelKriteria'
import TabelSubKriteria from '../../components/admin/tables/TabelSubKriteria'

const DataTabel = () => {
    // State untuk menyimpan data tabel
    const [activeTab, setActiveTab] = useState('toga')

    const tabs = [
        { id: 'toga', label : 'Data TOGA' },
        { id: 'kategori', label : 'Data Kategori' }, 
        { id: 'penanaman', label : 'Data Penanaman' }, 
        { id: 'pengolahan', label : 'Data Pengolahan' },
        { id: 'kriteria', label : 'Data Kriteria' },
        { id: 'subkriteria', label : 'Data Sub Kriteria' }
    ];

    const renderTable = () => {
        switch(activeTab) {
            case 'toga':
                return <TabelToga />;
            case 'kategori':
                return <TabelKategori />;
            case 'penanaman':
                return <TabelPenanaman />;
            case 'pengolahan':
                return <TabelPengolahan />;
            case 'kriteria':
                return <TabelKriteria />;
            case 'subkriteria':
                return <TabelSubKriteria />;
            default:
                return null;
        }
    };


  return (
    <main className="min-h-screen bg-[#FDFDFD]">
        <AdminNav />
        <div className="ml-12">
            {/* Title */}
            <section className="pt-12 pb-12 px-6 md:px-16">
                <h1 className="font-lexend text-2xl md:text-3xl font-semibold text-[#2C2C2C]">Halo, Admin!</h1>
                <p className="font-lexend text-sm md:text-base font-normal text-[#ACACAC]">Pantau dan atur seluruh konten aplikasi TOGA Anda <br />dari panel ini.</p>
            </section>

            {/* Tabel Data */}
            <section className="px-6 md:px-16">
                {/* Title */}
                <h2 className="font-lexend text-xl md:text-3xl font-semibold text-[#2C2C2C] mb-3">Data Tabel</h2>
            </section>

            {/* Konten Tabel */}
            <section className="px-6 md:px-16">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 font-lexend text-sm md:text-base whitespace-nowrap transition-colors duration-300 cursor-pointer ${activeTab === tab.id ? 'border-b-2 border-[#357C23] text-[#357C23] font-medium' : 'text-gray-500 hover:text-[#357C23]'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Render Tabel Berdasarkan Tab Aktif */}
                <div className="mt-4 mb-8">
                    {renderTable()}
                </div>

            </section>
        </div>
    </main>
  )
}

export default DataTabel