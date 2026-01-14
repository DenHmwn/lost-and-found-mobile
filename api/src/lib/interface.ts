export interface TokenPayload {
  id: string;
  name: string;
  role: string;
  notelp: string;
  email: string;
}

export interface RefreshPayload {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}