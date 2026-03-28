# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start           # Dev server at http://localhost:3000
npm run build       # Production build (tsc -b && vite build)
npm test            # Run tests once (vitest run — use in CI)
npm run test:watch  # Run tests in watch mode
```

Requires `VITE_API_URL` env var (see `.env.example`).

## Architecture

**Stack:** React 18 + TypeScript, Vite, React Router v6, Axios, react-hook-form, pdfmake, Chart.js, Vitest, sweetalert2

**Domain:** Livestock/slaughterhouse management system with clients, ranches, slaughterhouses, employees, and PDF reports.

### Directory Structure

- `src/components/` — Reusable UI components (Button, Card, Header, Menu, Table, ErrorBoundary, etc.)
- `src/screens/` — Page-level components organized by feature domain (auth, clients, ranches, slaughterhouse, reports, analytics, employee, premature)
- `src/services/` — API calls and business logic; `api.ts` is the Axios singleton, domain services (report.ts, users.ts, etc.) use it; `handleApiError.ts` centralizes error handling
- `src/hooks/` — Custom reusable hooks: `useEntityList` (fetch + loading pattern), `usePostalCode` (CEP auto-fill), `useTableRows` (dynamic table row management)
- `src/contexts/` — React Contexts: `AuthContext` (auth state + `useAuth()`), `NotificationsContext` (notification state + `useNotifications()`)
- `src/types/` — Centralized TypeScript interfaces with barrel export (`index.ts`); services re-export types for compatibility
- `src/utils/` — Formatting, parsing, sorting, masking helpers; `swal.ts` is a sweetalert2 wrapper compatible with the old sweetalert API
- `src/routes.tsx` — Route definitions with auth guard; all 24 screens are lazy-loaded via `React.lazy` + `Suspense`

### Auth

JWT tokens stored in `localStorage` (key: `authToken`). The token payload encodes user role (CLIENT=1, EMPLOYEE=2, ADMIN=3). `src/services/auth.ts` exposes `isEmployee()`, `isAdmin()`, `getToken()`. The Axios interceptor in `src/services/api.ts` auto-logouts on 401.

Auth state is managed by `AuthContext` — use `useAuth()` to access `isLoggedIn` and `onLogin`. Do not pass auth state as props.

### API Layer

All HTTP calls go through the Axios singleton in `src/services/api.ts` with a `Bearer` token header injected via request interceptor. Base URL is `VITE_API_URL` (`import.meta.env.VITE_API_URL`). Each domain has its own service file that imports from `api.ts`. Use `handleApiError` from `src/services/handleApiError.ts` for error handling in service calls.

### PDF Reports

PDF generation lives in `src/services/generateReport/` and uses `pdfmake`. This is a standalone service invoked from report screens.

### State Management

Auth and notifications use Context API (`AuthContext`, `NotificationsContext`). All other state is local (`useState`). No Redux or other global state library.

### Routing

All 24 route screens are lazy-loaded with `React.lazy` + `Suspense` in `routes.tsx`. `ErrorBoundary` in `App.tsx` catches runtime errors gracefully.

### Code Quality

- **ESLint v9 flat config** (`eslint.config.js`) + Prettier (`.prettierrc`)
- **Husky + lint-staged**: pre-commit runs `eslint --fix` + `prettier --write` on staged `.ts/.tsx` files
- **Tests**: Vitest with 28 unit tests covering utils, services, and a smoke test for App
- **Types**: All interfaces live in `src/types/`; `any` is allowed as `warn` (not error) for known hard cases like `Control<any>` in reusable form components
- **Alerts**: Always use `src/utils/swal.ts` wrapper — never import `sweetalert` or `sweetalert2` directly
