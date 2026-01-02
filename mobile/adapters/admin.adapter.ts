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

