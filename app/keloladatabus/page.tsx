import Data_Bus from "@/components/KelolaBus/Data_Bus";
import Navbar from "@/components/Navbar";
import TambahBus from "@/components/KelolaBus/TambahBus";
import React from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getData = async () => {
  const res = prisma.data_bus.findMany();
  return res;
};
const page = async () => {
  const datas = await getData();
  return (
    <div>
      <Navbar />
      <Data_Bus />
      <div className="flex justify-center mt-14 gap-5">
        <TambahBus bus={datas}></TambahBus>
      </div>
    </div>
  );
};

export default page;
