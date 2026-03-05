import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL,
  timeout: 15000,
});

// Helper to set JWT token
export function setAuthToken(token?: string) {
  if (!token) {
    delete api.defaults.headers.common["Authorization"];
    return;
  }
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
