import { UiReport, UiStats, UiUser } from "../types/admin.ui";

function pickString(obj: any, keys: string[], fallback = ""): string {
    for (const k of keys) {
        const v = obj?.[k];
        if (typeof v === "string" && v.trim() !== "") return v;
        if (typeof v === "number") return String(v);
}
  return fallback;
}

function pickNumber(obj: any, keys: string[], fallback = 0): number {
    for (const k of keys) {
        const v = obj?.[k];
        if (typeof v === "number") return v;
        if (typeof v === "string" && !isNaN(Number(v))) return Number(v);
}
  return fallback;
}

function normalizeApproval(v: any): UiReport["approvalStatus"] {
    const s = String(v ?? "").toLowerCase();
    if (["approved", "disetujui", "yes", "true"].includes(s)) return "approved";
    if (["rejected", "ditolak", "no", "false"].includes(s)) return "rejected";
  return "pending";
}

function normalizeProcess(v: any): UiReport["processStatus"] {
    const s = String(v ?? "").toLowerCase();
    if (["in_progress", "processing", "proses", "dalam_proses"].includes(s)) return "in_progress";
    if (["closed", "done", "selesai", "ditutup"].includes(s)) return "closed";
  return "open";
}

export function toUiStats(raw: any): UiStats {
  
  return {
    totalLost: pickNumber(raw, ["totalLost", "total_lost", "barang_hilang"]),
    totalFound: pickNumber(raw, ["totalFound", "total_found", "barang_ditemukan"]),
    pendingApproval: pickNumber(raw, ["pendingApproval", "pending", "menunggu_approval"]),
    approved: pickNumber(raw, ["approved", "disetujui"]),
    inProcess: pickNumber(raw, ["inProcess", "dalam_proses", "processing"]),
    totalUsers: pickNumber(raw, ["totalUsers", "users", "total_user"]),
  };
}

export function toUiReport(raw: any, type: "lost" | "found"): UiReport {
  return {
    id: pickString(raw, ["id", "_id", "report_id"]),
    type,
    title: pickString(raw, ["title", "judul", "nama_barang", "item_name"], "-"),
    location: pickString(raw, ["location", "lokasi", "place"], "-"),
    reporterName: pickString(raw, ["reporterName", "pelapor", "nama_pelapor", "user_name"], "-"),
    createdAtISO: pickString(raw, ["createdAt", "created_at", "tanggal", "date"], new Date().toISOString()),
    description: pickString(raw, ["description", "deskripsi", "keterangan"], ""),
    approvalStatus: normalizeApproval(raw?.approvalStatus ?? raw?.status_approval ?? raw?.approval),
    processStatus: normalizeProcess(raw?.processStatus ?? raw?.status_laporan ?? raw?.status),
  };
}

export function toUiUser(raw: any): UiUser {
  return {
    id: pickString(raw, ["id", "_id", "user_id"]),
    name: pickString(raw, ["name", "nama", "username"], "-"),
    email: pickString(raw, ["email", "mail"], "-"),
    status: String(raw?.status ?? raw?.user_status ?? "active").toLowerCase() === "banned" ? "banned" : "active",
    role: pickString(raw, ["role", "user_role"], "user"),
  };
}



