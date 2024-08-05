import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const platBus = body.plat_bus;
        const noKursi = body.kursi;
        const nama = body.nama;
        const noTelepon = body.no_telepon;
        const alamat = body.alamat;
        const id_petugas = body.id_petugas;

        // Validasi input
        if (!platBus || !noKursi || !nama || !noTelepon || !alamat) {
            return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });
        }

        // Temukan bus berdasarkan plat_bus
        const bus = await prisma.data_bus.findMany({
            where: {
                plat_bus: platBus,
            },
        });

        if (bus.length === 0) {
            return NextResponse.json({ error: "Bus tidak ditemukan" }, { status: 404 });
        }

        // Ambil id_bus dari bus yang ditemukan
        const busId = bus[0].id_bus;

        // Periksa apakah nomor kursi sudah diambil
        const tiketExist = await prisma.tiket.findFirst({
            where: {
                no_kursi: noKursi,
                id_bus: busId, // Gunakan id_bus dari bus yang ditemukan
            },
        });

        if (tiketExist) {
            return NextResponse.json({ error: "Nomor kursi sudah diambil" }, { status: 400 });
        }

        // Kurangi jumlah kursi yang tersedia
        await prisma.data_bus.update({
            where: {
                id_bus: busId,
            },
            data: {
                jumlah_kursi: {
                    decrement: 1,
                },
            },
        });

        // Buat entri pelanggan dan tiket
        const pelanggan = await prisma.pelanggan.create({
            data: {
                nama: nama,
                no_telepon: noTelepon,
                alamat: alamat,
                tiket: {
                    create: {
                        no_kursi: noKursi,
                        kelas: bus[0].kelas, // Gunakan kelas dari bus yang ditemukan
                        id_petugas: Number(id_petugas),
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
      // Fetch semua tiket
      const tiket = await prisma.tiket.findMany();
      return NextResponse.json(tiket);
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