"use client";
import React from "react";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

const TambahBus = ({ bus }: { bus: { id_bus: number }[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [kapasitas_bagasi, setKapasitasBagasi] = useState("");
  const [jumlah_kursi, setJumlahKursi] = useState("");
  const [Kelas, setKelas] = useState("");
  const [harga_sewa_bus, setHargaSewaBus] = useState("");
  const [harga_sewa_bagasi, setHargaBagasi] = useState("");
  const [harga_tiket, setHargaTiket] = useState("");
  const [jenis, setJenis] = useState("");
  const [kota_asal, setKotaAsal] = useState("");
  const [kota_tujuan, setKotaTujuan] = useState("");
  const [plat, setPlat] = useState("");
  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleTambah = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      await axios.post("/api/bus", {
        kapasitas_bagasi: kapasitas_bagasi,
        jumlah_kursi: jumlah_kursi,
        kelas: Kelas,
        harga_sewa_bus: Number(harga_sewa_bus),
        harga_sewa_bagasi: Number(harga_sewa_bagasi),
        harga_tiket: Number(harga_tiket),
        jenis: jenis,
        kota_asal: kota_asal,
        kota_tujuan: kota_tujuan,
        plat: plat,
      });
      setKapasitasBagasi("");
      setJumlahKursi("");
      setKelas("");
      setHargaSewaBus("");
      setHargaBagasi("");
      setHargaTiket("");
      setKotaAsal("");
      setKotaTujuan("");
      setPlat("");
      setJenis("");
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
      <button className="btn btn-sm" onClick={handleModal}>
        Tambah Bus
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Bus</h3>
          <form onSubmit={handleTambah}>
            <div className="form-control w-full">
              <label className="label font-bold">Kapasitas Bagasi</label>
              <input
                type="text"
                value={kapasitas_bagasi}
                onChange={(e) => setKapasitasBagasi(e.target.value)}
                className="input input-bordered"
                placeholder="Kapasitas Bagasi"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Jumlah Kursi</label>
              <input
                type="text"
                value={jumlah_kursi}
                onChange={(e) => setJumlahKursi(e.target.value)}
                className="input input-bordered"
                placeholder="Jumlah Kursi"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Kelas</label>
              <input
                type="text"
                value={Kelas}
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
                onChange={(e) => setHargaSewaBus(e.target.value)}
                className="input input-bordered"
                placeholder="Harga Sewa Bus"
              />
              <div className="form-control w-full">
                <label className="label font-bold">Harga Sewa Bagasi</label>
                <input
                  type="text"
                  value={harga_sewa_bagasi}
                  onChange={(e) => setHargaBagasi(e.target.value)}
                  className="input input-bordered"
                  placeholder="Harga Sewa Bagasi"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-bold">Harga Tiket</label>
                <input
                  type="text"
                  value={harga_tiket}
                  onChange={(e) => setHargaTiket(e.target.value)}
                  className="input input-bordered"
                  placeholder="Harga Tiket"
                />
              </div>
              <div className="form-control w-full">
                <label className="label font-bold">Jenis Bus</label>
                <select
                  className="select select-bordered"
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Jenis Bus
                  </option>
                  <option value="Akap">Akap</option>
                  <option value="Pariwisata">Pariwisata</option>
                </select>
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

export default TambahBus;
