import React from "react";

const ModalDelete = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg p-6">
        {/* Icon Warning */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
          <h2 className="font-lexend text-xl font-semibold text-center text-[#2C2C2C] mb-2">
            Konfirmasi Hapus Data
          </h2>

          {/* Message */}
          <p className="font-lexend text-sm text-center text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus <span className="font-semibold text-red-600">"{itemName}"</span>
            <br />
            Data yang dihapus tidak dapat dikembalikan.
          </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-300 cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 cursor-pointer"
            >
              Hapus
            </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
