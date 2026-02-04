# CHIPS POC (Partitioned Cookies)

This repository is a minimal proof of concept that demonstrates CHIPS
(partitioned cookies) working in Chrome Incognito when the app is embedded
cross-site inside an iframe.

**What it shows**
- A tiny login flow that sets a partitioned session cookie manually.
- A protected `/app` page that validates the cookie via middleware.
- A server-side `/api/whoami` endpoint to confirm cookie delivery.
- A small cross-site iframe host used to exercise third‑party context.

**Why it matters**
Traditional third‑party cookies are blocked in many contexts. CHIPS allows a
cookie to be stored per top‑level site (partitioned by the embedding origin),
so an embedded app can keep a scoped session without tracking across sites.

**Design highlights**
- The `Set-Cookie` header is built manually to guarantee `Partitioned`.
- The cookie uses the `__Host-` prefix to avoid `Domain` and scope leaks.
- The debug/status strip makes cookie state and navigation stability visible.

See `docs/POC-CHIPS.md` for the exact test steps and expected results.
