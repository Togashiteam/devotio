# Quickstart: Devotio — Mobile-First App Pages

**Date**: 2026-02-18  
**Branch**: `001-app-pages-ui`  
**Stack**: Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Zustand

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 20 LTS | [nodejs.org](https://nodejs.org) |
| npm | 10+ | bundled with Node |
| Git | any | [git-scm.com](https://git-scm.com) |

---

## 1. Bootstrap the Project

From the repo root:

```bash
npx create-next-app@14 . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

> If the repo already has files, run `create-next-app` in a temporary folder and copy the generated config files (`next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `.eslintrc.json`, `package.json`).

---

## 2. Install Dependencies

```bash
npm install framer-motion zustand lucide-react clsx tailwind-merge
npm install @ducanh2912/next-pwa
npm install -D tailwindcss-safe-area prettier prettier-plugin-tailwindcss
npm install -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom ts-jest
npm install -D @playwright/test @axe-core/playwright
```

---

## 3. Configure Next.js for Static Export + PWA

`next.config.ts`:

```ts
import withPWA from '@ducanh2912/next-pwa';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
};

export default withPWA(nextConfig);
```

---

## 4. Configure Tailwind

`tailwind.config.ts` — add safe-area plugin and custom theme tokens:

```ts
import type { Config } from 'tailwindcss';
import safeArea from 'tailwindcss-safe-area';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1a1a2e',  // deep navy — primary background
          accent: '#e94560',   // coral — primary action
          muted: '#16213e',    // subtle surface
          gold: '#f5a623',     // scripture gold highlight
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'], // for passage text
      },
    },
  },
  plugins: [safeArea],
};

export default config;
```

---

## 5. Project Structure Setup

Create the directory skeleton:

```bash
mkdir -p src/{app/{reading,prayer,community,about},components/{navigation,home,reading,prayer,community,about,ui},data,stores,hooks,types,lib}
mkdir -p tests/{unit,e2e}
mkdir -p public/icons public/avatars
```

---

## 6. Create the PWA Manifest

`public/manifest.json`:

```json
{
  "name": "Devotio",
  "short_name": "Devotio",
  "description": "Your daily space for Scripture, Prayer, and Community",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a2e",
  "theme_color": "#1a1a2e",
  "orientation": "portrait",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## 7. Populate Mock JSON Data

Copy the following files into `src/data/` (full content in [data-model.md](./data-model.md)):

| File | Min items |
|------|-----------|
| `passages.json` | 2 quick-select passages + 2 books (Genesis, Psalms) |
| `prayers.json` | 4 themes × 3 prayers + 3 world + 2 community |
| `themes.json` | 4 themes (Gratitude, Healing, Guidance, Peace) |
| `community-feed.json` | 6 items: 1 pinned announcement, 1 reading, 2 prayers, 2 events |
| `events.json` | 2 detailed events |
| `about.json` | 1 mission, 3 values, 4 team profiles |

---

## 8. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — resize browser to 375 px width to preview mobile layout.

---

## 9. Run Tests

```bash
# Unit + component tests
npm test

# E2E acceptance tests (Spec Kit T1–T6)
npx playwright test

# Accessibility audit
npx playwright test --grep @a11y
```

---

## 10. Build & Export Static Site

```bash
npm run build
```

Output is written to `out/`. Deploy the `out/` directory to any static host (Vercel, GitHub Pages, Netlify).

To preview the static output locally:

```bash
npx serve out
```

---

## 11. Verify Performance Budget

After building:

```bash
# Lighthouse CI (install once: npm install -g @lhci/cli)
lhci autorun --collect.url=http://localhost:3000 --assert.preset=lighthouse:recommended
```

Targets: LCP ≤ 2.5 s · INP ≤ 200 ms · CLS < 0.1

---

## Implementation Order (aligned with user story priorities)

1. **P1 – Root layout + BottomNav + Home page** — validates navigation (Spec Kit T1)
2. **P2 – Bible Reading page** — passages, verse selection, action bar (Spec Kit T2)
3. **P3 – Prayer page** — four sections, focus mode, action bar
4. **P4 – Community page** — feed, roles, events, filtering (Spec Kit T3–T5)
5. **P5 – About Us page** — mission, values, team
6. **Cross-cutting** — empty states, PWA manifest, E2E tests T1–T6, Lighthouse audit

See `specs/001-app-pages-ui/tasks.md` (generated by `/speckit.tasks`) for granular task breakdown.
