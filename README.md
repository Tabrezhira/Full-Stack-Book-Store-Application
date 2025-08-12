# Full-Stack Book Store Application

Monorepo with a Node/Express + MongoDB backend and a React + Vite frontend.

## Stack
- Backend: Express, Mongoose, JWT, CORS
- Frontend: React, Vite, TailwindCSS
- Deployment: Vercel (backend as serverless, frontend as static)

## Project Structure
```
backend/           # Express API
frontend/          # React app (Vite)
```

## Prerequisites
- Node.js 18+ (LTS recommended)
- MongoDB connection string (e.g., MongoDB Atlas)

## Environment Variables
Backend expects one of these env vars for Mongo:
- `MONGODB_URI` (recommended)
- `URL` or `MONGO_URI` (fallbacks)

Common backend envs:
- `PORT` (optional for local, default 3001)
- `JWT_SECRET` (if used in routes)

Create `backend/.env`:
```
MONGODB_URI=mongodb+srv://user:pass@cluster/dbname?retryWrites=true&w=majority
PORT=3001
JWT_SECRET=change_me
```

## Install
Run from repo root or per package.

```
cd backend && npm install
cd ../frontend && npm install
```

## Run locally
Backend (default http://localhost:1000):
```
cd backend
npm run dev
```

Frontend (default http://localhost:5173):
```
cd frontend
npm run dev
```

### Health and API discovery
Open backend root `/` to see:
- MongoDB status, timestamp
- API base URL and versioned paths

Example: `http://localhost:3001/`

## Deploy to Vercel

### Backend (Serverless)
- Path: `backend/`
- Ensure `backend/vercel.json` exists with API routing to `api/index.js`.
- Set env var `MONGODB_URI` (or `URL`/`MONGO_URI`) in Vercel Project Settings.
- Optional: `JWT_SECRET` and others you need.

### Frontend (Static)
- Path: `frontend/`
- Framework preset: Vite
- Build command: `npm run build`
- Output dir: `dist`
- Environment variable for API base (if needed) e.g. `VITE_API_BASE=https://<your-backend-domain>`

## Notes
- The backend exports the Express app for serverless usage. Local runs still use `app.listen`.
- Mongo connection is cached and ensured per request to handle serverless cold starts.
- `.gitignore` prevents node_modules and local env files from being committed.

## Scripts
Backend:
- `npm run dev` – nodemon dev server
- `npm start` – node app.js

Frontend:
- `npm run dev` – Vite dev server
- `npm run build` – Production build
- `npm run preview` – Preview build locally

## Troubleshooting
- Port in use: stop the other process or change `PORT`.
- Mongo disconnected on Vercel: verify `MONGODB_URI` and IP access (Atlas). Check `/` route JSON.
- bcrypt native issues: using `bcryptjs` to avoid native binding errors.

---

Maintained in the `main` branch.
