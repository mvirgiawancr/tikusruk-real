import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: { id_sewa_bus: string } }) {
  const id_sewa_bus = parseInt(params.id_sewa_bus);

  try {
    // Fetch penyewaan bus yang akan dihapus
    const sewaBus = await prisma.sewa_bus.findUnique({
      where: { id_sewa_bus },
    });

    if (!sewaBus) {
      return new Response(JSON.stringify({ message: "Penyewaan tidak ditemukan" }), { status: 404 });
    }


    // Hapus penyewaan bus
    await prisma.sewa_bus.delete({
      where: { id_sewa_bus },
    });

    return new Response(JSON.stringify({ message: "Penyewaan berhasil dihapus" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting sewa_bus:", error);
    return new Response(JSON.stringify({ message: "Terjadi kesalahan server" }), { status: 500 });
  }
}
