import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// buat Fungsi GET
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {const { slug } = await params;

    // Validasi ID
    const id = Number(slug);
    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "ID tidak valid",
        },
        { status: 400 }
      );
    }

    // buat laporan by id
    const report = await prisma.foundReport.findUnique({
      where: { id },
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
    });
}