"use client";
import React from "react";
import { useState, SyntheticEvent } from "react";
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

const SewaBus = ({ bus }: { bus: Data_bus[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [idBus, setIdBus] = useState("");
  const [tanggal_sewa, setTanggalSewa] = useState("");
  const [tanggal_kembali, setTanggalKembali] = useState("");
  const router = useRouter();
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      id_petugas: localStorage.getItem("petugasId"),
      nama: nama,
      no_telepon: noTelepon,
      alamat: alamat,
      plat_bus: idBus,
      tanggal_sewa: tanggal_sewa,
      tanggal_kembali: tanggal_kembali,
    };
    console.log("Submitting Data:", data); // Log data yang dikirim
    try {
      await axios.post("/api/sewabus", data);

      setNama("");
      setNoTelepon("");
      setAlamat("");
      setIdBus("");
      setTanggalSewa("");
      setTanggalKembali("");
      Swal.fire({
        title: "Success!",
        text: "Data berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "Ok",
      });
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
        Sewa Bus
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambahkan Penyewa Bus</h3>
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
                value={idBus}
                onChange={(e) => setIdBus(e.target.value)}
              >
                <option value="" disabled>
                  Pilih Bus
                </option>
                {bus
                  .filter((bus) => bus.jenis_bus === JenisBus.Pariwisata)
                  .map((bus) => (
                    <option value={bus.plat_bus} key={bus.plat_bus}>
                      {bus.plat_bus}
                    </option>
                  ))}
              </select>
              <div className="form-control w-full">
                <label className="label font-bold">Tanggal Sewa</label>
                <input
                  type="date"
                  value={tanggal_sewa}
                  onChange={(e) => setTanggalSewa(e.target.value)}
                  className="input input-bordered"
                  placeholder="Tanggal Sewa"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-bold">Tanggal Kembali</label>
                <input
                  type="date"
                  value={tanggal_kembali}
                  onChange={(e) => setTanggalKembali(e.target.value)}
                  className="input input-bordered"
                  placeholder="Tanggal Kembali"
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

export default SewaBus;
