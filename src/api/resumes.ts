
import type { Resume } from "../types/resume";
import { validateResumeFile } from "../constants/resumeRules";

// Temporary in-memory storage.
// Each entry contains resume information and the actual file.
interface StoredResume {
  details: Resume;
  file: File;
}

const mockResumes = new Map<number, StoredResume>();

let nextResumeId = 1;

// Get all uploaded resumes.
export async function getResumes(): Promise<Resume[]> {
  return Array.from(mockResumes.values()).map((resume) => ({
    ...resume.details,
  }));
}

// Upload a new resume.
export async function uploadResume(file: File): Promise<Resume> {
  const error = validateResumeFile(file);

  if (error) {
    throw new Error(error);
  }

  const newResume: Resume = {
    id: nextResumeId++,
    filename: file.name,
    content_type: file.type,
    size_bytes: file.size,
    uploaded_at: new Date().toISOString(),
  };

  mockResumes.set(newResume.id, {
    details: newResume,
    file,
  });

  return { ...newResume };
}

// Replace an existing resume with a new file.
export async function replaceResume(
  id: number,
  file: File
): Promise<Resume> {
  const existingResume = mockResumes.get(id);

  if (!existingResume) {
    throw new Error("Resume not found.");
  }

  const error = validateResumeFile(file);

  if (error) {
    throw new Error(error);
  }

  const updatedResume: Resume = {
    id,
    filename: file.name,
    content_type: file.type,
    size_bytes: file.size,
    uploaded_at: new Date().toISOString(),
  };

  mockResumes.set(id, {
    details: updatedResume,
    file,
  });

  return { ...updatedResume };
}

// Delete a resume.
export async function deleteResume(id: number): Promise<void> {
  if (!mockResumes.has(id)) {
    throw new Error("Resume not found.");
  }

  mockResumes.delete(id);
}

// Get the actual resume file for downloading.
export async function downloadResume(id: number): Promise<Blob> {
  const storedResume = mockResumes.get(id);

  if (!storedResume) {
    throw new Error("Resume not found.");
  }

  return storedResume.file;
}
