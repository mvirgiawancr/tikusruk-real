import Navbar from "@/components/LoginPage/Navbar";
import React from "react";
import { PrismaClient } from "@prisma/client";
import Data_Petugas from "@/components/Petugas/Data_Petugas";
import TambahPetugas from "@/components/Petugas/TambahPetugas";
const prisma = new PrismaClient();
const getData = async () => {
  const res = prisma.petugas.findMany();
  return res;
};
const page = async () => {
  const datas = await getData();
  return (
    <div>
      <Navbar />
      <Data_Petugas />
      <div className="flex justify-center mt-14 gap-5">
        <TambahPetugas></TambahPetugas>
      </div>
    </div>
  );
};

export default page;
