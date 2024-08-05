import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const id = Number(request.url.split('/').pop()); // Mengambil id dari URL
    const { nama, no_telepon, posisi } = await request.json();

    // Validasi input
    if (!nama || !no_telepon || !posisi) {
      return NextResponse.json(
        { error: 'Semua field harus diisi!' },
        { status: 400 }
      );
    }

    // Update petugas
    const petugas = await prisma.petugas.update({
      where: { id_petugas: id },
      data: {
        nama,
        no_telepon,
        posisi,
      },
    });

    return NextResponse.json(petugas, { status: 200 });
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
export async function DELETE(request: Request) {
    try {
      const id = Number(request.url.split('/').pop()); // Mengambil id dari URL
  
      // Hapus petugas
      await prisma.petugas.delete({
        where: { id_petugas: id },
      });
  
      return NextResponse.json({ message: 'Petugas berhasil dihapus' }, { status: 200 });
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