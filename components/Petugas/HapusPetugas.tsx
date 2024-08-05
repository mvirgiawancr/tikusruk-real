"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

type Petugas = {
  id_petugas: number;
  nama: string;
  no_telepon: string;
  posisi: string;
};

const HapusPetugas = ({ petugas }: { petugas: Petugas }) => {
  const router = useRouter();

  const handleHapus = async () => {
    try {
      await Swal.fire({
        title: "Konfirmasi",
        text: `Anda yakin ingin menghapus petugas ${petugas.nama}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/api/petugas/${petugas.id_petugas}`);
          Swal.fire({
            title: "Terhapus!",
            text: "Petugas berhasil dihapus",
            icon: "success",
            confirmButtonText: "Ok",
          });
          router.refresh();
        }
      });
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan, coba lagi",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <button className="btn btn-sm btn-error" onClick={handleHapus}>
      Hapus Petugas
    </button>
  );
};

export default HapusPetugas;
