import Data_Bus from "@/components/SewaBus/Data_Bus";
import Navbar from "@/components/Navbar";
import SewaBus from "@/components/SewaBus/Sewa_Bus";
import React from "react";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();
enum JenisBus {
  Akap = "Akap",
  Pariwisata = "Pariwisata",
}

const getData = async () => {
  const data = await prisma.data_bus.findMany({
    select: {
      plat_bus: true,
      jenis_bus: true,
    },
  });

  // Konversi jenis_bus menjadi enum
  return data.map((bus) => ({
    plat_bus: bus.plat_bus,
    jenis_bus: bus.jenis_bus as JenisBus,
  }));
};
const page = async () => {
  const bus = await getData();
  return (
    <div>
      <Navbar />
      <Data_Bus />
      <div className="flex justify-center mt-14 gap-5">
        <SewaBus />
        <Link href={"/penyewaanbus/hapusdatasewabus"} className="btn">
          Hapus Data Sewa Bus
        </Link>
      </div>
    </div>
  );
};

export default page;
