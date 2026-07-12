# Dokani Platform - Multi-Tenant E-commerce SaaS

A pragmatically engineered, robust Multi-Tenant E-commerce Infrastructure designed to let merchants deploy fully functional, highly custom online storefronts in seconds. Built using a modern decoupled architecture, the system isolates merchant configurations seamlessly while driving unified data consistency through a high-performance backend ledger.

### 🚀 Core Architecture & Features
- **Dynamic Multi-Tenant Engine:** Automated server-side tenant resolution via custom slugs and subdomains, instantly identifying store instances on runtime.
- **Next.js Storefront Framework:** Hybrid-rendered, lightning-fast product rendering mapped to dynamically injected CSS variable color palettes and custom merchant themes (`minimalist`, `bold`, etc.).
- **Robust Laravel Backend API:** Structured with explicit data mapping, optimized Eloquent relations, and isolated scopes handling tenant lifecycles.
- **Global Cart & Checkout Flow:** Decoupled client-side global state management connecting smoothly to cross-origin order dispatching pipelines.
- **Automated Billing Architecture:** Built-in trial phases and dynamic subscription status checks (`active`, `suspended`) optimizing platform monetization.

### 🛠️ Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Context API.
- **Backend:** PHP, Laravel, Eloquent ORM.
- **Database:** MySQL / PostgreSQL (with double-entry ledger compatibility).
- **Environment:** Containerized infrastructure utilizing Docker for flawless local-to-production consistency.