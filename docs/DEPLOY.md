# Deploying the website

How to put the site on Google Cloud (Firebase Hosting) and serve it at
**westlakesleep.com**.

**Why Firebase Hosting?** It's Google Cloud's static-site host, the same one
the workqueue frontend uses. It includes free SSL certificates and a global
CDN, and the free tier easily covers a clinic landing site.

**Order of operations:** deploy and test on the free `*.web.app` address
first, then point the domain at it last. The domain only changes once you
know the site works.

---

## Current state of the domain (checked Oct 2026)

| Thing | Where it lives | Notes |
|---|---|---|
| Domain registration + DNS | **Squarespace Domains** | Google Domains moved here in 2023 |
| Email | Google Workspace | `MX → smtp.google.com`, SPF TXT record. **Do not touch these** |
| `westlakesleep.com` / `www` | Squarespace "Coming Soon" parking page | Safe to replace |

---

## One-time setup

### 1. Create a Google Cloud / Firebase project

Use a **new project** for the public site, separate from `westlake-workqueue`.
The public site holds no patient data, so keeping it apart means its access
and settings can never affect the PHI systems.

1. Go to <https://console.firebase.google.com> signed in as your
   `@westlakesleep.com` account.
2. **Create a project.** Name it `westlake-website`. Firebase will suggest a
   project ID; note it down (e.g. `westlake-website` or
   `westlake-website-1a2b3`).
3. Skip Google Analytics (it's not needed, and the site has no cookie banner).
4. Stay on the free **Spark** plan. It includes custom domains and SSL.
   - Free limits: 10 GB stored, 360 MB/day transferred, roughly 700 home page
     visits a day. If you ever outgrow it, upgrade to **Blaze** (pay as you
     go, about $0.15/GB after the free amount) and set a budget alert.

> Check: the project appears in the Google Cloud console under the
> `westlakesleep.com` organization, not under "No organization".

### 2. Connect the repo to the project

Run everything from `westlake-website/frontend`:

```bash
cd ~/Documents/wslksleep/Apps/westlake-website/frontend
```

Make sure the Firebase CLI is current:

```bash
npm install -g firebase-tools
```

Sign in (opens a browser; pick your `@westlakesleep.com` account):

```bash
firebase login
```

Link this folder to the new project. Choose the project ID from step 1 and
give it the alias `default`:

```bash
firebase use --add
```

This creates `frontend/.firebaserc`. **Commit it**, since it holds no secrets.

---

## Deploying (every time)

### 3. Build

```bash
npm run build
```

This type-checks and writes the site to `frontend/dist/`. If it fails, fix
the error before deploying.

### 4. (Optional) Preview link first

Deploys to a temporary URL that expires in 7 days without touching the live
site. Useful for sending to someone for review:

```bash
firebase hosting:channel:deploy preview --expires 7d
```

### 5. Deploy live

```bash
firebase deploy --only hosting
```

The output prints the live URLs, e.g. `https://<project-id>.web.app`.

> Check on the `.web.app` URL: the home page loads, the menus work, and
> refreshing directly on `/info/contact` still shows the Contact page (not a
> 404). The SPA rewrite in `firebase.json` handles that.

---

## Connecting westlakesleep.com (one time, after the first deploy)

### 6. Add the domain in Firebase

1. Firebase console → your project → **Hosting** → **Add custom domain**.
2. Enter `westlakesleep.com`. Leave "redirect" unchecked.
3. Firebase shows the DNS records to add, usually a **TXT** record for
   ownership plus one or more **A** records. Keep this screen open.
4. Add a second custom domain, `www.westlakesleep.com`, and **check**
   "Redirect to an existing website" → `westlakesleep.com`. Note its records
   too.

Always copy the exact values Firebase shows rather than ones from a guide,
since they can change.

### 7. Update DNS in Squarespace

Open the DNS settings either way:
- <https://account.squarespace.com/domains> → `westlakesleep.com` → **DNS** →
  **DNS Settings**, or
- Google Admin console → **Account → Domains → Manage domains** →
  `westlakesleep.com` → **Advanced DNS settings** (links to Squarespace).

You'll see record groups ("presets"):

**Leave alone:** the **Google Workspace** preset (MX `smtp.google.com`) and
the SPF TXT record (`v=spf1 include:_spf.google.com ~all`). Changing these
breaks company email.

Then:
1. **Remove the "Squarespace Defaults" preset.** These are the four A
   records on `@` (198.49.23.144 / .145, 198.185.159.144 / .145) and the
   `www` CNAME to `ext-sq.squarespace.com` that serve the "Coming Soon" page.
   If you prefer, delete just those records individually.
2. **Add the records Firebase gave you** in step 6:
   - TXT on `@` with the value from Firebase. This is an *additional* TXT
     record. Don't edit or replace the SPF one; both can coexist.
   - A record(s) on `@` pointing to the IP(s) Firebase listed.
   - The record(s) Firebase listed for `www`.
3. Save.

### 8. Wait for verification and SSL

- Back in Firebase Hosting, the domains go from "Needs setup" →
  "Pending" → **"Connected"**. That usually takes minutes to a few hours, and
  up to 24 hours.
- Firebase issues the SSL certificate automatically. Until it's ready,
  browsers may show a certificate warning. That's expected; just wait.

Check DNS from the terminal (should show the Firebase IPs, not
198.49.23.x / 198.185.159.x):

```bash
dig +short westlakesleep.com
```

> Final check: `https://westlakesleep.com` loads the site with a padlock,
> `https://www.westlakesleep.com` redirects to it, and sending an email to
> your `@westlakesleep.com` address still arrives.

---

## Day-to-day

| Task | How |
|---|---|
| Publish changes | `npm run build`, then `firebase deploy --only hosting` (from `frontend/`) |
| Share a draft | `firebase hosting:channel:deploy preview --expires 7d` |
| Undo a bad deploy | Firebase console → Hosting → **Release history** → ⋮ on the previous release → **Rollback** |
| See what's live | Firebase console → Hosting → Release history |

**Later, optional:** auto-deploy on every push to `main` with GitHub
Actions (`firebase init hosting:github`). It's not needed while you're the
only one deploying.

---

## Things to keep in mind

- **No patient data on this host.** The site is static and collects nothing.
  When referral or registration forms are built, their data must go to the
  HIPAA-covered backend described in `ARCHITECTURE.md`, never to Firebase
  Hosting itself.
- **Squarespace can't host this site.** Keep using Squarespace only for DNS
  and domain renewal. Make sure the domain stays on **auto-renew** there.
- **Policy pages:** carrier SMS registration (A2P 10DLC) will want the SMS
  privacy policy and terms at public URLs on this domain, so publish those
  pages before submitting the registration.
