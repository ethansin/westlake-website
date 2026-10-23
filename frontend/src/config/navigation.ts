/**
 * Site navigation — the single source of truth for the nav bar dropdowns,
 * the mobile menu, section overview pages, and the router.
 *
 * Adding a page = adding an item here (and, once it's built, registering its
 * component in src/app/pages.ts). Until then the item routes to a
 * "Coming soon" placeholder.
 *
 * Archiving: set `archived: true` on an item, or on a whole section, to pull
 * it from the menus, overview pages, and routes while keeping its definition
 * for later. Delete the flag to restore it.
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
  /** Hidden everywhere (menus, overview pages, routes) until un-archived. */
  archived?: boolean;
}

export interface NavSection {
  id: string;
  label: string;
  basePath: string;
  /** Short blurb shown at the top of the section overview page. */
  summary: string;
  items: NavItem[];
  /** Hides the whole dropdown, its overview page, and all its routes. */
  archived?: boolean;
}

const allNavSections: NavSection[] = [
  {
    id: "patients",
    label: "Patients",
    basePath: "/patients",
    summary: "Everything you need before, during, and after your visit.",
    items: [
      {
        label: "New Patient Registration",
        archived: true,
        path: "/patients/registration",
        description: "Register and tell us about your sleep history.",
        access: "public",
      },
      {
        label: "Forms & Agreements",
        archived: true,
        path: "/patients/forms",
        description: "Review and e-sign your intake documents.",
        access: "patient",
      },
      {
        label: "Preparing for Your Home Sleep Study",
        path: "/patients/home-sleep-study",
        description: "How it works, what to bring, and how to find us.",
        access: "public",
      },
      {
        label: "Billing & Insurance",
        archived: true,
        path: "/patients/billing",
        description: "Coverage, payments, and common questions.",
        access: "public",
      },
    ],
  },
  {
    id: "providers",
    archived: true,
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
    archived: true,
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
        archived: true,
        path: "/info/about",
        description: "Our team and our approach to sleep medicine.",
        access: "public",
      },
      {
        label: "Services",
        archived: true,
        path: "/info/services",
        description: "In-lab and home sleep testing, and more.",
        access: "public",
      },
      {
        label: "Locations & Hours",
        archived: true,
        path: "/info/locations",
        description: "Where to find us and when we're open.",
        access: "public",
      },
      {
        label: "Policies & Disclosures",
        path: "/info/policies",
        description: "Privacy policy, terms, and other legal notices.",
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

/** Live navigation: archived sections dropped, archived items removed. */
export const navSections: NavSection[] = allNavSections
  .filter((section) => !section.archived)
  .map((section) => ({
    ...section,
    items: section.items.filter((item) => !item.archived),
  }));
