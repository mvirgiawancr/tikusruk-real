import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: Request, { params }: { params: { id_tiket: string } }) {
  const idTiket = parseInt(params.id_tiket);
  
  if (isNaN(idTiket)) {
    return NextResponse.json({ error: 'ID tiket tidak valid' }, { status: 400 });
  }

  try {
    // Temukan tiket berdasarkan ID
    const tiket = await prisma.tiket.findUnique({
      where: { id_tiket: idTiket },
    });

    if (!tiket) {
      return NextResponse.json({ error: 'Tiket tidak ditemukan' }, { status: 404 });
    }

    // Periksa jika id_bus ada
    if (tiket.id_bus === null) {
      return NextResponse.json({ error: 'ID bus tidak ditemukan' }, { status: 400 });
    }

    // Temukan bus terkait berdasarkan ID bus
    const bus = await prisma.data_bus.findUnique({
      where: { id_bus: tiket.id_bus },
    });

    if (!bus) {
      return NextResponse.json({ error: 'Bus tidak ditemukan' }, { status: 404 });
    }

    // Hapus tiket
    await prisma.tiket.delete({
      where: { id_tiket: idTiket },
    });

    // Tambahkan kembali satu kursi ke bus
    await prisma.data_bus.update({
      where: { id_bus: tiket.id_bus },
      data: {
        jumlah_kursi: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ message: 'Tiket berhasil dihapus dan kursi bus diperbarui' }, { status: 200 });
  } catch (error) {
    console.error('Error saat menghapus tiket:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
