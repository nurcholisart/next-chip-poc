# CHIPS POC (Partitioned Cookies)

## Goal
Prove a partitioned session cookie works in Chrome Incognito when the app is embedded cross-site in an iframe.

## Prereqs
- Deploy the Next.js app to HTTPS (Vercel recommended).
- Use Chrome Incognito for validation.

## Exact Steps (Incognito)
1. Deploy this repo to Vercel and copy the HTTPS URL, for example `https://your-vercel-app`.
2. Run the embed host locally:

```bash
node tools/embed-host/server.js
```

3. Open Chrome Incognito and go to `http://127.0.0.1:4000`.
4. In the embed host page, set the embed origin to your Vercel URL.
5. Use the toggle or `Show /login` button to load `/login` in the iframe.
6. Log in inside the iframe (any email/password).
7. Switch to `/app` in the iframe.
8. Confirm `/app` loads without a redirect loop and shows `Logged in` plus the status strip.

## Expected Results
- In DevTools → Application → Cookies for the embedded origin, the cookie `__Host-poc_session` is present and shows a **Partition Key** (partitioned).
- In DevTools → Network for `/api/whoami`, the request includes the cookie and the response shows:
  - `hasCookie: true`
  - `email: <your email>`
  - `rawCookiePresent: true`

## Notes
- The session cookie is `Secure` and `Partitioned`, so it will only be set over HTTPS. Local `next dev` on `http://localhost` will not persist the cookie.
- The embed host is intentionally `http://127.0.0.1:4000` so it is cross-site relative to your HTTPS app.
