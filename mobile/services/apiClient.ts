const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";
const PREFIX = process.env.EXPO_PUBLIC_API_PREFIX ?? "";

type ApiErrorResponse = { message?: string; error?: string };

function joinUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  const prefix = PREFIX ? (PREFIX.startsWith("/") ? PREFIX : `/${PREFIX}`) : "";
  return `${BASE_URL}${prefix}${p}`;
}

async function parseError(res: Response): Promise<string> {
  try {
    const j = (await res.json()) as ApiErrorResponse;
    return j.message || j.error || `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const url = joinUrl(path);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${await parseError(res)} (${url})`);
  return (await res.json()) as T;
}
