// src/types/auth.ts

export type UserRole = "JOB_SEEKER" | "RECRUITER";

export interface RegisterRequest {
 fullName: string;
 email: string;
 password: string;
 role: UserRole;
}

export interface RegisterResponse {
 message: string;
 user?: {
 id: string;
 full_name?: string;
 email: string;
 role: UserRole;
 };
}

export interface LoginRequest {
 email: string;
 password: string;
}

export interface LoginResponse {
 access_token: string;
 token_type: "bearer";
 user?: {
 id: string;
 email: string;
 role: UserRole;
 };
}

export interface ApiErrorDetail {
 detail?: string;
 message?: string;
 error?: string;
}
