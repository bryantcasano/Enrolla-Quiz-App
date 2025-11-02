# Enrolla Quiz App

A modern, timed, paginated quiz application built with **Next.js**, featuring both frontend and backend in a single repository.  

---

## Table of Contents

- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Validation Approach](#validation-approach)
- [Libraries Used](#libraries-used)
- [Trade-offs & Shortcuts](#trade-offs--shortcuts)
- [Time Spent](#time-spent)

---

## Quick Start

### Install

```bash
# Clone the repository
git clone git@github.com:bryantcasano/Enrolla-Quiz-App.git
cd Enrolla-Quiz-App

# Install dependencies
npm install
```

The frontend runs on Next.js App Router with React 18 features.
The backend API routes serve quiz questions and grading logic.

```bash
# Run frontend & backend together
npm run dev

# Build
npm run build
npm start
```

This will build the app for production.
Environment variables must be configured in .env.local, e.g.:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```
## Architecture

Frontend: Next.js using the App Router (app/) for server components.
Backend: Node-based API routes (app/api/quiz/route.ts and app/api/grade/route.ts) running on Vercel Edge or Node runtime.
Deployment: Only the frontend is deployed to Vercel (can optionally deploy the backend elsewhere if scaling).
State Management: Local React state with useState and useEffect.

Key Patterns:
- Shuffled questions on the frontend only (backend keeps canonical order for grading).
- Pagination with QUESTIONS_PER_PAGE.
- Timer triggers automatic submission.

## Validation Approach

**Frontend input validation is minimal:** checks type consistency (string for text, number for radio index, array for checkbox).
**Backend grading logic ensures strict correctness:**
- **Radio:** correct index match.
- **Checkbox:** all selected indexes must match sorted correct indexes.
- **Text:** trimmed, case-insensitive comparison.

## Libraries Used

- **Frontend:** Next.js 15 (App Router), React, TailwindCSS  
- **Backend:** Hono, Cloudflare Workers  
- **Validation:** Zod

## Trade-offs & Shortcuts

**Frontend-only timer:** Simplifies implementation but can be bypassed by modifying client state.
**Shuffling only frontend:** Avoids backend complexity but requires mapping results back to shuffled order.
**No persistent user sessions:** Quiz state is ephemeral; refreshing the page resets quiz.
**Single repo for frontend + backend:** convenient for local dev but slightly complicates Vercel deployment (only frontend deployed).
**No database:** Quiz data is static or fetched from API; adding DB would increase complexity.

## Time Spent

**Frontend (React + Next.js):** 10 hours
**Backend (grading logic, API):** 6 hours
**Testing, shuffling, pagination, timer integration:** 4 hours
**Deployment & Config:** 1 hour
**Total:** 21 hours