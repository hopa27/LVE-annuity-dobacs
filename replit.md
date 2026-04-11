# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## BACS Payments Application

A modern recreation of the legacy BACS Payments Windows desktop application. This is a **static frontend-only** React + Vite web app with no backend API dependencies.

### Design System
- **Fonts**: Livvic (headers, buttons, labels) + Mulish (body text, inputs)
- **Icons**: Material Design Icons via `react-icons/md`
- **Tabs**: Radix UI Tabs (`@radix-ui/react-tabs`)
- **Color palette**: LVE design system (Primary Blue #006cf4, Navy #00263e, Green #178830, etc.)

### Application Structure
- **Header**: Navy background with LV= logo, Logout button, page title
- **Top Controls**: Completion Start/End date inputs, Show Payments + Print Report buttons
- **8 Tabs**: Tax Free, First and One Off Payments, Processed, Monthly Differences, Maturities, Reports, FirstPayments MCP, Processed MCP
- **Bottom Bar**: Close button + status input field
- **Footer**: LV= logo + company address

### Key Files
- `artifacts/bacs-payments/src/pages/BacsPayments.tsx` - Main page with all 8 tabs
- `artifacts/bacs-payments/src/components/` - Reusable components (DateInput, ActionButton, DataGrid, ReadOnlyInput, SelectInput)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
