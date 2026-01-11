/*
  Warnings:

  - You are about to alter the column `notelp` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(15)` to `VarChar(13)`.

*/
-- AlterTable
ALTER TABLE "FoundReport" ADD COLUMN     "tanggalTemu" TIMESTAMP(3),
ADD COLUMN     "waktuTemu" TEXT;

-- AlterTable
ALTER TABLE "LostReport" ADD COLUMN     "tanggalHilang" TIMESTAMP(3),
ADD COLUMN     "waktuHilang" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "notelp" SET DATA TYPE VARCHAR(13);
