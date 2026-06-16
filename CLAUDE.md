# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run lint      # Run ESLint
```

No test suite is configured yet.

## Architecture Overview

This is a **Next.js 16 App Router** application for "Bridge" — an employee benefits/voucher platform. It serves four distinct user roles, each with their own route group and layout.

### Route Groups by Role

| Route Group | Role | Base Path |
|-------------|------|-----------|
| `(client)` | `EMPLOYEE` | `/dashboard`, `/merchants`, `/vouchers` |
| `(admin)` | `COMPANY_ADMIN` | `/admin/...` |
| `(employee)` | `EMPLOYEE` (offers view) | `/offers` |
| `(stlr)` | `STLR_ADMIN` | `/stlr/...` |
| `(auth)` | public | `/login` |

Each role group has its own layout. The `(stlr)` and `(admin)` layouts force dark mode; `(client)` forces light mode — both via `document.documentElement.classList` in `useEffect`.

### Auth & RBAC

- **NextAuth v4** handles sessions (`next-auth/jwt`). Token includes `role` and `sub`.
- `middleware.ts` enforces access: unauthenticated users → `/login`, wrong role → their home route.
- RBAC config lives in `src/core/rbac/config.ts`: `ROLE_HOME_ROUTES`, `PROTECTED_ROUTE_PREFIXES`, `ROLE_PERMISSIONS`, and helpers `hasPermission`, `canAccessRoute`, `getHomeRoute`.
- User role type is `UserRole = "EMPLOYEE" | "COMPANY_ADMIN" | "MERCHANT_USER" | "STLR_ADMIN"` (`src/core/types/index.ts`).

### API Layer

- **Axios client** at `src/core/api/client.ts` with JWT injection via `setTokenAccessor()` and global 401 → redirect handling.
- Helper functions `get`, `post`, `put`, `patch`, `del` wrap the client and unwrap `.data`.
- Base URL from `NEXT_PUBLIC_API_URL` env var.
- Feature APIs are plain objects: `offersApi`, `vouchersApi`, etc. in `src/features/<domain>/api/index.ts`.

### Data Fetching Pattern

- **TanStack Query v5** for all server state. Query client created in `src/core/query/client.ts`.
- Each feature exports query key factories (e.g. `vouchersKeys`) and hooks (`useVouchers`, `generateVoucher`) from `src/features/<domain>/hooks/index.ts`.
- Cache invalidation after mutations is centralized in `src/core/query/invalidation.ts`.
- `QueryBoundary` (`src/core/query/query-boundary.tsx`) combines `Suspense` + `ErrorBoundary` for data-fetching components — prefer this over per-component loading/error handling.

### Component Layers

- `src/components/ui/` — shadcn/ui primitives (don't edit these directly; re-add via `npx shadcn add <component>`).
- `src/components/shared/` — project-level reusable components (`DataTable`, `Pagination`, `Breadcrumbs`, `Tabs`, `UploadZone`, status chips, etc.).
- `src/components/layout/` — `Navbar`, `Footer`, `Sidenav`, `Container`.
- `src/features/<domain>/components/` — feature-specific components.

### Feature Structure

Each feature under `src/features/<domain>/` follows:
```
types.ts       — TypeScript interfaces
schema.ts      — Zod validation schemas
api/index.ts   — API call functions
hooks/index.ts — TanStack Query hooks
components/    — Feature-specific UI
forms/         — React Hook Form forms
```

### Styling

- **Tailwind CSS v4** with CSS variables for theming (`src/app/globals.css`).
- shadcn/ui config: `new-york` style, `neutral` base color, `@/components/ui` alias.
- `cn()` utility in `src/lib/utils.ts` combines `clsx` + `tailwind-merge`.
- Icons: `@solar-icons/react-perf` (primary) + `lucide-react` (shadcn default).
- Toast notifications via `sonner` — wrapper at `src/lib/toast.ts`.

### Global Providers

`src/app/providers.tsx` wraps the app with: `SessionProvider` → `QueryClientProvider` → `ThemeProvider` → `Toaster`. ReactQuery DevTools are dev-only.

### Static Mock Data

`src/data/` contains static TypeScript arrays used as placeholder data while the real API is integrated (companies, merchants, offers, vouchers). These will be replaced by API calls.
