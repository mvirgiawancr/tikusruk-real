// Data_Bagasi.client.tsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TiArrowBack } from "react-icons/ti";
import HapusSewaBagasi from "./HapusSewaBagasi";

interface Pelanggan {
  nama: string;
}

interface Petugas {
  nama: string;
}

interface SewaBagasi {
  id_sewa_bagasi: number;
  berat: number;
  pelanggan: Pelanggan | null;
  petugas: Petugas | null;
  id_bus: number;
}

const Data_Bagasi: React.FC = () => {
  const [sewaBagasi, setSewaBagasi] = useState<SewaBagasi[]>([]);

  useEffect(() => {
    async function fetchSewaBagasi() {
      try {
        const response = await fetch("/api/sewa-bagasi", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: SewaBagasi[] = await response.json();
        setSewaBagasi(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    }

    fetchSewaBagasi();
    const intervalId = setInterval(fetchSewaBagasi, 3000); // Ubah interval menjadi 3 detik

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Link href={"/penyewaanbagasi"} className="btn btn-ghost mt-2">
        <TiArrowBack className="" />
      </Link>
      <div className="overflow-hidden px-16">
        <table className="table w-full mt-12">
          <thead>
            <tr>
              <th>Id Sewa Bagasi</th>
              <th>Berat</th>
              <th>Nama Pelanggan</th>
              <th>Nama Petugas</th>
              <th>Id Bus</th>
              <th>Hapus</th>
            </tr>
          </thead>
          <tbody>
            {sewaBagasi.map((data, index) => (
              <tr key={index}>
                <td>{data.id_sewa_bagasi}</td>
                <td>{data.berat}</td>
                <td>{data.pelanggan?.nama || "Tidak Diketahui"}</td>
                <td>{data.petugas?.nama || "Tidak Diketahui"}</td>
                <td>{data.id_bus}</td>
                <td>
                  <HapusSewaBagasi
                    sewaBagasi={{
                      id_sewa_bagasi: data.id_sewa_bagasi,
                      id_bus: data.id_bus,
                      berat: data.berat,
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Data_Bagasi;
