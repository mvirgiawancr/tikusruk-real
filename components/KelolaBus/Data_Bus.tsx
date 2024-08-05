// Data_Bus.client.tsx
"use client";
import React, { useState, useEffect } from "react";
import EditBus from "./EditBus";
import HapusBus from "./HapusBus";

interface Bus {
  id_bus: number;
  kapasitas_bagasi: number;
  jumlah_kursi: number;
  kelas: string;
  harga_sewa_bus: number;
  harga_sewa_bagasi: number;
  harga_tiket: number;
  jenis_bus: string;
  kota_asal: string;
  kota_tujuan: string;
  plat_bus: string;
}

const Data_Bus: React.FC = () => {
  const [bus, setBus] = useState<Bus[]>([]);

  useEffect(() => {
    async function fetchBus() {
      try {
        const response = await fetch("/api/bus", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Bus[] = await response.json();
        setBus(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    }

    fetchBus();
    const intervalId = setInterval(fetchBus, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="overflow-x-auto mt-4 px-4">
      <table className="table">
        <thead>
          <tr>
            <th>Id Bus</th>
            <th>Kapasitas Bagasi</th>
            <th>Jumlah Kursi</th>
            <th>Kelas</th>
            <th>Harga Sewa Bus</th>
            <th>Harga Sewa Bagasi</th>
            <th>Harga Tiket</th>
            <th>Jenis Bus</th>
            <th>Kota Asal</th>
            <th>Kota Tujuan</th>
            <th>Plat Bus</th>
          </tr>
        </thead>
        <tbody>
          {bus.map((data) => (
            <tr key={data.id_bus}>
              <td>{data.id_bus}</td>
              <td>{data.kapasitas_bagasi}</td>
              <td>{data.jumlah_kursi}</td>
              <td>{data.kelas}</td>
              <td>{data.harga_sewa_bus}</td>
              <td>{data.harga_sewa_bagasi}</td>
              <td>{data.harga_tiket}</td>
              <td>{data.jenis_bus}</td>
              <td>{data.kota_asal}</td>
              <td>{data.kota_tujuan}</td>
              <td>{data.plat_bus}</td>
              <td>
                <EditBus bus={data} />
              </td>
              <td>
                <HapusBus id={data.id_bus} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data_Bus;
