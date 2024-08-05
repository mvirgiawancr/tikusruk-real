"use client";
import React, { useState, useEffect, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

enum JenisBus {
  Akap = "Akap",
  Pariwisata = "Pariwisata",
}

type Data_bus = {
  plat_bus: string;
  jenis_bus: JenisBus;
};

const SewaBagasi = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [platBus, setPlatBus] = useState("");
  const [berat, setBerat] = useState<number | "">("");
  const [bus, setBus] = useState<Data_bus[]>([]);
  const router = useRouter();

  const fetchBus = async () => {
    try {
      const response = await axios.get("/api/bus");
      setBus(response.data);
    } catch (error) {
      console.error("Failed to fetch bus data:", error);
    }
  };

  useEffect(() => {
    fetchBus();
  }, []);

  const handleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchBus(); // Refresh bus data when opening the modal
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      id_petugas: localStorage.getItem("petugasId"),
      nama: nama,
      no_telepon: noTelepon,
      alamat: alamat,
      plat_bus: platBus,
      berat: Number(berat),
    };
    console.log("Submitting Data:", data); // Log data yang dikirim
    try {
      await axios.post("/api/sewabagasi", data);

      setNama("");
      setNoTelepon("");
      setAlamat("");
      setPlatBus("");
      setBerat("");
      Swal.fire({
        title: "Success!",
        text: "Data berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "Ok",
      });
      fetchBus(); // Refresh bus data after adding a new bus
      router.refresh();
      setIsOpen(false);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        Swal.fire({
          title: "Error!",
          text: error.response.data.error,
          icon: "error",
          confirmButtonText: "Ok",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Masukkan Data dengan benar",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };

  return (
    <div>
      <button className="btn" onClick={handleModal}>
        Sewa Bagasi
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambahkan Penyewa Bagasi</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Nama</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="input input-bordered"
                placeholder="Nama"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">No Telepon</label>
              <input
                type="text"
                value={noTelepon}
                onChange={(e) => setNoTelepon(e.target.value)}
                className="input input-bordered"
                placeholder="No Telepon"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Alamat</label>
              <input
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="input input-bordered"
                placeholder="Alamat"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Bus</label>
              <select
                className="select select-bordered"
                value={platBus}
                onChange={(e) => setPlatBus(e.target.value)}
              >
                <option value="" disabled>
                  Pilih Bus
                </option>
                {bus.map((bus) => (
                  <option value={bus.plat_bus} key={bus.plat_bus}>
                    {bus.plat_bus}
                  </option>
                ))}
              </select>
              <div className="form-control w-full">
                <label className="label font-bold">Berat</label>
                <input
                  type="number"
                  value={berat}
                  onChange={(e) => setBerat(Number(e.target.value))}
                  className="input input-bordered"
                  placeholder="Berat"
                />
              </div>
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-secondary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SewaBagasi;
