/**
 * Site navigation — the single source of truth for the nav bar dropdowns,
 * the mobile menu, section overview pages, and the router.
 *
 * Adding a page = adding an item here (and, once it's built, registering its
 * component in src/app/pages.ts). Until then the item routes to a
 * "Coming soon" placeholder.
 */

/**
 * Who a page is for. Anything other than "public" will sit behind
 * <RequireAuth> once authentication is implemented:
 *  - patient:  patient identity (e.g. via e-signature provider / patient portal)
 *  - provider: referring-provider accounts (password + admin approval, like the workqueue)
 *  - employee: Google sign-in restricted to westlakesleep.com
 */
export type Access = "public" | "patient" | "provider" | "employee";

export interface NavItem {
  label: string;
  /** Absolute in-app path, or a full URL when `external` is true. */
  path: string;
  description?: string;
  access: Access;
  external?: boolean;
}

export interface NavSection {
  id: string;
  label: string;
  basePath: string;
  /** Short blurb shown at the top of the section overview page. */
  summary: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    id: "patients",
    label: "Patients",
    basePath: "/patients",
    summary: "Everything you need before, during, and after your visit.",
    items: [
      {
        label: "New Patient Registration",
        path: "/patients/registration",
        description: "Register and tell us about your sleep history.",
        access: "public",
      },
      {
        label: "Forms & Agreements",
        path: "/patients/forms",
        description: "Review and e-sign your intake documents.",
        access: "patient",
      },
      {
        label: "Preparing for Your Sleep Study",
        path: "/patients/sleep-study-prep",
        description: "What to bring and what to expect.",
        access: "public",
      },
      {
        label: "Billing & Insurance",
        path: "/patients/billing",
        description: "Coverage, payments, and common questions.",
        access: "public",
      },
    ],
  },
  {
    id: "providers",
    label: "Providers",
    basePath: "/providers",
    summary: "Refer patients and stay up to date on their care.",
    items: [
      {
        label: "Submit a Referral",
        path: "/providers/referral",
        description: "Complete and sign a referral online.",
        access: "provider",
      },
      {
        label: "Referral Status",
        path: "/providers/referral-status",
        description: "Track referrals you've submitted.",
        access: "provider",
      },
      {
        label: "Provider Resources",
        path: "/providers/resources",
        description: "Study types, criteria, and documentation guides.",
        access: "public",
      },
      {
        label: "Provider Sign-In",
        path: "/providers/sign-in",
        description: "Access your referring-provider account.",
        access: "public",
      },
    ],
  },
  {
    id: "employees",
    label: "Employees",
    basePath: "/employees",
    summary: "Internal tools and resources for the Westlake team.",
    items: [
      {
        label: "Internal Apps",
        path: "/employees/apps",
        description: "Workqueue and other company tools.",
        access: "employee",
      },
      {
        label: "Policies & Training",
        path: "/employees/policies",
        description: "HIPAA, procedures, and onboarding.",
        access: "employee",
      },
      {
        label: "Staff Directory",
        path: "/employees/directory",
        description: "Find a colleague's contact info.",
        access: "employee",
      },
    ],
  },
  {
    id: "info",
    label: "Information",
    basePath: "/info",
    summary: "Learn about Westlake Sleep Center.",
    items: [
      {
        label: "About Us",
        path: "/info/about",
        description: "Our team and our approach to sleep medicine.",
        access: "public",
      },
      {
        label: "Services",
        path: "/info/services",
        description: "In-lab and home sleep testing, and more.",
        access: "public",
      },
      {
        label: "Locations & Hours",
        path: "/info/locations",
        description: "Where to find us and when we're open.",
        access: "public",
      },
      {
        label: "Contact",
        path: "/info/contact",
        description: "Phone, fax, and general inquiries.",
        access: "public",
      },
    ],
  },
];
