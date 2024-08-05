"use client";
import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
const HapusBus = ({ id }: { id: number }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      // Menampilkan modal konfirmasi
      const result = await Swal.fire({
        title: "Konfirmasi Hapus",
        text: "Apakah Anda yakin ingin menghapus bus ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal", // Menambahkan teks pada tombol batal
      });

      // Jika konfirmasi ditekan
      if (result.isConfirmed) {
        await axios.delete(`/api/bus/${id}`);
        await Swal.fire(
          "Terhapus!",
          "Bus dan data terkait telah dihapus.",
          "success"
        );
        // Refresh halaman setelah penghapusan berhasil
        router.refresh();
      }
    } catch (error) {
      await Swal.fire(
        "Error!",
        "Terjadi kesalahan saat menghapus bus.",
        "error"
      );
    }
  };

  return (
    <button className="btn btn-sm btn-error" onClick={handleDelete}>
      Hapus Bus
    </button>
  );
};

export default HapusBus;
