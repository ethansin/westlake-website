/**
 * Legal policies and disclosures listed on /info/policies.
 *
 * Each policy will get its own plain-text document page at
 * /info/policies/<slug> (see "Document / prose page" in docs/DESIGN.md).
 * Until that page exists, leave `published` off and the policy is listed
 * as "Coming soon" without a link.
 */
export interface Policy {
  slug: string;
  title: string;
  description: string;
  published?: boolean;
}

export const policies: Policy[] = [
  {
    slug: "sms-privacy",
    title: "SMS Privacy Policy",
    description: "How we handle your information when we text you.",
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    description: "Terms for using our website and text messaging service.",
  },
  {
    slug: "notice-of-privacy-practices",
    title: "Notice of Privacy Practices",
    description: "How your health information may be used and your rights under HIPAA.",
  },
  {
    slug: "nondiscrimination",
    title: "Nondiscrimination & Language Assistance",
    description: "Our nondiscrimination policy and free language services.",
  },
];

export const policyPath = (slug: string) => `/info/policies/${slug}`;
