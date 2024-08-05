import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: Request, { params }: { params: { id_sewa_bagasi: string } }) {
  const idSewaBagasi = parseInt(params.id_sewa_bagasi, 10);
  
  if (isNaN(idSewaBagasi)) {
    return NextResponse.json({ error: 'ID sewa bagasi tidak valid' }, { status: 400 });
  }

  try {
    // Temukan data sewa bagasi berdasarkan ID
    const sewaBagasi = await prisma.sewa_Bagasi.findUnique({
      where: { id_sewa_bagasi: idSewaBagasi },
    });

    if (!sewaBagasi) {
      return NextResponse.json({ error: 'Sewa bagasi tidak ditemukan' }, { status: 404 });
    }

    // Temukan bus terkait berdasarkan ID bus
    const bus = await prisma.data_bus.findUnique({
      where: { id_bus: Number(sewaBagasi.id_bus) },
    });

    if (!bus) {
      return NextResponse.json({ error: 'Bus tidak ditemukan' }, { status: 404 });
    }

    // Hapus data sewa bagasi
    await prisma.sewa_Bagasi.delete({
      where: { id_sewa_bagasi: idSewaBagasi },
    });

    // Tambahkan berat bagasi ke data bus
    await prisma.data_bus.update({
      where: { id_bus: Number(sewaBagasi.id_bus) },
      data: {
        kapasitas_bagasi: {
          increment: sewaBagasi.berat,
        },
      },
    });

    return NextResponse.json({ message: 'Sewa bagasi berhasil dihapus dan berat bus diperbarui' }, { status: 200 });
  } catch (error) {
    console.error('Error saat menghapus sewa bagasi:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
