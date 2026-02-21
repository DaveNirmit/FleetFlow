# FleetFlow AI Coding Assistant Instructions

## 🎯 Project Overview

**FleetFlow** is a digital logistics hub for fleet optimization and safety. It's a rule-based system that enforces business constraints before data writes, ensuring data integrity and compliance.

**Tech Stack:** Next.js 14 (T3 style) + Prisma SQLite + Zustand + Tailwind CSS

---

## 🏗️ Critical Architecture Patterns

### 1. **Rule-Based Hub: Validators Before Transactions**

All business logic is centralized in [lib/logic/validators.ts](lib/logic/validators.ts). **Validators run BEFORE database calls** to prevent invalid state:

- Trip assignment validation checks: cargo capacity, vehicle availability, driver license expiry, driver status
- Example: `validateTripAssignment()` returns `{ isValid, errors }` before the API route executes

**When adding features:** Write validator functions first, then use them in API routes.

### 2. **Atomic Transaction Pattern**

API routes use Prisma transactions to ensure atomic state changes:

```typescript
const trip = await prisma.$transaction(async (tx) => {
  const newTrip = await tx.trip.create({...});
  await tx.vehicle.update({...});
  await tx.driver.update({...});
  return newTrip;
});
```

**Why:** A trip dispatch must atomically update Trip + Vehicle + Driver. If only some succeed, data becomes inconsistent.

**Always use transactions** when modifying multiple related records (e.g., dispatch, vehicle maintenance with status changes).

### 3. **Client-Side State (Zustand)**

[useFleetStore.ts](lib/store/useFleetStore.ts) manages dashboard metrics:
- `activeTripCount`: incremented/decremented on trip lifecycle events
- `maintenanceAlerts`: updated when maintenance issues are detected

**Pattern:** Component calls store actions → triggers rerender across dashboard modules. Don't over-hydrate; only store frequently-changing metrics here.

### 4. **Modular Dashboard Structure**

```
src/app/(dashboard)/
  ├── layout.tsx              # Sidebar + main container
  ├── dashboard/page.tsx      # KPI overview
  ├── dispatch/page.tsx       # Trip assignment UI
  ├── drivers/page.tsx        # Driver registry
  ├── vehicles/page.tsx       # Vehicle inventory
  ├── maintenance/page.tsx    # Maintenance logs
  ├── expenses/page.tsx       # Fuel + cost tracking
  └── reports/page.tsx        # Analytics
```

Each module is independent; queries should be scoped to that page's data needs.

---

## 📋 Data Model Key Relationships

**Core Entities:**

- **User**: Role-based access (DISPATCHER, MANAGER, SAFETY_OFFICER, ANALYST)
- **Vehicle**: Status enum (AVAILABLE → ON_TRIP → IN_SHOP | RETIRED), capacity-driven constraints
- **Driver**: License management + safety scores (0-100)
- **Trip**: Joins Vehicle + Driver, tracks origin → destination + odometer deltas
- **MaintenanceLog / FuelLog**: Cost attribution per vehicle

**Critical Constraints:**
- Vehicle capacity must not be exceeded (checked in `validateTripAssignment`)
- Driver licenses must be valid (checked on dispatch)
- Only vehicles with status=AVAILABLE can be assigned

---

## 🔧 Developer Workflows

### Clone & Setup
```bash
npm install
npx prisma db push        # Sync schema to SQLite
npm run dev               # Start at http://localhost:3000
```

### Database
```bash
npm run db:studio         # Prisma GUI at http://localhost:5555
```

### Common Tasks
- **Add a new vehicle field:** Edit [schema.prisma](prisma/schema.prisma) → `prisma db push` → update validators if needed
- **New API endpoint:** Create in `src/app/api/[resource]/route.ts`, call validators first, use transactions
- **New dashboard page:** Create `src/app/(dashboard)/[feature]/page.tsx`, query only needed data

### Validation Pattern Example

When adding a new entity feature (e.g., vehicle inspections):
1. Extend [schema.prisma](prisma/schema.prisma) with `InspectionLog` model
2. Add validator in [validators.ts](lib/logic/validators.ts) (e.g., `validateInspection()`)
3. Create API route at `app/api/inspections/route.ts` that calls the validator
4. Use Zustand callback if dashboard alerts need updating

---

## 🎨 UI & Code Conventions

### Component Patterns
- **Server components** (default): Pages like `dashboard/page.tsx` are RSC
- **Client components** (`"use client"`): [Sidebar.tsx](components/layout/Sidebar.tsx) uses client hooks (`usePathname`)
- Sidebar navigation state reflects active route via `pathname`

### Styling
- **Tailwind classes:** Prefer semantic colors (blue-600, slate-50) for consistency
- **Icon library:** Lucide React (import from `lucide-react`)
- Responsive grid for tables: Use TanStack React Table with Tailwind

### Example: New feature card
```tsx
<div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
  <h3 className="text-lg font-bold text-slate-900">{title}</h3>
  <p className="text-sm text-slate-600 mt-2">{description}</p>
</div>
```

---

## 🚨 Common Pitfalls to Avoid

1. **Validator-less API calls:** Never create Trip/dispatch without `validateTripAssignment()`
2. **Missing transactions:** Avoid updating Vehicle + Driver separately; use `prisma.$transaction()`
3. **Orphaned UI updates:** If modifying trip status, ensure Zustand `incActiveTrips()` is called to keep dashboard in sync
4. **Role-based features without checks:** Routes that require MANAGER role need middleware or pre-fetch guards
5. **Overloading Zustand:** Only store metrics, not entity lists; use page-level queries instead

---

## 📁 File Reference

| Path | Purpose |
|------|---------|
| [schema.prisma](prisma/schema.prisma) | Data model & relationships |
| [lib/logic/validators.ts](lib/logic/validators.ts) | Business rule validation (single source of truth) |
| [lib/store/useFleetStore.ts](lib/store/useFleetStore.ts) | Global dashboard metrics |
| [app/api/dispatch/route.ts](src/app/api/dispatch/route.ts) | Trip dispatcher API (example of validator + transaction pattern) |
| [components/layout/Sidebar.tsx](src/components/layout/Sidebar.tsx) | Navigation & user profile |
| [tailwind.config.js](tailwind.config.js) | Design token definitions |

---

## ✅ Pre-Implementation Checklist

Before coding a new feature:

- [ ] Validator function written in `lib/logic/validators.ts`
- [ ] Prisma schema updated (if new entity/field)
- [ ] API route uses `prisma.$transaction()` for multi-record updates
- [ ] Zustand actions called if metrics change (activeTrips, maintenanceAlerts)
- [ ] Sidebar navigation updated if new dashboard module
- [ ] Tailwind + Lucide used for UI consistency
- [ ] Role-based access planned (if applicable)
