"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TiArrowBack } from "react-icons/ti";
import HapusSewaBus from "./HapusSewaBus";

interface Pelanggan {
  nama: string;
}

interface Petugas {
  nama: string;
}

interface SewaBus {
  id_sewa_bus: number;
  id_bus: number;
  pelanggan: Pelanggan | null;
  petugas: Petugas | null;
  tanggal_sewa: Date;
  tanggal_kembali: Date;
  plat_bus: string;
}

const Data_SewaBus: React.FC = () => {
  const [sewaBus, setSewaBus] = useState<SewaBus[]>([]);

  useEffect(() => {
    async function fetchSewaBus() {
      try {
        const response = await fetch("/api/sewabus", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: SewaBus[] = await response.json();
        console.log("Fetched Data:", data); // Log data yang diterima dari API
        setSewaBus(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    }

    fetchSewaBus();
    const intervalId = setInterval(fetchSewaBus, 3000); // Ubah interval menjadi 3 detik

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Link href={"/penyewaanbus"} className="btn btn-ghost mt-2">
        <TiArrowBack className="" />
      </Link>
      <div className="overflow-hidden px-16">
        <table className="table w-full mt-12">
          <thead>
            <tr>
              <th>Id Sewa Bus</th>
              <th>Id Bus</th>
              <th>Nama Pelanggan</th>
              <th>Nama Petugas</th>
              <th>Tanggal Sewa</th>
              <th>Tanggal Kembali</th>
              <th>Hapus</th>
            </tr>
          </thead>
          <tbody>
            {sewaBus.map((data, index) => (
              <tr key={index}>
                <td>{data.id_sewa_bus}</td>
                <td>{data.id_bus}</td>
                <td>{data.pelanggan ? data.pelanggan.nama : "N/A"}</td>{" "}
                {/* Pastikan data pelanggan ada */}
                <td>{data.petugas ? data.petugas.nama : "N/A"}</td>{" "}
                {/* Pastikan data petugas ada */}
                <td>{new Date(data.tanggal_sewa).toLocaleDateString()}</td>
                <td>{new Date(data.tanggal_kembali).toLocaleDateString()}</td>
                <td>
                  <HapusSewaBus
                    sewaBus={{
                      id_sewa_bus: data.id_sewa_bus,
                      plat_bus: data.plat_bus,
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

export default Data_SewaBus;
