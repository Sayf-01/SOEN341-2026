export type UserRole = "job_seeker" | "recruiter";

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  is_active?: boolean;
  created_at?: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: "bearer";
  user: User;
}

export interface ApiErrorResponse {
  detail: string;
}