"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

// Perbarui tipe data sesuai kebutuhan Anda
type Tiket = {
  id_tiket: number;
  plat_bus?: string;
};

const HapusTiket = ({ tiket }: { tiket: Tiket }) => {
  const router = useRouter();

  const handleHapus = async () => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi Penghapusan",
        text: "Yakin ingin menghapus tiket ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Tidak",
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/tiket/${tiket.id_tiket}`, {
          data: { plat_bus: tiket.plat_bus },
        });
        Swal.fire({
          title: "Sukses!",
          text: "Tiket berhasil dihapus",
          icon: "success",
          confirmButtonText: "OK",
        });
        router.refresh(); // Refresh halaman setelah penghapusan
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat menghapus tiket",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <button className="btn btn-error btn-sm" onClick={handleHapus}>
      Hapus Tiket
    </button>
  );
};

export default HapusTiket;
