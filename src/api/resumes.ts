import type { Resume } from "../types/resume";
import { validateResumeFile } from "../constants/resumeRules";
import { apiFetch } from "./client";

// Wrap a file in FormData under the "file" field the backend expects.
function toFormData(file: File): FormData {
  const error = validateResumeFile(file);
  if (error) {
    throw new Error(error);
  }
  const formData = new FormData();
  formData.append("file", file);
  return formData;
}

// Get all of the current user's resumes.
export async function getResumes(): Promise<Resume[]> {
  return apiFetch<Resume[]>("/resumes");
}

// Upload a new resume.
export async function uploadResume(file: File): Promise<Resume> {
  return apiFetch<Resume>("/resumes", {
    method: "POST",
    body: toFormData(file),
  });
}

// Replace an existing resume with a new file.
export async function replaceResume(id: number, file: File): Promise<Resume> {
  return apiFetch<Resume>(`/resumes/${id}`, {
    method: "PUT",
    body: toFormData(file),
  });
}

// Delete a resume.
export async function deleteResume(id: number): Promise<void> {
  await apiFetch<void>(`/resumes/${id}`, { method: "DELETE" });
}

// Get the actual resume file for downloading.
export async function downloadResume(id: number): Promise<Blob> {
  return apiFetch<Blob>(`/resumes/${id}/download`);
}