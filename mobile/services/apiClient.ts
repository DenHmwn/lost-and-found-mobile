const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";
const PREFIX = process.env.EXPO_PUBLIC_API_PREFIX ?? "";

type ApiErrorResponse = { message?: string; error?: string };

function joinUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  const prefix = PREFIX ? (PREFIX.startsWith("/") ? PREFIX : `/${PREFIX}`) : "";
  return `${BASE_URL}${prefix}${p}`;
}
