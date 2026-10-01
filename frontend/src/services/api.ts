/**
 * API client stub for the future website backend. Unused for now.
 *
 * `credentials: "include"` sends the HttpOnly session cookie, matching the
 * workqueue's auth model. Anything carrying PHI (referrals, patient forms)
 * must only go to our HIPAA-covered backend — never to third-party form
 * services.
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}
