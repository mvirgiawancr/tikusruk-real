"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="navbar bg-primary text-base-200 h-[80px]">
      <div className="navbar-start">
        <div className="flex flex-col">
          <Link href={"#"} className="btn btn-ghost text-xl">
            Tikusruk
          </Link>
          <p className="text-sm">Tiket Bus Terhubung Koneksi</p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              href={"/dashboard"}
              className={
                pathname === "/dashboard" ? "underline underline-offset-2" : ""
              }
            >
              <button>Dashboard</button>
            </Link>
          </li>
          <li>
            <Link
              href={"/tiket"}
              className={
                pathname === "/tiket" ? "underline underline-offset-2" : ""
              }
            >
              <button>Tiket</button>
            </Link>
          </li>
          <li>
            <Link
              href={"/penyewaanbus"}
              className={
                pathname === "/penyewaanbus"
                  ? "underline underline-offset-2"
                  : ""
              }
            >
              Penyewaan Bus
            </Link>
          </li>
          <li>
            <Link
              href={"/penyewaanbagasi"}
              className={
                pathname === "/penyewaanbagasi"
                  ? "underline underline-offset-2"
                  : ""
              }
            >
              Penyewaan Bagasi
            </Link>
          </li>
          <li>
            <Link
              href={"/keloladatabus"}
              className={
                pathname === "/keloladatabus"
                  ? "underline underline-offset-2"
                  : ""
              }
            >
              Kelola Data Bus
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link href={"/"} className="btn">
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
