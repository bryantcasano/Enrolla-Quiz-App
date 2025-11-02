# Full-Stack Quiz App

A simple full-stack quiz app built using **Hono (Cloudflare Workers)** for the backend and **Next.js + TailwindCSS** for the frontend.

---

## 🚀 Live URLs
| Service | URL |
|----------|-----|
| **Frontend (Vercel)** | https://quiz-app.vercel.app |
| **Backend (Cloudflare Workers)** | https://quiz-api.yourname.workers.dev |

---

## 🧩 Features
- 3 question types: text, radio, checkbox  
- Real grading logic via API  
- TailwindCSS UI  
- End-to-end mock data (no DB)

---

## 🧱 Stack
- **Frontend:** Next.js 15 (App Router), React, TailwindCSS  
- **Backend:** Hono, Cloudflare Workers  
- **Validation:** Zod

---

## ⚙️ Quick Start

### Backend
```bash
cd apps/backend
npm install
npm run dev
# Deploy
npx wrangler login
npm run deploy
