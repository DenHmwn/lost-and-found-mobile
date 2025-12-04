import { RefreshPayload } from "@/lib/interface";
import { SECRET } from "@/lib/secret";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Ambil refresh token dari cookie
    const refreshToken = req.cookies.get("refreshToken")?.value;

    // Validasi refresh token
    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "Refresh token tidak ditemukan" },
        { status: 401 }
      );
    }
    let decoded: RefreshPayload;
    try {
      const { payload } = await jwtVerify(refreshToken, SECRET);
      decoded = payload as unknown as RefreshPayload;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Refresh token tidak valid atau kedaluwarsa",
        },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui token" },
      { status: 500 }
    );
  }
}
