import axios, { AxiosError } from "axios";
import type {
  RegisterRequest,
  RegisterResponse,
  ApiErrorDetail,
} from "../types/auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  /**
   * Register a new user.
   * POST /api/auth/register
   */
  register: async (payload: RegisterRequest): Promise<RegisterResponse> => {
    // Map camelCase to backend snake_case expectations:
    const backendPayload = {
      full_name: payload.fullName,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    };

    const response = await api.post<RegisterResponse>(
      "/api/auth/register",
      backendPayload
    );

    return response.data;
  },
};

/**
 * Helper to extract a user-friendly error message from Axios errors.
 */
export function getAuthErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorDetail>;
    const data = axiosError.response?.data;

    if (data?.detail) return data.detail;
    if (data?.message) return data.message;
    if (data?.error) return data.error;

    if (axiosError.response?.status === 409) {
      return "An account with this email already exists.";
    }

    if (axiosError.response?.status === 400) {
      return "Invalid registration data. Please check your inputs.";
    }

    if (axiosError.response?.status === 500) {
      return "Server error. Please try again later.";
    }
  }

  return "Something went wrong. Please try again.";
}

export default api;