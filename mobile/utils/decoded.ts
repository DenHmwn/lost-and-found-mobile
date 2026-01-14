import { decode as base64Decode } from "base-64";

export const decodeJwtPayload = (token: string) => {
  if (!token) throw new Error("Token kosong");
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = base64Decode(base64); 
  return JSON.parse(jsonPayload);
};