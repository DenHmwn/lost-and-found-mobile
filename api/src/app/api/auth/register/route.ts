import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, notelp } = await req.json();

    // Validasi input
    if (!name || !email || !password || !notelp) {
      return NextResponse.json(
        { success: false, message: "Nama, email, password, dan notelp harus diisi" },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal registrasi" },
      { status: 500 }
    );
  }
}