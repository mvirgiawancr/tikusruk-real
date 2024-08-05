"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

type SewaBus = {
  id_sewa_bus: number;
  plat_bus: string;
};

const HapusSewaBus = ({ sewaBus }: { sewaBus: SewaBus }) => {
  const router = useRouter();

  const handleHapus = async () => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi Penghapusan",
        text: "Yakin ingin menghapus penyewaan bus ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Tidak",
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/sewabus/${sewaBus.id_sewa_bus}`);
        Swal.fire({
          title: "Sukses!",
          text: "Penyewaan bus berhasil dihapus",
          icon: "success",
          confirmButtonText: "OK",
        });
        router.refresh(); // Refresh halaman setelah penghapusan
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat menghapus penyewaan bus",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <button className="btn btn-error btn-sm" onClick={handleHapus}>
      Hapus Penyewaan
    </button>
  );
};

export default HapusSewaBus;
