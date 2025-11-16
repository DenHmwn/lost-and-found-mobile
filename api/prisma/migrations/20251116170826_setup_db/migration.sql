-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "LostStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "StatusReport" AS ENUM ('Done', 'OnProgress', 'Closed');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(25) NOT NULL,
    "notelp" VARCHAR(15) NOT NULL DEFAULT '081234567890',
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LostReport" (
    "id" SERIAL NOT NULL,
    "namaBarang" VARCHAR(25) NOT NULL,
    "deskripsi" VARCHAR(255) NOT NULL,
    "lokasiHilang" VARCHAR(50) NOT NULL,
    "status" "LostStatus" NOT NULL DEFAULT 'PENDING',
    "statusReport" "StatusReport" NOT NULL DEFAULT 'OnProgress',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LostReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoundReport" (
    "id" SERIAL NOT NULL,
    "namaBarang" VARCHAR(25) NOT NULL,
    "deskripsi" VARCHAR(255) NOT NULL,
    "lokasiTemu" VARCHAR(50) NOT NULL,
    "statusReport" "StatusReport" NOT NULL DEFAULT 'OnProgress',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" INTEGER NOT NULL,
    "lostReportId" INTEGER,

    CONSTRAINT "FoundReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FoundReport_lostReportId_key" ON "FoundReport"("lostReportId");

-- AddForeignKey
ALTER TABLE "LostReport" ADD CONSTRAINT "LostReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoundReport" ADD CONSTRAINT "FoundReport_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoundReport" ADD CONSTRAINT "FoundReport_lostReportId_fkey" FOREIGN KEY ("lostReportId") REFERENCES "LostReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
