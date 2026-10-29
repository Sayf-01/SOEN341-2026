import type { Profile } from "../types/profile";
import { apiFetch, ApiError } from "./client";

// Get the current user's profile, or null if they haven't created one yet.
export async function getProfile(): Promise<Profile | null> {
  try {
    return await apiFetch<Profile>("/profile/me");
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Create or update the current user's profile.
export async function saveProfile(data: Profile): Promise<Profile> {
  return apiFetch<Profile>("/profile/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}