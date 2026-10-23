import type { ComponentType } from "react";
import { ContactPage } from "../features/info/ContactPage";
import { PoliciesPage } from "../features/info/PoliciesPage";
import { HomeSleepStudyPage } from "../features/patients/HomeSleepStudyPage";

/**
 * Real page components, keyed by nav path. Any path from
 * config/navigation.ts that isn't listed here renders a "Coming soon"
 * placeholder.
 */
export const pages: Partial<Record<string, ComponentType>> = {
  "/patients/home-sleep-study": HomeSleepStudyPage,
  "/info/policies": PoliciesPage,
  "/info/contact": ContactPage,
};
