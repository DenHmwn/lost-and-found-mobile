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

