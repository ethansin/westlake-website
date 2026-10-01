# backend (reserved)

Not implemented yet. This is where the website's API will live once the
features below are built. See [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md).

Planned responsibilities:

- **Auth** — sessions for providers, patients, and employees, following the
  `sleepview-workqueue` model (FastAPI, signed JWT in an HttpOnly cookie,
  roles in Firestore).
- **Provider referrals** — receive, store, and route signed referral forms.
- **Patient e-signature** — create DocuSign / Dropbox Sign signing sessions and
  handle their completion webhooks.

All of these handle PHI, so the backend must run on HIPAA-covered GCP services
(Cloud Run, Firestore, Cloud Storage under the Google BAA).
