
export const JOB_CATEGORIES = [
  "Software Development",
  "Data and AI",
  "Design",
  "Marketing",
  "Finance",
  "Customer Support",
] as const;

// Information entered in the job posting form.
export interface CreateJobData {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
}

// Information about a created job.
export interface RecruiterJob extends CreateJobData {
  id: number;
  status: "open";
  posted_at: string;
}

// Information about a job application.
export interface RecruiterApplication {
  application_id: number;
  applicant_name: string;
  resume_id: number;
  status:
    | "Applied"
    | "Under Review"
    | "Interview"
    | "Offered"
    | "Rejected";
  applied_at: string;
}

// Temporary storage for mock jobs and applications.
const mockJobs = new Map<number, RecruiterJob>();

const mockApplications = new Map<
  number,
  RecruiterApplication[]
>();

let nextJobId = 1;

// Create a new job posting.
export async function createJob(
  data: CreateJobData
): Promise<RecruiterJob> {
  const { title, company, location, category, description } = data;

  if (
    !title.trim() ||
    !company.trim() ||
    !location.trim() ||
    !category.trim() ||
    !description.trim()
  ) {
    throw new Error("All fields are required.");
  }

  if (!JOB_CATEGORIES.some((item) => item === category)) {
    throw new Error("Please select a valid job category.");
  }

  const newJob: RecruiterJob = {
    id: nextJobId++,
    title: title.trim(),
    company: company.trim(),
    location: location.trim(),
    category,
    description: description.trim(),
    status: "open",
    posted_at: new Date().toISOString(),
  };

  mockJobs.set(newJob.id, newJob);

  // New postings start without applications.
  mockApplications.set(newJob.id, []);

  return { ...newJob };
}

// Get applications received for a particular job.
export async function getApplicationsForJob(
  jobId: number
): Promise<RecruiterApplication[]> {
  if (!mockJobs.has(jobId)) {
    throw new Error("Job posting not found.");
  }

  const applications = mockApplications.get(jobId) ?? [];

  return applications.map((application) => ({
    ...application,
  }));
}
