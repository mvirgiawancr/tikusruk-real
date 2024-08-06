import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const {
      kapasitas_bagasi,
      jumlah_kursi,
      kelas,
      harga_sewa_bus,
      harga_sewa_bagasi,
      harga_tiket,
      jenis,
      kota_asal,
      kota_tujuan,
      plat,
    } = await request.json();

    // Logging input data
    console.log({
      kapasitas_bagasi,
      jumlah_kursi,
      kelas,
      harga_sewa_bus,
      harga_sewa_bagasi,
      harga_tiket,
      jenis,
      kota_asal,
      kota_tujuan,
      plat,
    });

    // Validasi input
    if (
      kelas === undefined ||
      jenis === undefined ||
      kota_tujuan === undefined ||
      plat === undefined
    ) {
      console.log('Field Kelas, Jenis Bus, Kota Tujuan, dan Plat Harus Diisi');
      return NextResponse.json(
        { error: 'Semua field harus diisi!' },
        { status: 400 }
      );
    }

    // Cek tipe data
    if (
      isNaN(Number(kapasitas_bagasi)) ||
      isNaN(Number(jumlah_kursi)) ||
      isNaN(Number(harga_sewa_bus)) ||
      isNaN(Number(harga_sewa_bagasi)) ||
      isNaN(Number(harga_tiket))
    ) {
      console.log('Validasi gagal: Kapasitas bagasi, jumlah kursi, harga sewa bus, harga sewa bagasi, dan harga tiket harus berupa angka');
      return NextResponse.json(
        { error: 'Semua Field Harus Diisi' },
        { status: 400 }
      );
    }

    // Buat data bus baru
    const bus = await prisma.data_bus.create({
      data: {
        kapasitas_bagasi: Number(kapasitas_bagasi),
        jumlah_kursi: Number(jumlah_kursi),
        kelas,
        harga_sewa_bus: Number(harga_sewa_bus),
        harga_sewa_bagasi: Number(harga_sewa_bagasi),
        harga_tiket: Number(harga_tiket),
        jenis_bus: jenis,
        kota_asal: kota_asal,
        kota_tujuan: kota_tujuan,
        plat_bus: plat,
      },
    });

    return NextResponse.json(bus, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Semua Field Harus Diisi!' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
export async function GET() {
  try {
    // Fetch semua data_bus
    const data_bus = await prisma.data_bus.findMany();
    return NextResponse.json(data_bus);
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
