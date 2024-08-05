import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="hero bg-base-200 min-h-[calc(100vh-80px)]">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Selamat Datang</h1>
            <p className="py-6 text-justify">
              Selamat datang di Tikusruk! Kelola tiket bus, Penyewaan Bagasi,
              Penyewaan Bus, dan Pengelolaan Bus dengan mudah dan cepat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
