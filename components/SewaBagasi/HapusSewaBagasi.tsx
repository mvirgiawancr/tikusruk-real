"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

type SewaBagasi = {
  id_sewa_bagasi: number;
  berat: number;
  id_bus: number;
};

const HapusSewaBagasi = ({ sewaBagasi }: { sewaBagasi: SewaBagasi }) => {
  const router = useRouter();

  const handleHapus = async () => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi Penghapusan",
        text: "Yakin ingin menghapus sewa bagasi ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/sewabagasi/${sewaBagasi.id_sewa_bagasi}`);
        Swal.fire({
          title: "Sukses!",
          text: "Sewa bagasi berhasil dihapus",
          icon: "success",
          confirmButtonText: "OK",
        });
        router.refresh(); // Refresh halaman setelah penghapusan
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat menghapus sewa bagasi",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <button className="btn btn-error btn-sm" onClick={handleHapus}>
      Hapus Sewa Bagasi
    </button>
  );
};

export default HapusSewaBagasi;
