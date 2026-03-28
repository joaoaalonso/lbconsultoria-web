# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Dev server at http://localhost:3000
npm run build    # Production build
npm test         # Run tests (watch mode)
npm test -- --watchAll=false  # Run tests once (CI mode)
```

Requires `REACT_APP_API_URL` env var (see `.env.example`).

## Architecture

**Stack:** React 18 + TypeScript, Create React App, React Router v6, Axios, react-hook-form, pdfmake, Chart.js

**Domain:** Livestock/slaughterhouse management system with clients, ranches, slaughterhouses, employees, and PDF reports.

### Directory Structure

- `src/components/` — Reusable UI components (Button, Card, Header, Menu, Table, etc.)
- `src/screens/` — Page-level components organized by feature domain (auth, clients, ranches, slaughterhouse, reports, analytics, employee, premature)
- `src/services/` — API calls and business logic; `api.ts` is the Axios instance, domain services (report.ts, users.ts, etc.) use it
- `src/utils/` — Formatting, parsing, sorting, and masking helpers
- `src/routes.tsx` — Route definitions with auth guard; protected routes redirect to `/login` when unauthenticated

### Auth

JWT tokens stored in `localStorage` (key: `authToken`). The token payload encodes user role (CLIENT=1, EMPLOYEE=2, ADMIN=3). `src/services/auth.ts` exposes `isEmployee()`, `isAdmin()`, `getToken()`. The Axios interceptor in `src/services/api.ts` auto-logouts on 401.

### API Layer

All HTTP calls go through the Axios instance in `src/services/api.ts` with a `Bearer` token header. Base URL is `REACT_APP_API_URL`. Each domain has its own service file that imports from `api.ts`.

### PDF Reports

PDF generation lives in `src/services/generateReport/` and uses `pdfmake`. This is a standalone service invoked from report screens.

### State Management

No global state library. Auth state is driven from localStorage on app startup. Component state is local (useState). No Context API or Redux.
