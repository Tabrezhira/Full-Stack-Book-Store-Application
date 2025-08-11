# Backend on Vercel

This backend is configured to run on Vercel as a serverless function.

- Entry: `api/index.js` (uses the exported Express app from `app.js`).
- Config: `vercel.json` routes all requests to the API entry.
- Local dev: `npm run dev` or `npm start`.
- Environment vars: set in Vercel project (URL for MongoDB, JWT secret, etc.).

Notes
- CORS is enabled via `cors`.
- The app only calls `listen()` when run directly, not when imported by Vercel.
