
import { mockJobs } from "../mocks/jobs";

import type {
  Job,
  JobDetail,
  JobListResponse,
  JobSearchParams,
} from "../types/job";

// Number of jobs displayed on each page.
export const JOBS_PER_PAGE = 10;

// Simulate a short API response delay.
const mockDelay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Get a paginated list of jobs.
 *
 * DA-1: Mock listing and pagination.
 * DA-2: Add keyword, location and category filtering.
 * DA-5: Replace mock implementation with the real backend.
 */
export async function searchJobs(
  params: JobSearchParams = {}
): Promise<JobListResponse> {
  await mockDelay(200);

  const requestedPage = params.page ?? 1;

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  // DA-2 will apply the search filters here.
  const filteredJobs = [...mockJobs];

  // Number of jobs before pagination.
  const total = filteredJobs.length;

  // Calculate the jobs for the requested page.
  const startIndex = (page - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;

  const pageJobs = filteredJobs.slice(startIndex, endIndex);

  // Return only the fields required by the listing.
  const items: Job[] = pageJobs.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    category: job.category,
    posted_at: job.posted_at,
  }));

  return {
    items,
    total,
  };
}

/**
 * Get the full details of one job.
 *
 * Returns null when the job does not exist.
 */
export async function getJob(
  id: number
): Promise<JobDetail | null> {
  await mockDelay(200);

  const job = mockJobs.find((item) => item.id === id);

  if (!job) {
    return null;
  }

  return { ...job };
}
