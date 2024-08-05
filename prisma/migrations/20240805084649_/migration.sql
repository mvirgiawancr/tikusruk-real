-- CreateEnum
CREATE TYPE "jenis_bus" AS ENUM ('Pariwisata', 'Akap');

-- CreateTable
CREATE TABLE "Pelanggan" (
    "id_pelanggan" SERIAL NOT NULL,
    "nama" VARCHAR(30) NOT NULL,
    "no_telepon" VARCHAR(12) NOT NULL,
    "alamat" VARCHAR(50) NOT NULL,

    CONSTRAINT "Pelanggan_pkey" PRIMARY KEY ("id_pelanggan")
);

-- CreateTable
CREATE TABLE "Petugas" (
    "id_petugas" SERIAL NOT NULL,
    "nama" VARCHAR(30) NOT NULL,
    "posisi" VARCHAR(10) NOT NULL,
    "no_telepon" VARCHAR(12) NOT NULL,

    CONSTRAINT "Petugas_pkey" PRIMARY KEY ("id_petugas")
);

-- CreateTable
CREATE TABLE "Data_bus" (
    "id_bus" SERIAL NOT NULL,
    "kapasitas_bagasi" INTEGER NOT NULL,
    "jumlah_kursi" INTEGER NOT NULL,
    "kelas" VARCHAR(10) NOT NULL,
    "harga_sewa_bus" INTEGER NOT NULL,
    "harga_sewa_bagasi" INTEGER NOT NULL,
    "harga_tiket" INTEGER NOT NULL,
    "jenis_bus" "jenis_bus" NOT NULL,
    "kota_tujuan" VARCHAR(10) NOT NULL,
    "kota_asal" VARCHAR(10) NOT NULL,
    "plat_bus" VARCHAR(9) NOT NULL,

    CONSTRAINT "Data_bus_pkey" PRIMARY KEY ("id_bus")
);

-- CreateTable
CREATE TABLE "Tiket" (
    "id_tiket" SERIAL NOT NULL,
    "no_kursi" INTEGER NOT NULL,
    "kelas" VARCHAR(10) NOT NULL,
    "id_pelanggan" INTEGER,
    "id_petugas" INTEGER,
    "id_bus" INTEGER,

    CONSTRAINT "Tiket_pkey" PRIMARY KEY ("id_tiket")
);

-- CreateTable
CREATE TABLE "Sewa_bus" (
    "id_sewa_bus" SERIAL NOT NULL,
    "tanggal_sewa" DATE NOT NULL,
    "tanggal_kembali" DATE NOT NULL,
    "plat_bus" VARCHAR(9) NOT NULL,
    "id_bus" INTEGER,
    "id_pelanggan" INTEGER,
    "id_petugas" INTEGER,

    CONSTRAINT "Sewa_bus_pkey" PRIMARY KEY ("id_sewa_bus")
);

-- CreateTable
CREATE TABLE "Sewa_Bagasi" (
    "id_sewa_bagasi" SERIAL NOT NULL,
    "berat" INTEGER NOT NULL,
    "id_bus" INTEGER,
    "id_pelanggan" INTEGER,
    "id_petugas" INTEGER,

    CONSTRAINT "Sewa_Bagasi_pkey" PRIMARY KEY ("id_sewa_bagasi")
);

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_id_pelanggan_fkey" FOREIGN KEY ("id_pelanggan") REFERENCES "Pelanggan"("id_pelanggan") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_id_petugas_fkey" FOREIGN KEY ("id_petugas") REFERENCES "Petugas"("id_petugas") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_id_bus_fkey" FOREIGN KEY ("id_bus") REFERENCES "Data_bus"("id_bus") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sewa_bus" ADD CONSTRAINT "Sewa_bus_id_bus_fkey" FOREIGN KEY ("id_bus") REFERENCES "Data_bus"("id_bus") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sewa_bus" ADD CONSTRAINT "Sewa_bus_id_pelanggan_fkey" FOREIGN KEY ("id_pelanggan") REFERENCES "Pelanggan"("id_pelanggan") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sewa_bus" ADD CONSTRAINT "Sewa_bus_id_petugas_fkey" FOREIGN KEY ("id_petugas") REFERENCES "Petugas"("id_petugas") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sewa_Bagasi" ADD CONSTRAINT "Sewa_Bagasi_id_bus_fkey" FOREIGN KEY ("id_bus") REFERENCES "Data_bus"("id_bus") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sewa_Bagasi" ADD CONSTRAINT "Sewa_Bagasi_id_pelanggan_fkey" FOREIGN KEY ("id_pelanggan") REFERENCES "Pelanggan"("id_pelanggan") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sewa_Bagasi" ADD CONSTRAINT "Sewa_Bagasi_id_petugas_fkey" FOREIGN KEY ("id_petugas") REFERENCES "Petugas"("id_petugas") ON DELETE SET NULL ON UPDATE CASCADE;
