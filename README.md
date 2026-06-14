# Hosty (HOSTING_APP) 🚀

> ⚠️ **Project Status: Under Active Development**  
> Hosty is a modern, enterprise-grade multi-tenant hosting service and domain management platform built using Next.js (v16 App Router), TypeScript, Tailwind CSS v4, and MongoDB. The platform is currently in active development, with deep core architectural layers fully established.

---

## 🛠️ System Architecture Overview

This application leverages a fully unified Next.js App Router paradigm. It utilizes optimized backend API services, modular design patterns, server actions, and localized route segments under a single codebase context.

```text
HOSTING_APP/
├── app/[locale]/             # Dynamic Internationalized (i18n) Core Routing
│   ├── actions/              # Next.js Server Actions (Secure Server-Side Mutations)
│   ├── admin/                # Internal Management ERP Suite (Inventory, Orders, Users)
│   ├── api/                  # Unified Micro-Service REST API Endpoints
│   ├── components/           # Atomic UI & Specialized High-Fidelity SVG Modules
│   ├── lib/                  # Decoupled Core Business Logic & Data Access Layer (DAL)
│   └── ...                   # Page views (cart, checkout, domain, dashboard, etc.)
├── public/                   # Static Production Assets
├── proxy.ts                  # Global Edge/Request Interception & Traffic Control
└── next.config.ts            # Next.js Server Configurations
```

---

## ✨ Enterprise-Grade Feature Set

### 1. Robust Authentication & Security
*   **Stateless Sessions:** Managed cleanly through an isolated JSON Web Token utility configuration (`lib/jwt.ts`).
*   **Native Multi-Factor Auth (2FA):** Comprehensive cryptographic verification loop containing dedicated setup components, QR generation tools, and secure activation pipelines (`api/2fa_qr_code`, `api/2fa_verification`, `api/enable_2fa`, `lib/verify_2fa.ts`).
*   **Traffic Interception:** Replaces standard middleware paradigms with a direct edge network management system handled at the root level via `proxy.ts`.

### 2. High-Performance E-Commerce & Billing Engine
*   **Cart Lifecycle Management:** API routes handling reactive operations for multi-tenant service provisioning (`api/cart_add`, `api/cart_edit`, `api/cart_remove`).
*   **Native PayPal Integration:** Full end-to-end payment capture workflows utilizing custom orders creation, capture processing hooks, and direct gateway communication handlers (`api/create-order`, `api/capture-order`, `lib/paypal.ts`).
*   **Wishlist Synchronization:** State persisting middleware allowing seamless item tracking updates (`api/wish_add`, `api/wish_remove`).

### 3. Automated Domain & Infrastructure Provisioning
*   **Real-time Availability Checks:** High-efficiency endpoints providing structural validation loops for domain extensions (`api/domain_check`).
*   **Dynamic Valuation Matrix:** Algorithmic calculation parameters determining scaling localized fees (`lib/domain_pricing.ts`).
*   **Active Service Inventory:** Abstracted service state tools managing live modifications (`lib/add_services.ts`, `lib/get_all_services.ts`, `lib/get_service_data.ts`).

### 4. Advanced Admin ERP Dashboard Suite
*   **Full Fleet Telemetry:** Operational analytical trackers supplying deep data visualization points (`api/admin/get_stats`, `lib/get_admin_data.ts`).
*   **Administrative State Overrides:** Granular controls allowing immediate operational state adjustments on active sub-accounts (`api/admin/updateUser/service/suspend`, `api/admin/updateUser/service/reinstate`).
*   **Modular Subsections:** Separate dedicated system structures managing global orders tracking, live internal hardware/service allocations, and general member indices (`app/[locale]/admin/inventory`, `orders`, `system`, `users`).

### 5. Internationalization Framework (i18n)
*   **Localized Path Interception:** Complete site translation mapping utilizing dynamic segment matching engines (`app/[locale]`).
*   **Decoupled Translation Files:** Contextual strings entirely isolated from system blocks (`app/[locale]/messages`, `app/[locale]/i18n`).

---

## 📂 Deep Dive: Repository Layout

### Core Directory Structures
*   **`admin/`**: Houses layout engines (`layout.tsx`), view entry gates (`page.tsx`), and secure administration navigators (`side.tsx`).
*   **`components/`**: Standardizes interactive components to drive high-fidelity user experiences. Includes complex interface layouts (`terminal.tsx`, `oneClickDeploy.tsx`), forms (`domainInput.tsx`), and responsive graphics maps (`worldMap.tsx`).

### Shared Utility Layers
*   **`lib/`**: Operates as the application's core engine, keeping the visual components decoupled from analytical heavy-lifting (e.g., handling platform colors, parsing direct user settings, configuring database connections, and driving specific crypto mechanisms).

### Root Environments
*   Contains core workspace settings managing global configurations, strict lint rules, styling transformations, and typing systems (`tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `components.json`).

---

## 🚀 Deployment & Installation

### Environment Configuration
Create a secure `.env` file at the root level of your project and provide the following variable bindings:

```env
# Server Runtime
PORT=3000
NODE_ENV=development

# Database Layer
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/hosty_db

# Cryptography & Core Security
JWT_SECRET=your_high_entropy_jwt_secret_string

# Gateway Integrations
PAYPAL_CLIENT_ID=your_paypal_sandbox_or_live_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

### Installation Lifecycle
Run these commands inside your project terminal to install dependencies and execute the development server locally:

```bash
# 1. Install system requirements
npm install

# 2. Spin up localized development server
npm run dev
```

The application will spin up locally at `http://localhost:3000`. Next.js localized route tracking protocols will automatically forward base requests directly into their corresponding language roots (e.g., `/en`, `/fr`).
