<div align="center">

<img src="docs/assets/banner.svg" alt="FixTrace - Scan it. Report it. Fix it. Trace it." width="100%" />

<br/>

**Open-source maintenance management and asset lifecycle tracking.**
<br/>
QR-based fault reporting, work orders, SLA tracking and a permanent maintenance history for every asset, in one multi-tenant platform.

<br/>

[Documentation](docs/) · [Architecture](docs/ARCHITECTURE.md) · [Database](docs/DATABASE.md) · [API](docs/API.md) · [Roadmap](#-roadmap) · [Getting Started](#-getting-started)

<br/>

[![CI](https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/fixtrace/ci.yml?branch=main&label=CI&logo=githubactions&logoColor=white)](https://github.com/YOUR_USERNAME/fixtrace/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-in%20development-orange.svg)](#-project-status)
[![Phase](https://img.shields.io/badge/phase-0%20complete-14B8A6.svg)](#-roadmap)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Conventional Commits](https://img.shields.io/badge/commits-conventional-FE5196.svg?logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org)

<br/>

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

</div>

---

> [!NOTE]
> **FixTrace is under active development.** Phase 0 (architecture, database design and project setup) is complete. Feature modules below are marked with their current status. It is not production-ready yet.

## 📑 Table of Contents

- [Why FixTrace](#-why-fixtrace)
- [How it works](#-how-it-works)
- [Features](#-features)
- [User roles](#-user-roles)
- [Tech stack](#-tech-stack)
- [Architecture](#-architecture)
- [Multi-tenancy](#-multi-tenancy)
- [Data model](#-data-model)
- [Work order lifecycle](#-work-order-lifecycle)
- [Security](#-security)
- [Project structure](#-project-structure)
- [Getting started](#-getting-started)
- [Available scripts](#-available-scripts)
- [Testing](#-testing)
- [Roadmap](#-roadmap)
- [Project status](#-project-status)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 💡 Why FixTrace

Most colleges, hostels, offices, hospitals and property teams still run maintenance through phone calls, WhatsApp groups, spreadsheets and paper registers. The result is predictable:

| Problem | What it looks like in practice |
|---|---|
| Lost requests | A broken AC is reported verbally and never reaches anyone |
| No ownership | Nobody knows who is responsible for the repair |
| No visibility | Reporters keep asking "has it been fixed yet?" |
| No history | Past repairs, parts and costs are unknown |
| Repeat failures | The same equipment keeps failing and nobody notices the pattern |
| No accountability | No reliable record of how technicians perform |
| Missed deadlines | No SLA tracking and no escalation |
| Cost blindness | Managers cannot analyse costs or recurring faults |

**FixTrace replaces that with one transparent, trackable system:**

- **One loop, from fault to verified fix.** Scan, report, assign, repair, verify, close.
- **Every asset has a digital identity.** A QR code opens the asset and starts a fault report in seconds.
- **History that builds itself.** Every repair adds to the asset's permanent maintenance timeline (the *Digital Asset Passport*).
- **Accountability by design.** Every status change is recorded with who did it and when.
- **Data-driven maintenance.** Dashboards are built from real database records, not demo values.

## 🔄 How it works

```text
  Scan QR  ──►  Report fault  ──►  Manager reviews  ──►  Technician assigned
                                                                  │
   History updated  ◄──  Reporter confirms  ◄──  Verified  ◄──  Repaired
```

1. **Scan** the QR code attached to an asset.
2. **Report** the fault: description, category, severity and photos.
3. **Review**: the facility manager receives a notification and sets priority and deadline.
4. **Assign** a technician; the SLA timer tracks the deadline.
5. **Repair**: the technician updates progress, adds notes, photos and parts used.
6. **Verify**: the repair is validated and the request is closed.
7. **Trace**: the entire event is added to the asset's permanent history.

## ✨ Features

**Status legend:** ✅ Done · 🚧 In progress · 📋 Planned

| Area | Capability | Status |
|---|---|:---:|
| **Foundation** | Modular monolith architecture, monorepo with shared types, Docker infrastructure | ✅ |
| | Complete Prisma database schema (first version) | ✅ |
| **Auth and organisations** | Registration, login, JWT access and refresh tokens, logout and session revocation | 📋 |
| | Organisation creation, invitations, memberships | 📋 |
| | Role-based access control enforced on the backend | 📋 |
| | Multi-tenant data isolation | 📋 |
| **Assets** | Asset registry with categories, locations, departments and flexible metadata | 📋 |
| | Unique QR code per asset, asset detail pages, search and filters | 📋 |
| **Fault reporting** | QR-based reporting with photos, category and severity | 📋 |
| **Work orders** | Validated status transitions, technician assignment, repair notes, evidence | 📋 |
| | Optimistic concurrency control to prevent conflicting updates | 📋 |
| | Activity history for every important change | 📋 |
| **Technicians** | Profiles, skills, availability, workload and performance statistics | 📋 |
| **Notifications and SLA** | In-app notifications, configurable SLA targets, overdue detection, escalation | 📋 |
| **Analytics** | Asset status, open and overdue requests, resolution time, failure frequency, costs, trends | 📋 |
| **Digital Asset Passport** | Chronological maintenance history per asset | 📋 |
| **Intelligent insights** | Recurring-failure detection, AI-assisted fault summaries, preventive recommendations | 📋 |

> AI output will always be clearly labelled as a suggestion, and AI will never execute critical maintenance actions without human approval.

## 👥 User roles

Permissions are enforced on the **backend**, not only hidden in the UI.

| Role | Responsibilities |
|---|---|
| **Platform Super Admin** | Manage the platform, view and suspend organisations, monitor usage |
| **Organisation Admin** | Organisation settings, members, departments, locations, assets, roles, analytics |
| **Facility Manager** | Review requests, assign technicians, set priority and deadlines, monitor SLA, escalate |
| **Technician** | Accept or reject work, update progress, upload photos, record parts, mark complete |
| **Reporter / General user** | Report faults via QR, track own requests, confirm resolution |

## 🧰 Tech stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router | Fast, type-safe, component-driven UI |
| Data and forms | TanStack Query, React Hook Form, Zod | Server-state caching, performant forms, shared validation |
| Charts | Recharts | Dashboards and trend visualisation |
| Backend | Node.js, Express.js, TypeScript | One language across the stack; layered architecture built explicitly |
| Validation | Zod (shared between frontend and backend) | One source of truth for request and response shapes |
| Database | PostgreSQL, Prisma ORM | Relational integrity, constraints, indexes, transactions, migrations |
| Queue and cache | Redis, BullMQ | Background jobs for SLA tracking, escalation and notifications |
| File storage | S3-compatible object storage (pre-signed URLs) | Secure, temporary access to photos and evidence |
| Tooling | npm workspaces, ESLint, Prettier, Docker Compose | Consistent development environment |
| Testing | Vitest or Jest | Unit, integration and end-to-end tests |
| CI/CD | GitHub Actions | Automated checks on every push |

## 🏗️ Architecture

FixTrace is a **modular monolith**: one deployable application with strict internal module boundaries. This avoids the latency and operational cost of microservices while keeping the code organised enough to split later if needed.

```mermaid
flowchart LR
    subgraph Client["Client"]
        SPA["React + Vite SPA"]
        QR["QR scan opens report page"]
    end

    subgraph API["Express API (modular monolith)"]
        MW["Middleware: request ID, auth, RBAC, tenant context, validation, rate limiting"]
        MOD["Modules: auth, organisations, assets, work orders, technicians, notifications, SLA, analytics"]
        MW --> MOD
    end

    DB[("PostgreSQL")]
    REDIS[("Redis")]
    WORKER["BullMQ workers"]
    S3[("S3-compatible storage")]

    SPA -->|REST| MW
    QR -->|REST| MW
    MOD --> DB
    MOD --> REDIS
    MOD -->|pre-signed URLs| S3
    REDIS --> WORKER
    WORKER --> DB
```

**Backend layering:** `Route → Validation → Controller → Service → Repository → Prisma`. Controllers handle HTTP only; business rules live in services; all database access lives in repositories.

## 🏢 Multi-tenancy

FixTrace uses **logical (row-level) isolation** in a shared database.

- Every tenant-owned table carries an `organizationId`.
- The organisation is derived **on the server** from the authenticated session and membership. It is never trusted from a request body or URL.
- The repository layer scopes every query by organisation to prevent cross-tenant data leakage (IDOR).
- Users connect to organisations through a **membership** (user + organisation + role), so one user can belong to several organisations without redesigning authentication.
- Automated tests will verify that one tenant can never read or modify another tenant's data.

## 🗄️ Data model

The first version of the schema contains **9 models** and **6 enums**. See [docs/DATABASE.md](docs/DATABASE.md) for full detail.

<details>
<summary><b>Entity-relationship diagram</b> (click to expand)</summary>

```mermaid
erDiagram
    ORGANIZATION ||--o{ ORGANIZATION_MEMBER : has
    USER ||--o{ ORGANIZATION_MEMBER : joins
    ORGANIZATION ||--o{ LOCATION : owns
    ORGANIZATION ||--o{ DEPARTMENT : owns
    ORGANIZATION ||--o{ ASSET : owns
    ORGANIZATION ||--o{ WORK_ORDER : owns
    LOCATION |o--o{ ASSET : houses
    DEPARTMENT |o--o{ ASSET : manages
    ASSET ||--o{ WORK_ORDER : "has faults"
    ASSET ||--o{ ASSET_HISTORY : "asset passport"
    USER |o--o{ WORK_ORDER : reports
    USER |o--o{ WORK_ORDER : "assigned to"
    WORK_ORDER ||--o{ WORK_ORDER_UPDATE : "audit log"
    USER |o--o{ WORK_ORDER_UPDATE : "changed by"

    ORGANIZATION {
        string id PK
        string name
        string subdomain
    }
    USER {
        string id PK
        string email
        string passwordHash
        enum globalRole
    }
    ORGANIZATION_MEMBER {
        string userId FK
        string organizationId FK
        enum role
    }
    ASSET {
        string id PK
        string organizationId FK
        string qrCodeId
        enum status
        json metadata
    }
    WORK_ORDER {
        string id PK
        string organizationId FK
        string assetId FK
        enum status
        enum priority
        int version
    }
```

</details>

**Key design choices**

- **Enums** keep statuses, roles and priorities valid at the database level.
- **Composite unique keys** such as `(organizationId, name)` allow the same name in different organisations but not twice in one.
- **`version` on `WorkOrder`** implements optimistic concurrency: an update must state the version it read, and a stale update affects zero rows and fails safely.
- **JSON `metadata` on `Asset`** stores flexible attributes (an AC's tonnage versus a generator's capacity) without dozens of nullable columns.
- **Two audit tables:** `WorkOrderUpdate` records each status change; `AssetHistory` is the long-lived timeline of the asset itself.
- **Indexes** on `(organizationId, status)` and similar columns keep common list queries fast.

## 🚦 Work order lifecycle

Status changes follow defined transitions; arbitrary updates are rejected. Every transition creates an audit record.

```mermaid
stateDiagram-v2
    [*] --> OPEN
    OPEN --> UNDER_REVIEW
    OPEN --> REJECTED
    UNDER_REVIEW --> ASSIGNED
    UNDER_REVIEW --> REJECTED
    ASSIGNED --> IN_PROGRESS
    IN_PROGRESS --> ON_HOLD: waiting for parts
    ON_HOLD --> IN_PROGRESS
    IN_PROGRESS --> RESOLVED
    RESOLVED --> VERIFIED
    RESOLVED --> IN_PROGRESS: reopened
    VERIFIED --> CLOSED
    CLOSED --> [*]
    REJECTED --> [*]
```

The exact transition table and who may perform each transition are finalised in Phase 3.

## 🔐 Security

Security is designed in from the start, not added at the end.

- Passwords hashed with a modern password-hashing algorithm; never stored in plain text.
- Short-lived access tokens with refresh-token rotation and revocable sessions.
- **RBAC enforced in backend middleware** on every protected route.
- **Tenant isolation** enforced in the data-access layer and covered by tests.
- All input validated with Zod before it reaches business logic.
- SQL injection protection through Prisma's parameterised queries.
- Rate limiting, with stricter limits on public QR reporting endpoints.
- Secure file uploads (type and size limits) with pre-signed, temporary download URLs.
- Secrets live in environment variables and are never committed.
- Structured logging with request IDs; error responses never leak internals.

To report a vulnerability, please read [SECURITY.md](SECURITY.md) and **do not open a public issue**.

## 📁 Project structure

```text
fixtrace/
├── apps/
│   ├── frontend/              # React + Vite application
│   └── backend/               # Node.js + Express API
│       ├── prisma/            # schema.prisma and migrations
│       └── src/
│           ├── modules/       # auth, organisations, assets, work-orders, ...
│           ├── middleware/    # auth, RBAC, tenant context, error handling
│           ├── jobs/          # BullMQ queues and workers
│           └── config/        # environment and app configuration
├── packages/
│   ├── shared-types/          # Zod schemas and TS types (@fixtrace/shared-types)
│   ├── eslint-config/         # shared lint rules
│   └── tsconfig/              # shared TypeScript configs
├── docs/                      # architecture, database, API and development docs
├── docker-compose.yml         # local PostgreSQL and Redis
└── package.json               # npm workspaces root
```

## 🚀 Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 20 LTS or newer
- [npm](https://www.npmjs.com) 10 or newer
- [Docker](https://www.docker.com) and Docker Compose
- [Git](https://git-scm.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/fixtrace.git
cd fixtrace

# 2. Install all workspace dependencies from the root
npm install

# 3. Create your local environment file
cp apps/backend/.env.example apps/backend/.env

# 4. Start PostgreSQL and Redis
docker compose up -d

# 5. Apply database migrations
npx prisma migrate dev --schema apps/backend/prisma/schema.prisma

# 6. Start the backend and the frontend (in separate terminals)
npm run dev --workspace=apps/backend
npm run dev --workspace=apps/frontend
```

The frontend runs on `http://localhost:5173` (Vite default). The backend port is set in your `.env` file.

<details>
<summary><b>Environment variables</b> (click to expand)</summary>

```bash
# Server
NODE_ENV=development
PORT=4000

# Database (matches docker-compose.yml)
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/fixtrace?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# Auth (generate long random values; never commit real secrets)
JWT_ACCESS_SECRET="change-me"
JWT_REFRESH_SECRET="change-me-too"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Object storage (planned, S3-compatible such as MinIO)
# S3_ENDPOINT=
# S3_BUCKET=
# S3_ACCESS_KEY=
# S3_SECRET_KEY=
```

</details>

### Troubleshooting

| Problem | Fix |
|---|---|
| `touch` or other Unix commands fail in PowerShell | Use Git Bash as your VS Code terminal on Windows |
| Vite fails to install with native binding errors | Delete `node_modules`, run `npm cache clean --force`, then `npm install` again |
| `EJSONPARSE` when linking workspaces | Check that the root `package.json` is saved and contains valid JSON with a `workspaces` array |
| Cannot connect to the database | Run `docker compose ps` and confirm the PostgreSQL container is healthy |

## 📜 Available scripts

Run from the repository root. Script names may be adjusted as the project grows; check each `package.json` for the current list.

| Command | Description |
|---|---|
| `npm install` | Install and link all workspaces |
| `npm run dev --workspace=apps/backend` | Start the API in development mode |
| `npm run dev --workspace=apps/frontend` | Start the Vite dev server |
| `npm run build --workspaces --if-present` | Build all workspaces |
| `npm run lint --workspaces --if-present` | Lint all workspaces |
| `npm test --workspaces --if-present` | Run all tests |
| `docker compose up -d` / `down` | Start or stop PostgreSQL and Redis |

## 🧪 Testing

Testing is planned alongside each feature, not left to the end:

- **Unit tests** for business rules (status transitions, SLA calculations).
- **Integration tests** against a real PostgreSQL instance for repositories and APIs.
- **Authorisation and tenant-isolation tests** proving users cannot cross organisation boundaries.
- **End-to-end tests** for the main flows such as QR reporting to verified closure.

## 🗺️ Roadmap

| Phase | Focus | Status |
|---|---|:---:|
| **0** | Architecture, database schema, monorepo, local infrastructure | ✅ Complete |
| **1** | Core foundation: authentication, organisations, memberships, RBAC, tenant isolation | 📋 Up next |
| **2** | Asset management: CRUD, categories, locations, QR codes, search | 📋 Planned |
| **3** | Maintenance workflow: fault reporting, work orders, assignment, verification, history | 📋 Planned |
| **4** | Operational intelligence: notifications, background jobs, SLA, escalation, dashboards | 📋 Planned |
| **5** | Advanced: Digital Asset Passport, smart assignment, recurring failures, AI summaries | 📋 Planned |
| **6** | Production readiness: test coverage, performance, security review, deployment, docs | 📋 Planned |

See [TASKS.md](TASKS.md) for the detailed task list and [CHANGELOG.md](CHANGELOG.md) for what has changed.

## 📍 Project status

- **Current phase:** Phase 0 complete; Phase 1 is next.
- **Known limitations:** no user-facing features yet; the database schema is a first version and will evolve (for example invitations, sessions, SLA tables and attachments are still to be added).
- This project makes no claims about users, performance or production usage.

## 🤝 Contributing

Contributions, ideas and bug reports are welcome.

1. Fork the repository and create a branch: `git checkout -b feat/short-description`
2. Make your changes with tests where applicable.
3. Run lint and tests before committing.
4. Use [Conventional Commits](https://www.conventionalcommits.org) such as `feat(assets): add QR code generation`.
5. Open a pull request describing what changed and why.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md) first.

## 👤 Author

**Tanishq Verma**
B.Tech ECE, IIIT Kota

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tanishq-verma-8a5615327)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/tanishq-kuec2003)

## 📄 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

<div align="center">

If FixTrace is useful or interesting to you, consider giving it a ⭐

</div>
