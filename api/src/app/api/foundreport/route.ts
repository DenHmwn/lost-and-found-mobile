import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// helper untuk validasi angka (kalau id kamu Int)
function toInt(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

// GET /api/foundreport
export async function GET() {
  try {
    const reports = await prisma.foundReport.findMany({
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
            notelp: true,
            role: true,
          },
        },
        lostReport: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                notelp: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Berhasil mengambil data barang temuan",
        data: reports,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching found reports:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data barang temuan",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// POST /api/foundreport
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const namaBarang = String(body?.namaBarang ?? "").trim();
    const deskripsi = String(body?.deskripsi ?? "").trim();
    const lokasiTemu = String(body?.lokasiTemu ?? "").trim();
    const waktuTemu = String(body?.waktuTemu ?? "").trim();

    const adminId = toInt(body?.adminId);
    const lostReportIdRaw = body?.lostReportId;
    const lostReportId = lostReportIdRaw !== null && lostReportIdRaw !== undefined && lostReportIdRaw !== ""
      ? toInt(lostReportIdRaw)
      : null;

    const tanggalTemu = body?.tanggalTemu;

    if (!namaBarang || !deskripsi || !lokasiTemu || !waktuTemu || adminId === null || !tanggalTemu) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Data tidak lengkap. Pastikan nama barang, deskripsi, lokasi temuan, tanggal temu, waktu temu, dan adminId terisi dengan benar.",
        },
        { status: 400 }
      );
    }

    const formatTanggalTemu = new Date(tanggalTemu);
    if (isNaN(formatTanggalTemu.getTime())) {
      return NextResponse.json(
        { success: false, message: "Format tanggal tidak valid." },
        { status: 400 }
      );
    }

    // validasi admin
    const adminExists = await prisma.user.findUnique({
      where: { id: adminId },
      select: { id: true, role: true, name: true, email: true, notelp: true },
    });

    if (!adminExists) {
      return NextResponse.json(
        { success: false, message: "Admin tidak ditemukan" },
        { status: 404 }
      );
    }

    if (adminExists.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "Pengguna ini bukan admin. Hanya admin yang dapat membuat laporan barang temuan.",
        },
        { status: 403 }
      );
    }

    // validasi lostReportId jika ada
    if (lostReportId !== null) {
      const lostReportExists = await prisma.lostReport.findUnique({
        where: { id: lostReportId },
        select: { id: true },
      });

      if (!lostReportExists) {
        return NextResponse.json(
          { success: false, message: "Laporan barang hilang tidak ditemukan" },
          { status: 404 }
        );
      }

      // PENTING: gunakan findFirst agar aman walaupun lostReportId tidak unique
      const alreadyMatched = await prisma.foundReport.findFirst({
        where: { lostReportId },
        select: { id: true },
      });

      if (alreadyMatched) {
        return NextResponse.json(
          {
            success: false,
            message: "Laporan barang hilang ini sudah memiliki pasangan barang temuan",
          },
          { status: 409 }
        );
      }
    }

    const report = await prisma.foundReport.create({
      data: {
        namaBarang,
        deskripsi,
        lokasiTemu,
        adminId,
        lostReportId,
        tanggalTemu: formatTanggalTemu,
        waktuTemu,
      },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
            notelp: true,
          },
        },
        lostReport: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                notelp: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Laporan barang temuan berhasil dibuat",
        data: report,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating found report:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal membuat laporan barang temuan",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
