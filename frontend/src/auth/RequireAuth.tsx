import type { ReactNode } from "react";
import type { Access } from "../config/navigation";

/**
 * Route guard placeholder. Every non-public route is already wrapped in this,
 * so turning on auth later only requires changing this one component.
 *
 * TODO(auth): when `access` isn't "public", read useAuth() and redirect to the
 * matching sign-in flow (provider sign-in, employee Google SSO, patient
 * verification) if the user is missing or has the wrong role.
 */
export function RequireAuth({ children }: { access: Access; children: ReactNode }) {
  return <>{children}</>;
}
