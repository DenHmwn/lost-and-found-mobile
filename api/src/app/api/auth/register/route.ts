import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, notelp, role, confirmPassword } = await req.json();

    // Validasi input
    if (!name || !email || !password || !notelp || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama, email, password, dan notelp harus diisi",
        },
        { status: 400 }
      );
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Validasi panjang password
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password minimal 6 karakter" },
        { status: 400 }
      );
    }

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "Password tidak cocok" },
        { status: 400 }
      );
    }
    // Validasi panjang no telepon
    if (notelp.length > 13) {
      return NextResponse.json(
        { success: false, message: "No telepon maksimal 15 karakter" },
        { status: 400 }
      );
    }

    // Cek apakah email sudah digunakan
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email sudah digunakan" },
        { status: 400 }
      );
    }

    // cek notelp
    const existingNotelp = await prisma.user.findUnique({
      where: { notelp },
    });
    if (existingNotelp) {
      return NextResponse.json(
        { success: false, message: "No telepon sudah digunakan" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        notelp: notelp.trim(),
        role: role || "USER", // role default pas regis
      },
      select: {
        id: true,
        name: true,
        email: true,
        notelp: true,
        role: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registrasi berhasil",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal registrasi" },
      { status: 500 }
    );
  }
}
