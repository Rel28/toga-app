import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'


const DetailToga = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDetail = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/tanaman/${id}`);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Gagal ambil data detail:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">Loading...</div>
    }

    if (!data) {
        return <div className="min-h-screen flex justify-center items-center">Data tidak ditemukan.</div>
    }

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
        <Navbar />

        <section className="pt-32 pb-20 px-6 md:px-16">
            <div className="max-w-screen mx-auto">
                <button 
                onClick={() => navigate(-1)}
                className="text-[#357C23] font-lexend font-medium mb-6 flex items-center gap-2 hover:underline"
                >
                    &#8592; Kembali
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    {/* Gambar TOGA */}
                    <div className="w-full h-75 md:h-125 border border-gray-200 rounded-xl overflow-hidden bg-white p-2">
                        <div className="w-full h-full bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                            <img src={data.image || "https://placehold.co/600x400"} alt={data.nama} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Detail Informasi */}
                    <div className="flex flex-col gap-0 border border-gray-200 rounded-lg overflow-hidden text-sm md:text-base">
                        {/* Nama Tanaman */}
                        <div className="flex flex-row bg-[#F1F1F1] p-4 md:p-5 border-b border-gray-100">
                            <span className="font-medium font-lexend text-gray-800 w-48 shrink-0"> Nama Tanaman:</span>
                            <span className="text-gray-600">{data.nama}</span>
                        </div>
                        {/* Kategori Tanaman */}
                        <div className="flex flex-row bg-white p-4 md:p-5 border-b border-gray-100">
                            <span className="font-medium font-lexend text-gray-800 w-48 shrink-0"> Kategori Tanaman:</span>
                            <span className="text-gray-600">{data.kategori}</span>
                        </div>
                        {/* Deskripsi Pendek */}
                        <div className="flex flex-row bg-[#F1F1F1] p-4 md:p-5 border-b border-gray-100">
                            <span className="font-medium font-lexend text-gray-800 w-48 shrink-0"> Deskripsi:</span>
                            <span className="text-gray-600">{data.kegunaan}</span>
                        </div>
                        {/* Harga Asli */}
                        <div className="flex flex-row bg-white p-4 md:p-5 border-b border-gray-100">
                            <span className="font-semibold text-gray-800 w-48 shrink-0">Harga Jual:</span>
                            <div className="flex flex-col">
                                {/* Harga Asli */}
                                <span className="text-[#357C23] font-bold">
                                    {data.harga > 0 ? formatRupiah(data.harga) : "Harga bervariasi"}
                                </span>
                            </div>
                        </div>
                        {/* Keperluan Lahan */}
                        <div className="flex flex-row bg-[#F1F1F1] p-4 md:p-5 border-b border-gray-100">
                            <span className="font-medium font-lexend text-gray-800 w-48 shrink-0"> Keperluan Lahan:</span>
                            <span className="text-gray-600">{data.labels?.lahan || "Tidak diketahui"}</span>
                        </div>
                        {/* Masa Panen */}
                        <div className="flex flex-row bg-white p-4 md:p-5 border-b border-gray-100">
                            <span className="font-medium font-lexend text-gray-800 w-48 shrink-0"> Masa Panen:</span>
                            <span className="text-gray-600">{data.labels?.panen || "Tidak diketahui"}</span>
                        </div>
                        {/* Kesulitan Pengolahan */}
                        <div className="flex flex-row bg-[#F1F1F1] p-4 md:p-5 border-b border-gray-100">
                            <span className="font-medium font-lexend text-gray-800 w-48 shrink-0"> Kesulitan Pengolahan:</span>
                            <span className="text-gray-600">{data.labels?.pengolahan || "Tidak diketahui"}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 mt-12">

                    {/* Kartu Panduan Penanaman */}
                    <div className="flex flex-col gap-6">
                        {data.cara_menanam && data.cara_menanam.length > 0 ? (
                            data.cara_menanam.map((guide, index) => (
                        <div key={index} className="border border-[#357C23] rounded-lg md:rounded-xl p-6 md:p-8 relative mt-6 bg-white shadow-base">
                            <div className="flex justify-center items-center">
                                <span className="bg-[#357C23] font-lexend text-white px-8 py-3 rounded-lg font-medium whitespace-nowrap">
                                    Cara Penanaman
                                </span>
                            </div>

                            <div className="mt-6 space-y-4">
                                {/* Metode */}
                                <div className="bg-[#F1F1F1] p-4 rounded-lg">
                                    <span className="font-medium text-gray-800 font-lexend w-52 shrink-0">
                                        Metode Penanaman:
                                    </span>
                                    <span className="text-gray-600 ml-2">
                                        {guide.metode}
                                    </span>
                                </div>

                                {/* Langkah-langkah */}
                                <div className="px-4">
                                    <h4 className="font-medium text-gray-800 font-lexend">
                                        Langkah-langkah:
                                    </h4>
                                    <ul className="list-disc list-outside ml-5 space-y-2 text-gray-600 leading-relaxed mt-2">
                                        {guide.langkah && guide.langkah.map((step, i) => (
                                            <li key={i}>{step}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">Tidak ada panduan penanaman tersedia.</p>
                )}
                    </div>

                    {/* Kartu Panduan Pengolahan */}
                    <div className="flex flex-col gap-6">
                        {data.cara_mengolah && data.cara_mengolah.length > 0 ? (
                            data.cara_mengolah.map((guide, index) => (
                        <div key={index} className="border border-[#357C23] rounded-lg md:rounded-xl p-6 md:p-8 relative mt-6 bg-white shadow-base">
                            <div className="flex justify-center items-center">
                                <span className="bg-[#357C23] font-lexend text-white px-8 py-3 rounded-lg font-medium whitespace-nowrap">
                                    Cara Pengolahan
                                </span>
                            </div>

                            <div className="mt-6 space-y-4">
                                {/* Nama Olahan */}
                                <div className="bg-[#F1F1F1] p-4 rounded-lg">
                                    <span className="font-medium text-gray-800 font-lexend w-52 shrink-0">
                                        Nama Olahan:
                                    </span>
                                    <span className="text-gray-600 ml-2">
                                        {guide.olahan}
                                    </span>
                                </div>

                                {/* Dosis */}
                                <div className="bg-white px-4 py-1 rounded-lg">
                                    <span className="font-medium text-gray-800 font-lexend w-52 shrink-0">
                                        Dosis Pemakaian:
                                    </span>
                                    <span className="text-gray-600 ml-2">
                                        {guide.dosis}
                                    </span>
                                </div>

                                {/* Langkah-langkah */}
                                <div className="p-4 bg-[#F1F1F1] rounded-lg">
                                    <h4 className="font-medium text-gray-800 font-lexend">
                                        Langkah-langkah:
                                    </h4>
                                    <ul className="list-disc list-outside ml-5 space-y-2 text-gray-600 leading-relaxed mt-2">
                                        {guide.langkah && guide.langkah.map((step, i) => (
                                            <li key={i}>{step}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">Tidak ada panduan penanaman tersedia.</p>
                )}
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default DetailToga