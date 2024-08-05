import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id_bus = parseInt(params.id, 10);

  try {
    const {
      kapasitas_bagasi,
      jumlah_kursi,
      kelas,
      harga_sewa_bus,
      harga_sewa_bagasi,
      harga_tiket,
      kota_asal,
      kota_tujuan,
      plat_bus,
    } = await request.json();

    // Validasi input
    if (
      kapasitas_bagasi === undefined ||
      jumlah_kursi === undefined ||
      kelas === undefined ||
      harga_sewa_bus === undefined ||
      harga_sewa_bagasi === undefined ||
      harga_tiket === undefined ||
      kota_asal === undefined ||
      kota_tujuan === undefined ||
      plat_bus === undefined
    ) {
      return NextResponse.json(
        { error: 'Semua field harus diisi!' },
        { status: 400 }
      );
    }

    // Update data bus
    const updatedBus = await prisma.data_bus.update({
      where: { id_bus },
      data: {
        kapasitas_bagasi: Number(kapasitas_bagasi),
        jumlah_kursi: Number(jumlah_kursi),
        kelas,
        harga_sewa_bus: Number(harga_sewa_bus),
        harga_sewa_bagasi: Number(harga_sewa_bagasi),
        harga_tiket: Number(harga_tiket),
        kota_asal,
        kota_tujuan,
        plat_bus,
      },
    });

    return NextResponse.json(updatedBus, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const idBus = parseInt(params.id);
  
    try {
      // Hapus tiket terkait
      await prisma.tiket.deleteMany({
        where: { id_bus: idBus },
      });
  
      // Hapus sewa bagasi terkait
      await prisma.sewa_Bagasi.deleteMany({
        where: { id_bus: idBus },
      });
  
      // Hapus sewa bus terkait
      await prisma.sewa_bus.deleteMany({
        where: { id_bus: idBus },
      });
  
      // Hapus pelanggan terkait (misalnya melalui relasi)
      await prisma.pelanggan.deleteMany({
        where: {
          Sewa_bus: {
            some: {
              id_bus: idBus
            }
          }
        }
      });
  
      // Hapus data bus
      await prisma.data_bus.delete({
        where: { id_bus: idBus },
      });
  
      return NextResponse.json({ message: 'Bus dan data terkait berhasil dihapus' }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Terjadi kesalahan pada server' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }