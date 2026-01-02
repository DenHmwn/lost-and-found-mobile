import { UiReport, UiStats, UiUser } from "../types/admin.ui";

function pickString(obj: any, keys: string[], fallback = ""): string {
    for (const k of keys) {
        const v = obj?.[k];
        if (typeof v === "string" && v.trim() !== "") return v;

}

  return fallback;
}
