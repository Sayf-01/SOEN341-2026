
import { mockJobs } from "../mocks/jobs";
import { ALL_FILTER_VALUE } from "../constants/jobFilters";

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
 * Get jobs with optional search filters and pagination.
 *
 * DA-1: Job listing with pagination.
 * DA-2: Keyword, location and category filtering.
 * DA-5: Replace mock logic with real backend requests.
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

  // Normalize the keyword to make searching case-insensitive.
  const keyword = (params.keyword ?? "")
    .trim()
    .toLowerCase();

  const location = params.location ?? ALL_FILTER_VALUE;
  const category = params.category ?? ALL_FILTER_VALUE;

  // Apply all active filters together.
  const filteredJobs = mockJobs.filter((job) => {
    // Keyword can match title, company or description.
    const matchesKeyword =
      keyword === "" ||
      job.title.toLowerCase().includes(keyword) ||
      job.company.toLowerCase().includes(keyword) ||
      job.description.toLowerCase().includes(keyword);

    // Empty location means "All Locations".
    const matchesLocation =
      location === ALL_FILTER_VALUE ||
      job.location === location;

    // Empty category means "All Categories".
    const matchesCategory =
      category === ALL_FILTER_VALUE ||
      job.category === category;

    // A job must satisfy every active filter.
    return (
      matchesKeyword &&
      matchesLocation &&
      matchesCategory
    );
  });

  // Total matching jobs BEFORE pagination.
  const total = filteredJobs.length;

  // Apply pagination AFTER filtering.
  const startIndex = (page - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;

  const pageJobs = filteredJobs.slice(
    startIndex,
    endIndex
  );

  // Return only the fields needed by the job cards.
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
 * Get full details of a single job.
 * Returns null if the job doesn't exist.
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
