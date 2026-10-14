
import type { Profile } from "../types/profile";

// Temporary storage until the real backend is ready.
let mockProfile: Profile | null = null;

// Get the current user's profile.
export async function getProfile(): Promise<Profile | null> {
  if (!mockProfile) {
    return null;
  }

  return {
    ...mockProfile,
    skills: [...mockProfile.skills],
  };
}

// Create or update the current user's profile.
export async function saveProfile(data: Profile): Promise<Profile> {
  mockProfile = {
    ...data,
    skills: [...data.skills],
  };

  return {
    ...mockProfile,
    skills: [...mockProfile.skills],
  };
}
