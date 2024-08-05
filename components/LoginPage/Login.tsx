"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const Login = () => {
  // State untuk menyimpan input pengguna
  const [idPetugas, setIdPetugas] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        id_petugas: idPetugas,
        nama: password,
      });

      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        // Simpan id_petugas di localStorage atau sesi jika diperlukan
        localStorage.setItem("petugasId", response.data.petugasId);
        localStorage.setItem("posisi", response.data.posisi);
        // Redirect ke halaman berikutnya atau beri umpan balik

        if (response.data.posisi === "Admin") {
          await Swal.fire({
            title: "Login Gagal",
            text: "Silakan Login Sebagai Admin",
            icon: "info",
            confirmButtonText: "Ok",
          });
          router.push("/loginadmin");
        } else {
          await Swal.fire({
            title: "Success!",
            text: "Login Berhasil",
            icon: "success",
            confirmButtonText: "Ok",
          });
          router.push("/dashboard");
        }
      }
    } catch (error: any) {
      setSuccess(false);
      if (error.response) {
        await Swal.fire({
          title: "Error!",
          text: "Id Petugas Atau Password Salah!",
          icon: "error",
          confirmButtonText: "Ok",
        });
        // Jika ada respons error dari server
        setError(error.response.data.error);
      } else {
        // Jika terjadi kesalahan lain (misalnya, jaringan)
        setError("Terjadi kesalahan saat login");
      }
    }
  };

  return (
    <div className="hero bg-base-200 h-[calc(100vh-80px)]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left ml-20">
          <h1 className="text-5xl font-bold">Login</h1>
          <p className="py-6">Silakan Masukkan ID Petugas Dan Password Anda</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">ID Petugas</span>
              </label>
              <input
                type="text"
                placeholder="Id Petugas"
                className="input input-bordered"
                value={idPetugas}
                onChange={(e) => setIdPetugas(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <label className="label">
              <Link
                href="/loginadmin"
                className="label-text-alt link link-hover"
              >
                Login Admin?
              </Link>
            </label>
            <div className="form-control mt-6">
              <button className="btn btn-base-200" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
