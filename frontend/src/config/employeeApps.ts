/**
 * Registry of internal web apps for the future Employees → Internal Apps
 * launcher. Not rendered yet.
 *
 * URLs come from env vars so dev/staging/prod can point at different
 * deployments (see .env.example).
 */
export interface EmployeeApp {
  id: string;
  name: string;
  description: string;
  url: string | undefined;
}

export const employeeApps: EmployeeApp[] = [
  {
    id: "sleepview-workqueue",
    name: "Sleepview Workqueue",
    description: "Post-interpretation workqueue for Sleepview studies.",
    url: import.meta.env.VITE_WORKQUEUE_URL,
  },
];
