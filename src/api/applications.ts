
import { getResumes } from "./resumes";

// The response returned after submitting an application.
export interface ApplicationResponse {
  id: number;
  status: "Applied";
  applied_at: string;
  message: string;
}

// Error with an HTTP-like status code for mock testing.

export class ApplicationError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApplicationError";
    this.status = status;
  }
}


// Temporary mock storage for submitted applications.
const mockApplications = new Map<
  number,
  {
    resumeId: number;
    coverNote: string;
    response: ApplicationResponse;
  }
>();

let nextApplicationId = 1;

// Submit a job application using mock data.
export async function applyToJob(
  jobId: number,
  resumeId: number,
  coverNote: string = ""
): Promise<ApplicationResponse> {

  // Check whether the user has already applied.
  if (mockApplications.has(jobId)) {
    throw new ApplicationError(
      "You have already applied to this job",
      409
    );
  }

  // Make sure a resume is selected and exists.
  const resumes = await getResumes();

  if (!resumes.some((resume) => resume.id === resumeId)) {
    throw new ApplicationError(
      "Please select a valid resume.",
      400
    );
  }

  // Check the maximum cover note length.
  if (coverNote.length > 1000) {
    throw new ApplicationError(
      "Cover note cannot exceed 1000 characters.",
      400
    );
  }

  const response: ApplicationResponse = {
    id: nextApplicationId++,
    status: "Applied",
    applied_at: new Date().toISOString(),
    message: "Application submitted",
  };

  mockApplications.set(jobId, {
    resumeId,
    coverNote,
    response,
  });

  return { ...response };
}
