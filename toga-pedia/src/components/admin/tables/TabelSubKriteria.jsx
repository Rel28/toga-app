import React, { useState, useEffect } from "react";
import axios from "axios";

const TabelSubKriteria = () => {
  // === STATE DECLARATIONS ===
  // == Data States ==
  const [subkriteriaData, setSubkriteriaData] = useState([]);

  // == API CALLS ==
  const fetchSubKriteria = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/subkriteria/all",
      );
      setSubkriteriaData(response.data);
    } catch (error) {
      console.error("Error fetching subkriteria data:", error);
    }
  };

  useEffect(() => {
    fetchSubKriteria();
  }, []);

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden max-w-3xl">
      {/* Judul */}
      <div className="flex justify-between items-center px-6 py-4 border-b-2 border-gray-200">
        <h3 className="font-lexend text-xl font-semibold text-[#2C2C2C]">
          Tabel Sub Kriteria
        </h3>
        <div className="flex gap-2"></div>
      </div>

      {/* Tabel Data */}
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-gray-200 bg-gray-200">
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Kode Kriteria
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Label Kriteria
            </th>
            <th className="font-lexend text-sm font-normal text-[#2C2C2C] py-4 text-center">
              Nilai
            </th>
          </tr>
        </thead>
        <tbody>
          {subkriteriaData.map((subkriteria) => (
            <tr key={subkriteria.id} className="border-b border-gray-200">
              <td className="font-lexend text-xs text-[#ACACAC] py-4 text-center px-2">
                {subkriteria.kode}
              </td>
              <td className="font-lexend text-sm text-[#ACACAC] py-4 text-center">
                {subkriteria.label}
              </td>
              <td className="font-lexend text-sm text-[#2C2C2C] py-4 text-center">
                {subkriteria.nilai}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelSubKriteria;
