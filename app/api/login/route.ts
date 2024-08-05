import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { id_petugas, nama } = body;

    // Validasi input
    if (!id_petugas || !nama) {
      return NextResponse.json({ error: "ID Petugas dan password harus diisi" }, { status: 400 });
    }

    // Temukan petugas berdasarkan id_petugas
    const petugas = await prisma.petugas.findUnique({
      where: {
        id_petugas: Number(id_petugas),
      },
    });

    if (!petugas || petugas.nama !== nama) {
      return NextResponse.json({ error: "ID Petugas atau password salah" }, { status: 401 });
    }

    // Kirimkan informasi posisi bersama dengan id_petugas
    return NextResponse.json({ success: true, petugasId: petugas.id_petugas, posisi: petugas.posisi }, { status: 200 });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json({ error: "" }, { status: 500 });
  }
};
