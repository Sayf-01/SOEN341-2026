import axios from "axios";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  User,
} from "../types/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  register: async (payload: RegisterPayload): Promise<User> => {
    const response = await api.post("/auth/register", payload);
    return response.data;
  },

  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", payload);
    return response.data;
  },

  getCurrentUser: async (token: string): Promise<User> => {
    const response = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  logout: async (token?: string) => {
    const response = await api.post(
      "/auth/logout",
      {},
      {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : undefined,
      },
    );
    return response.data;
  },
};