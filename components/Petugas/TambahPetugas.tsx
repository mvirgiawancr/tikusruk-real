"use client";
import React from "react";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

const TambahPetugas = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [no_telepon, setNoTelepon] = useState("");
  const [posisi, setPosisi] = useState("");
  const router = useRouter();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleTambah = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      await axios.post("/api/petugas", {
        nama,
        no_telepon,
        posisi,
      });
      setNama("");
      setNoTelepon("");
      setPosisi("");
      Swal.fire({
        title: "Success!",
        text: "Petugas berhasil ditambahkan",
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
          text: "Terjadi kesalahan, coba lagi",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };

  return (
    <div>
      <button className="btn btn-sm" onClick={handleModal}>
        Tambah Petugas
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Petugas</h3>
          <form onSubmit={handleTambah}>
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
                value={no_telepon}
                onChange={(e) => setNoTelepon(e.target.value)}
                className="input input-bordered"
                placeholder="No Telepon"
              />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Posisi</label>
              <input
                type="text"
                value={posisi}
                onChange={(e) => setPosisi(e.target.value)}
                className="input input-bordered"
                placeholder="Posisi"
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

export default TambahPetugas;
