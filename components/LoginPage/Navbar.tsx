import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-primary text-base-200 flex justify-between h-[80px]">
      <div className=" flex flex-col">
        <Link href={"#"} className="btn btn-ghost text-xl">
          Tikusruk
        </Link>
        <p className="text-sm">Tiket Bus Terhubung Koneksi</p>
      </div>
    </div>
  );
};

export default Navbar;
