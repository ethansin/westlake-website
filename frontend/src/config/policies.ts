import privacy from "../content/policies/privacy.md?raw";
import terms from "../content/policies/terms.md?raw";

/**
 * Legal policies and disclosures listed on /info/policies.
 *
 * Each published policy is a plain-text document page at
 * /info/policies/<slug>, rendered from a Markdown file in
 * src/content/policies/. A policy without `content` is listed as
 * "Coming soon" with no link.
 *
 * Set `archived: true` to hide a policy from the list (and its page) while
 * keeping its entry for later.
 *
 * When you edit a policy's text, update its `lastUpdated` date too.
 */
export interface Policy {
  slug: string;
  title: string;
  description: string;
  /** Markdown body. The page supplies the title, so start headings at `##`. */
  content?: string;
  /** Shown as "Last updated: …" under the title. */
  lastUpdated?: string;
  archived?: boolean;
}

const allPolicies: Policy[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "How we collect, use, and protect your information, including text messages.",
    content: privacy,
    lastUpdated: "October 23, 2026",
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    description: "Terms for using our website and text messaging service.",
    content: terms,
    lastUpdated: "October 23, 2026",
  },
  {
    slug: "notice-of-privacy-practices",
    archived: true,
    title: "Notice of Privacy Practices",
    description: "How your health information may be used and your rights under HIPAA.",
  },
  {
    slug: "nondiscrimination",
    archived: true,
    title: "Nondiscrimination & Language Assistance",
    description: "Our nondiscrimination policy and free language services.",
  },
];

/** Policies shown on the site: archived entries removed. */
export const policies: Policy[] = allPolicies.filter((p) => !p.archived);

export const policyPath = (slug: string) => `/info/policies/${slug}`;
