# Ettinger Fitness Dashboard - Project Reference

## Quick Reference

| Item | Value |
|------|-------|
| **Root** | `~/Projects/ettinger-fitness` |
| **Production URL** | https://ettinger-fitness.vercel.app |
| **GitHub** | https://github.com/mettinger75/ettinger-fitness |
| **Supabase** | Project ID in `.env.local` (auth only, data in localStorage) |
| **Deploy** | `npx vercel --prod` |
| **Dev** | `npm run dev` → http://localhost:3000 |

---

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4 (CSS-first config via `@theme inline {}`)
- **State**: Zustand 5.0.11 with `persist` middleware (localStorage)
- **Charts**: Recharts 3.7.0
- **Icons**: Lucide React 0.563.0
- **Auth**: Supabase Auth (simple email/password, mostly demo)
- **Fonts**: Bebas Neue (display) + Outfit (body)

---

## Architecture

### Color Palette
- **Primary BG**: `#0F172A` (bg-primary)
- **Card BG**: `#1E293B` (bg-card)
- **Gold Accent**: `#D4A843` (gold)
- **Sidebar**: `#0F172A` (bg-sidebar)

### Layout
- Desktop: Fixed left sidebar (64px collapsed, 220px on hover)
- Mobile: Full overlay sidebar via hamburger menu
- Content area: Max-width container with responsive padding

### User System (5 Family Members)
```typescript
// lib/constants/users.ts
interface UserProfile {
  id: string;           // 'mark' | 'gena' | 'eli' | 'gavin' | 'savannah'
  name: string;
  role: 'parent' | 'child';
  avatar: string;       // Emoji
  age: number;
  bio: string;
  accentColor: string;  // Hex color for user's UI accent
  sports: string[];     // Controls sidebar nav visibility
  badges: string[];
  trackedActivities: string[];  // For activity logging
  goalCategories: string[];     // For goal creation
}
```

### Data Persistence
- **User settings**: `ettinger-active-user` (localStorage) - includes userOverrides
- **Fitness data**: `ettinger-fitness-data` (localStorage) - activities, meals, workouts, goals, metrics, games
- **Challenges**: `ettinger-challenges` (localStorage) - family challenges

### Key Store Pattern (Zustand + SSR)
```typescript
// CRITICAL: Use stable selector factories to avoid infinite loops
const EMPTY_ACTIVITIES: Activity[] = [];
export const selectActivities = (userId: string) =>
  (s: FitnessState) => s.activities[userId] ?? EMPTY_ACTIVITIES;

// Usage in components:
const activities = useFitnessStore(selectActivities(user.id));
```

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/dashboard` | Main dashboard with stats, charts, goals, activity |
| `/workouts` | AI workout generator (mock) |
| `/nutrition` | Meal logging, macro tracking |
| `/metrics` | Weight, body composition tracking |
| `/swimming` | Eli's swimming page (guarded) |
| `/basketball` | Gavin's basketball page (guarded) |
| `/goals` | Goal CRUD with progress tracking |
| `/family` | Family hub with challenges |
| `/profile` | User profile editor (NEW) |
| `/admin` | Admin panel (parent-only) |
| `/login` | Supabase auth login |

### Route Guards
- Sport-specific pages use `<SportGuard requiredSport="Swimming">`
- Admin uses `<SportGuard requiredRole="parent">`
- Guards check `user.sports.includes(sport)` or `user.role === role`

---

## Key Components

### Dashboard Components
- `StatsRow.tsx` - 4 stat cards with user-specific metrics, now clickable
- `WeeklyActivityChart.tsx` - Bar chart of weekly activity minutes
- `ActiveGoals.tsx` - Goal progress bars with links
- `RecentActivity.tsx` - Last 5 logged activities
- `RecentAchievements.tsx` - Auto-computed milestones

### UI Components
- `StatCard.tsx` - Now supports `href` and `onClick` props
- `Card.tsx` - Base card with optional `gold`, `hover`, `onClick`
- `Modal.tsx` - Accessible modal overlay
- `Button.tsx` - Primary/outline/ghost variants

### Layout Components
- `Sidebar.tsx` - Desktop nav with Profile link
- `MobileSidebar.tsx` - Mobile nav overlay
- `UserSelector.tsx` - Top-right user dropdown with "Edit Profile"
- `TopBar.tsx` - Mobile header with hamburger

---

## Recent Session Changes (Feb 7, 2025)

1. **StatCards clickable** - All dashboard stat cards link to relevant pages
2. **Dashboard cards clickable** - Headers link to detail pages with chevron indicators
3. **Profile page** (`/profile`) - Full user editor: name, age, bio, avatar, color, sports, activities, goals
4. **UserProfile extended** - Added `trackedActivities` and `goalCategories` fields
5. **User store refactored** - Uses `userOverrides` pattern for customizations
6. **Admin tools wired** - Add User (placeholder), System Settings (clear data)
7. **User table clickable** - Rows switch user + navigate to profile
8. **Family Challenge wired** - Full CRUD with localStorage persistence
9. **LogActivityModal** - Uses user's tracked activities from profile

---

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod

# Check for type errors
npm run build  # TypeScript runs during build

# View git history
git log --oneline -10
```

---

## File Structure (Key Files)

```
ettinger-fitness/
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   ├── dashboard/page.tsx  # Main dashboard
│   │   ├── profile/page.tsx    # NEW: User profile editor
│   │   ├── admin/page.tsx
│   │   ├── goals/page.tsx
│   │   └── ...
│   ├── globals.css             # Tailwind v4 theme + utilities
│   └── layout.tsx              # Root layout
├── components/
│   ├── dashboard/              # Dashboard-specific components
│   ├── layout/                 # Sidebar, TopBar, UserSelector
│   ├── ui/                     # Reusable UI primitives
│   ├── admin/                  # Admin components
│   ├── family/                 # Family hub components
│   └── guards/                 # SportGuard
├── lib/
│   ├── constants/users.ts      # User profiles + all options
│   ├── store/
│   │   ├── useUserStore.ts     # Active user + overrides
│   │   ├── useFitnessStore.ts  # All fitness data
│   │   └── useAppStore.ts      # App UI state
│   └── types/fitness.ts        # TypeScript interfaces
└── .env.local                  # Supabase credentials
```

---

## Known Issues / Future Work

1. **Swimming page** - Most fields still hardcoded, needs data model
2. **AI Workouts** - Generator is mock, could integrate real AI
3. **Add User** - Currently placeholder, would need Supabase integration
4. **Supabase sync** - All data is localStorage, could sync to Supabase
5. **Mobile responsiveness** - Could be improved in some areas

---

## Patterns to Remember

### Tailwind v4 CSS Layers
All custom styles must be in `@layer base {}` or `@layer utilities {}` to not override Tailwind utilities. Unlayered CSS has highest specificity in v4.

### Zustand Selectors
Never use `get()` inside selector functions. Always use stable empty array constants to prevent infinite re-renders with persist middleware.

### User-scoped Data
All fitness data is keyed by userId: `Record<string, T[]>`. Use selector factories: `selectActivities(userId)`.
