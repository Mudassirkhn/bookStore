import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:4001";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const assetUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export default api;
