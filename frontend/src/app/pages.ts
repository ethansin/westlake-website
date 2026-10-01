import type { ComponentType } from "react";

/**
 * Real page components, keyed by nav path. Any path from
 * config/navigation.ts that isn't listed here renders a "Coming soon"
 * placeholder.
 *
 * When a page is built, register it here, e.g.:
 *   "/providers/referral": ReferralPage,
 */
export const pages: Partial<Record<string, ComponentType>> = {};
