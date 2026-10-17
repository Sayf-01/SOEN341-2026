
import type { JobDetail } from "../types/job";

// Temporary job data for DA-1, DA-2 and DA-3.
// These jobs are fictional and do not come from the database.
// The values match the categories and locations in Kaila's seed script.

export const mockJobs: JobDetail[] = [
  {
    id: 1,
    title: "Junior Python Developer",
    company: "Maple Byte Labs",
    location: "Montreal",
    category: "Software Development",
    posted_at: "2026-10-15T09:00:00Z",
    description:
      "Join our backend development team to build Python and FastAPI applications. You will create API endpoints, fix bugs, and write automated tests. Knowledge of SQL and Git is an asset.",
    status: "open",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Northwind Digital",
    location: "Toronto",
    category: "Software Development",
    posted_at: "2026-10-14T10:00:00Z",
    description:
      "Develop web applications using React, TypeScript, and Node.js. Work with designers and backend developers to deliver reliable features and maintain clean code.",
    status: "open",
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "CloudPine Software",
    location: "Remote",
    category: "Software Development",
    posted_at: "2026-10-13T11:00:00Z",
    description:
      "Build REST APIs and manage PostgreSQL databases for a cloud software platform. Experience with database migrations, testing, and API development is preferred.",
    status: "open",
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Capital Insights Group",
    location: "Ottawa",
    category: "Data and AI",
    posted_at: "2026-10-12T09:00:00Z",
    description:
      "Analyze business datasets and create meaningful reports and dashboards. Experience with SQL, Python, Excel, and data visualization tools is beneficial.",
    status: "open",
  },
  {
    id: 5,
    title: "Machine Learning Developer",
    company: "Coastal AI",
    location: "Vancouver",
    category: "Data and AI",
    posted_at: "2026-10-11T14:00:00Z",
    description:
      "Train, evaluate, and deploy machine learning models. Work with Python, data preprocessing, and machine learning frameworks such as PyTorch or scikit-learn.",
    status: "open",
  },
  {
    id: 6,
    title: "Data Engineering Intern",
    company: "Laurentian Analytics",
    location: "Quebec City",
    category: "Data and AI",
    posted_at: "2026-10-10T10:00:00Z",
    description:
      "Support data pipeline development, write Python scripts, and help maintain data quality. This internship is suitable for students in computer science or engineering.",
    status: "open",
  },
  {
    id: 7,
    title: "UX Designer",
    company: "Studio Boreal",
    location: "Montreal",
    category: "Design",
    posted_at: "2026-10-09T09:00:00Z",
    description:
      "Research user needs, create wireframes and prototypes, and conduct usability testing. Experience with Figma and user-centered design is preferred.",
    status: "open",
  },
  {
    id: 8,
    title: "UI Designer",
    company: "Pixelfield",
    location: "Remote",
    category: "Design",
    posted_at: "2026-10-08T13:00:00Z",
    description:
      "Design accessible and visually consistent interfaces for websites and mobile applications. Maintain design systems and collaborate with frontend developers.",
    status: "open",
  },
  {
    id: 9,
    title: "Product Designer",
    company: "Northwind Digital",
    location: "Toronto",
    category: "Design",
    posted_at: "2026-10-07T11:00:00Z",
    description:
      "Design new digital product features from initial ideas to final implementation. Collaborate with developers, product managers, and users.",
    status: "open",
  },
  {
    id: 10,
    title: "Marketing Coordinator",
    company: "Evergreen Outdoor Co",
    location: "Vancouver",
    category: "Marketing",
    posted_at: "2026-10-06T10:00:00Z",
    description:
      "Coordinate email campaigns, social media promotions, and marketing activities. Track results and help improve customer engagement.",
    status: "open",
  },
  {
    id: 11,
    title: "Social Media Specialist",
    company: "Fleur de Lys Media",
    location: "Quebec City",
    category: "Marketing",
    posted_at: "2026-10-05T09:00:00Z",
    description:
      "Manage social media content for local businesses. Create engaging posts, monitor engagement, and prepare monthly performance reports.",
    status: "open",
  },
  {
    id: 12,
    title: "Junior Financial Analyst",
    company: "Lakeshore Financial",
    location: "Toronto",
    category: "Finance",
    posted_at: "2026-10-04T12:00:00Z",
    description:
      "Support budgeting, forecasting, and financial reporting. Prepare spreadsheet models and analyze financial data to support business decisions.",
    status: "open",
  },
  {
    id: 13,
    title: "Accounting Assistant",
    company: "Mont Royal Accounting",
    location: "Montreal",
    category: "Finance",
    posted_at: "2026-10-03T10:00:00Z",
    description:
      "Assist with invoices, bookkeeping, bank reconciliation, and financial records. This position is already filled and is included to test closed job postings.",
    status: "closed",
  },
  {
    id: 14,
    title: "Customer Support Representative",
    company: "CloudPine Software",
    location: "Remote",
    category: "Customer Support",
    posted_at: "2026-10-02T09:00:00Z",
    description:
      "Provide customer assistance by email and live chat. Help users troubleshoot software problems and communicate complex issues to technical teams.",
    status: "open",
  },
  {
    id: 15,
    title: "Technical Support Developer",
    company: "Rideau Systems",
    location: "Ottawa",
    category: "Customer Support",
    posted_at: "2026-10-01T11:00:00Z",
    description:
      "Investigate customer-reported bugs, analyze application logs, and implement small software fixes. Knowledge of Python or JavaScript is required.",
    status: "open",
  },
];
