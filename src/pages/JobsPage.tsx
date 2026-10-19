
import { useEffect, useState } from "react";

import JobCard from "../components/JobCard";
import Button from "../components/Button";

import { JOBS_PER_PAGE, searchJobs } from "../api/jobs";

import type { Job } from "../types/job";

function JobsPage() {
  // Jobs returned by our mock API.
  const [jobs, setJobs] = useState<Job[]>([]);

  // Current page number.
  const [page, setPage] = useState(1);

  // Total number of jobs across all pages.
  const [total, setTotal] = useState(0);

  // Loading and error states.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate how many pages are available.
  const totalPages = Math.max(
    1,
    Math.ceil(total / JOBS_PER_PAGE)
  );

  // Load jobs when the page changes.
  useEffect(() => {
    let cancelled = false;

    async function loadJobs() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await searchJobs({ page });

        if (cancelled) return;

        setJobs(result.items);
        setTotal(result.total);
      } catch (err) {
        if (cancelled) return;

        setJobs([]);
        setTotal(0);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load jobs. Please try again."
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadJobs();

    // Prevent an older request from updating the page.
    return () => {
      cancelled = true;
    };
  }, [page]);

  function handlePreviousPage() {
    setPage((currentPage) =>
      Math.max(1, currentPage - 1)
    );
  }

  function handleNextPage() {
    setPage((currentPage) =>
      Math.min(totalPages, currentPage + 1)
    );
  }

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "32px 24px",
      }}
    >
      <header style={{ marginBottom: "24px" }}>
        <h1>Find Jobs</h1>

        <p style={{ color: "#57606a" }}>
          Explore job opportunities and find the
          right position for your career.
        </p>
      </header>

      {/* Loading state */}
      {isLoading && (
        <p role="status">
          Loading jobs...
        </p>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div
          role="alert"
          style={{
            color: "#b42318",
            padding: "16px",
            backgroundColor: "#fef3f2",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && jobs.length === 0 && (
        <div
          style={{
            padding: "40px 20px",
            textAlign: "center",
            border: "1px solid #d0d7de",
            borderRadius: "8px",
          }}
        >
          <h2>No jobs available</h2>

          <p>
            There are currently no job postings.
            Please check again later.
          </p>
        </div>
      )}

      {/* Job listings */}
      {!isLoading && !error && jobs.length > 0 && (
        <>
          <p style={{ marginBottom: "20px" }}>
            <strong>{total}</strong> jobs found
          </p>

          <section aria-label="Job listings">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </section>

          {/* Pagination controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            <div style={{ width: "140px" }}>
              <Button
                type="button"
                onClick={handlePreviousPage}
                disabled={page === 1}
              >
                Previous
              </Button>
            </div>

            <span>
              Page {page} of {totalPages}
            </span>

            <div style={{ width: "140px" }}>
              <Button
                type="button"
                onClick={handleNextPage}
                disabled={page >= totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default JobsPage;
