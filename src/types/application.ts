
// The five official application statuses from the Sprint 2 guide.
export type ApplicationStatus =
  | "Applied"
  | "Under Review"
  | "Interview"
  | "Offered"
  | "Rejected";

// Represents one job application belonging to the logged-in user.
export interface MyApplication {
  id: number;
  job_title: string;
  company: string;
  status: ApplicationStatus;
  applied_at: string;
  updated_at: string;
}
