// Data_Tiket.client.tsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TiArrowBack } from "react-icons/ti";
import HapusTiket from "./Hapus_Tiket";

interface Pelanggan {
  nama: string;
}

interface Petugas {
  nama: string;
}

interface Tiket {
  id_tiket: number;
  id_bus: number;
  pelanggan: Pelanggan | null;
  petugas: Petugas | null;
  kelas: string;
  no_kursi: number;
}

const Data_Tiket: React.FC = () => {
  const [tiket, setTiket] = useState<Tiket[]>([]);

  useEffect(() => {
    async function fetchTiket() {
      try {
        const response = await fetch("/api/tiket", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Tiket[] = await response.json();
        setTiket(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    }

    fetchTiket();
    const intervalId = setInterval(fetchTiket, 3000); // Ubah interval menjadi 3 detik

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Link href={"/tiket"} className="btn btn-ghost mt-2">
        <TiArrowBack className="" />
      </Link>
      <div className="overflow-hidden px-16">
        <table className="table w-full mt-12">
          <thead>
            <tr>
              <th>Id Tiket</th>
              <th>Id Bus</th>
              <th>Nama Pelanggan</th>
              <th>Nama Petugas</th>
              <th>Kelas</th>
              <th>No Kursi</th>
              <th>Hapus</th>
            </tr>
          </thead>
          <tbody>
            {tiket.map((data, index) => (
              <tr key={index}>
                <td>{data.id_tiket}</td>
                <td>{data.id_bus}</td>
                <td>{data.pelanggan?.nama || "Tidak Diketahui"}</td>
                <td>{data.petugas?.nama || "Tidak Diketahui"}</td>
                <td>{data.kelas}</td>
                <td>{data.no_kursi}</td>
                <td>
                  <HapusTiket tiket={{ id_tiket: data.id_tiket }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Data_Tiket;
