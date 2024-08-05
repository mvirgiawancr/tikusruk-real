import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const idPetugas = body.id_petugas;
        const nama = body.nama;
        const noTelepon = body.no_telepon;
        const alamat = body.alamat;
        const berat = Math.floor(Number(body.berat));
        const platBus = body.plat_bus; // Pastikan berat adalah integer

        // Validasi input
        if (!idPetugas || !nama || !noTelepon || !alamat  || isNaN(berat)) {
            return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });
        }

        // Temukan bus berdasarkan id_bus
        const bus = await prisma.data_bus.findMany({
            where: {
                plat_bus: platBus,
            },
        });
        const busId = bus[0].id_bus;
        if (!bus) {
            return NextResponse.json({ error: "Bus tidak ditemukan" }, { status: 404 });
        }

        // Kurangi jumlah kursi yang tersedia dan berat bus
        const newBus = await prisma.data_bus.update({
            where: {
                id_bus: busId,
            },
            data: {
                kapasitas_bagasi: {
                    decrement: berat,
                }
            },
        });

        // Buat entri pelanggan dan tiket
        const pelanggan = await prisma.pelanggan.create({
            data: {
                nama: nama,
                no_telepon: noTelepon,
                alamat: alamat,
                Sewa_Bagasi: {
                    create: {
                        berat: berat,
                        id_petugas: Number(idPetugas),
                        id_bus: busId,
                    },
                },
            },
        });

        return NextResponse.json(pelanggan, { status: 201 });
    } catch (error) {
        console.error("Terjadi kesalahan:", error); // Tambahkan log untuk debugging
        return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
    }
};
export async function GET() {
    try {
      // Fetch semua sewa_Bagasi
      const sewa_Bagasi = await prisma.sewa_Bagasi.findMany();
      return NextResponse.json(sewa_Bagasi);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'Gagal mengambil data dari server.' },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }