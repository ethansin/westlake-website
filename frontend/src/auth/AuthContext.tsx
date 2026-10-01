import { createContext, useContext, type ReactNode } from "react";
import type { Access } from "../config/navigation";

/**
 * Authentication seam — NOT IMPLEMENTED YET.
 *
 * Intended shape, mirroring sleepview-workqueue: the backend issues a signed
 * session JWT in an HttpOnly cookie, and the frontend calls GET /auth/me on
 * load to learn who is signed in. No tokens are ever stored in JS.
 */
export interface SessionUser {
  email: string;
  name: string;
  role: Exclude<Access, "public">;
}

interface AuthContextValue {
  user: SessionUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: false });

export function AuthProvider({ children }: { children: ReactNode }) {
  // TODO(auth): fetch /auth/me and populate `user`.
  return (
    <AuthContext.Provider value={{ user: null, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
