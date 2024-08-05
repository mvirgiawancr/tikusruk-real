// Data_Petugas.client.tsx
"use client";
import React, { useState, useEffect } from "react";
import EditPetugas from "./EditPetugas";
import HapusPetugas from "./HapusPetugas";

interface Petugas {
  id_petugas: number;
  nama: string;
  posisi: string;
  no_telepon: string;
}

const Data_Petugas: React.FC = () => {
  const [petugas, setPetugas] = useState<Petugas[]>([]);

  useEffect(() => {
    async function fetchPetugas() {
      try {
        const response = await fetch("/api/petugas");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Petugas[] = await response.json();
        setPetugas(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    }

    fetchPetugas();
    const intervalId = setInterval(fetchPetugas, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="overflow-x-auto mt-4 px-16">
      <table className="table">
        <thead>
          <tr>
            <th>Id Petugas</th>
            <th>Nama Petugas</th>
            <th>No Telepon</th>
            <th>Posisi</th>
          </tr>
        </thead>
        <tbody>
          {petugas.map((data) => (
            <tr key={data.id_petugas}>
              <td>{data.id_petugas}</td>
              <td>{data.nama}</td>
              <td>{data.no_telepon}</td>
              <td>{data.posisi}</td>
              <td>
                <EditPetugas petugas={data} />
              </td>
              <td>
                <HapusPetugas petugas={data} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data_Petugas;
