import type { ComponentType } from "react";
import { PoliciesPage } from "../features/info/PoliciesPage";

/**
 * Real page components, keyed by nav path. Any path from
 * config/navigation.ts that isn't listed here renders a "Coming soon"
 * placeholder.
 */
export const pages: Partial<Record<string, ComponentType>> = {
  "/info/policies": PoliciesPage,
};
