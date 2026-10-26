
import { mockApplications } from "../mocks/applications";
import type { MyApplication } from "../types/application";

// Simulate a short network delay.
const MOCK_DELAY_MS = 200;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Return applications belonging to the mock user.
 *
 * DA-4 uses fictional application data.
 * During backend integration, replace this mock
 * implementation with a real API request.
 */
export async function getMyApplications(): Promise<MyApplication[]> {
  await delay(MOCK_DELAY_MS);

  // Return copies so the original mock records
  // cannot be changed accidentally.
  return mockApplications.map((application) => ({
    ...application,
  }));
}
