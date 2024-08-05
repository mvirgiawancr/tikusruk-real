"use client";
import React from "react";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

type Data_bus = {
  id_bus: number;
  kapasitas_bagasi: number;
  jumlah_kursi: number;
  kelas: string;
  harga_sewa_bus: number;
  harga_sewa_bagasi: number;
  harga_tiket: number;
  jenis_bus: string;
  kota_tujuan: string;
  kota_asal: string;
  plat_bus: string;
};

const EditBus = ({ bus }: { bus: Data_bus }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [kapasitas_bagasi, setKapasitasBagasi] = useState(bus.kapasitas_bagasi);
  const [jumlah_kursi, setJumlahKursi] = useState(bus.jumlah_kursi);
  const [kelas, setKelas] = useState(bus.kelas);
  const [harga_sewa_bus, setHargaSewaBus] = useState(bus.harga_sewa_bus);
  const [harga_sewa_bagasi, setHargaBagasi] = useState(bus.harga_sewa_bagasi);
  const [harga_tiket, setHargaTiket] = useState(bus.harga_tiket);
  const [kota_asal, setKotaAsal] = useState(bus.kota_asal);
  const [kota_tujuan, setKotaTujuan] = useState(bus.kota_tujuan);
  const [plat, setPlat] = useState(bus.plat_bus);
  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdate = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      await axios.patch(`/api/bus/${bus.id_bus}`, {
        kapasitas_bagasi,
        jumlah_kursi,
        kelas,
        harga_sewa_bus: Number(harga_sewa_bus),
        harga_sewa_bagasi: Number(harga_sewa_bagasi),
        harga_tiket: Number(harga_tiket),
        kota_asal,
        kota_tujuan,
        plat_bus: plat,
      });
      Swal.fire({
        title: "Success!",
        text: "Data berhasil diubah",
        icon: "success",
        confirmButtonText: "Ok",
      });
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Masukkan Data dengan benar",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div>
      <button className="btn btn-sm" onClick={handleModal}>
        Edit Bus
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Bus {bus.id_bus}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-1/3">
              <label className="label font-bold">Kapasitas Bagasi</label>
              <input
                type="text"
                value={kapasitas_bagasi}
                onChange={(e) => setKapasitasBagasi(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Kapasitas Bagasi"
              />
            </div>
            <div className="form-control w-1/4">
              <label className="label font-bold">Jumlah Kursi</label>
              <input
                type="text"
                value={jumlah_kursi}
                onChange={(e) => setJumlahKursi(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Jumlah Kursi"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Kelas</label>
              <input
                type="text"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="input input-bordered"
                placeholder="Kelas"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Harga Sewa Bus</label>
              <input
                type="text"
                value={harga_sewa_bus}
                onChange={(e) => setHargaSewaBus(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Harga Sewa Bus"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Harga Sewa Bagasi</label>
              <input
                type="text"
                value={harga_sewa_bagasi}
                onChange={(e) => setHargaBagasi(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Harga Sewa Bagasi"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Harga Tiket</label>
              <input
                type="text"
                value={harga_tiket}
                onChange={(e) => setHargaTiket(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Harga Tiket"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Jenis Bus</label>
              <input
                type="text"
                value={bus.jenis_bus}
                disabled
                className="input input-bordered"
                placeholder="Jenis Bus"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Kota Asal</label>
              <input
                type="text"
                value={kota_asal}
                onChange={(e) => setKotaAsal(e.target.value)}
                className="input input-bordered"
                placeholder="Kota Asal"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Kota Tujuan</label>
              <input
                type="text"
                value={kota_tujuan}
                onChange={(e) => setKotaTujuan(e.target.value)}
                className="input input-bordered"
                placeholder="Kota Tujuan"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Plat Bus</label>
              <input
                type="text"
                value={plat}
                onChange={(e) => setPlat(e.target.value)}
                className="input input-bordered"
                placeholder="Plat Bus"
              />
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

export default EditBus;
