# Phase 0 Research: Mobile-First App Pages

**Date**: 2026-02-18  
**Plan**: [plan.md](../develop/plan.md)

All NEEDS CLARIFICATION items from the Technical Context are resolved below.

---

## 1. Next.js Static Export with App Router

**Decision**: Use Next.js 14 App Router with `output: 'export'` in `next.config.ts`.

**Rationale**: Static export produces pure HTML/CSS/JS with no Node.js server at runtime. All pages become pre-rendered HTML at build time. JSON mock data is imported directly into page components — no `fetch()` calls needed, no API routes. This satisfies the "no backend" constraint and enables simple CDN/GitHub Pages deployment.

**Key constraints of static export**:
- No server-side runtime features: no `cookies()`, `headers()`, or `redirect()` in Server Components at request time.
- Dynamic routes (e.g., `/reading/[book]`) require `generateStaticParams()` — not needed here since we have fixed pages.
- Image Optimization: must set `images: { unoptimized: true }` or use Cloudinary/external CDN. For a prototype, `unoptimized: true` is acceptable.

**Alternatives considered**:
- *Next.js with server runtime*: rejected — no backend needed and adds deployment complexity.
- *Vite + React SPA*: viable but lacks built-in routing, PWA helpers, and the Vercel ecosystem; Next.js is more complete out of the box.
- *Remix*: server-first; less optimal for a true static output with no backend.

---

## 2. Tailwind CSS — Mobile-First Configuration

**Decision**: Use Tailwind CSS 3 with a custom theme extending the default config. Apply `sm:`, `md:`, `lg:` breakpoints above the mobile base — never use them for mobile-specific styles.

**Mobile-first patterns applied**:
- Bottom navigation bar: `fixed bottom-0 left-0 right-0` with `safe-area-inset-bottom` padding for iOS notch support via `pb-safe` (Tailwind plugin `tailwindcss-safe-area`).
- Touch targets: all interactive elements use `min-h-[44px] min-w-[44px]`.
- Font scale: base size 16 px (prevents iOS auto-zoom on inputs).
- Max content width: `max-w-2xl mx-auto` on desktop, full-width on mobile.

**Alternatives considered**:
- *CSS Modules*: more verbose, no utility-first mobile-first default.
- *styled-components*: runtime CSS-in-JS adds JS bundle overhead; conflicts with Performance Budget.
- *Chakra UI*: component library adds bundle weight and opinion on component APIs; Tailwind is more flexible for a custom sleek visual design.

---

## 3. Framer Motion — Page Transitions & Micro-interactions

**Decision**: Use Framer Motion 11 for page-level slide transitions and component-level entrance animations (fade-in, spring pop for action bars).

**Patterns**:
- Wrap each page in `<motion.div>` with `initial={{ opacity: 0, y: 12 }}` / `animate={{ opacity: 1, y: 0 }}` / `exit={{ opacity: 0, y: -12 }}` and `transition={{ duration: 0.2, ease: 'easeOut' }}`. Keep under 200 ms to respect INP budget.
- Contextual action bar: `AnimatePresence` + slide-up from bottom (`y: 60` → `y: 0`).
- Focus prayer timer: `motion.div` with `animate={{ scale: [1, 1.02, 1] }}` pulse on countdown ticks.
- Avoid heavy physics simulations (springs with low stiffness) on scroll — they can block the main thread.

**Alternatives considered**:
- *CSS transitions only*: sufficient for simple cases but lacks `AnimatePresence` for unmount animations (needed for contextual action bar dismiss).
- *React Spring*: similar API, slightly larger bundle; Framer Motion 11 tree-shakes well.

---

## 4. Zustand — Session-Scoped State

**Decision**: Use Zustand 4 with separate stores per domain: `readingStore`, `prayerStore`, `communityStore`. Stores are in-memory only — no `persist` middleware — so state resets on reload exactly as specified.

**Store pattern**:
```ts
// Example: readingStore
interface ReadingStore {
  selectedVerseIds: string[];
  comments: Record<string, string[]>; // verseId → comment texts
  favorites: string[];                 // verseIds
  selectVerse: (id: string) => void;
  deselectVerse: (id: string) => void;
  clearSelection: () => void;
  addComment: (verseId: string, text: string) => void;
  addFavorite: (verseId: string) => void;
}
```

**Why Zustand over alternatives**:
- *React Context*: fine for simple cases but causes full subtree re-renders on any state change — problematic for the verse list with many items.
- *Redux Toolkit*: overkill for session-scoped prototype state; significant boilerplate.
- *Jotai*: equally lightweight but Zustand's slice pattern maps more cleanly to our domain boundaries.

---

## 5. PWA Setup with next-pwa

**Decision**: Use `@ducanh2912/next-pwa` (actively maintained fork of `next-pwa`) for service worker generation and PWA manifest wiring.

**Configuration**:
- `dest: 'public'` — generates `sw.js` and `workbox-*.js` into `/public`.
- Cache strategy: **StaleWhileRevalidate** for static assets; **CacheFirst** for JSON data files and images.
- `manifest.json`: `display: 'standalone'`, `theme_color` matching app primary color, icons at 192×192 and 512×512.
- `start_url: '/'`, `scope: '/'`.

**Offline behavior**: App shell (layout, navigation) loads from cache. Page content (imported from JSON at build) is baked into the JS bundle — no network fetch needed, so offline reading/prayer/community all work by default.

**Alternatives considered**:
- *Manual service worker*: full control but high maintenance; next-pwa's Workbox integration is sufficient for this scope.
- *Vite PWA plugin*: not applicable since we chose Next.js.

---

## 6. Two-Finger Press Gesture (Focus Prayer)

**Decision**: Implement via `touchstart` event listener checking `event.touches.length >= 2` with a 300 ms hold threshold. Provide an explicit **Focus** button alongside for non-touch and accessibility.

**Implementation sketch** (`src/lib/gesture.ts`):
```ts
export function onTwoFingerPress(element: HTMLElement, callback: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  element.addEventListener('touchstart', (e) => {
    if (e.touches.length >= 2) timer = setTimeout(callback, 300);
  });
  element.addEventListener('touchend', () => clearTimeout(timer));
  element.addEventListener('touchcancel', () => clearTimeout(timer));
}
```

The `useFocusTimer` hook wraps this with a `useEffect` and falls back gracefully to the button for pointer devices.

**Accessibility note**: The gesture is additive — the on-screen Focus button is always visible, satisfying WCAG 2.1 success criterion 2.5.1 (Pointer Gestures) and the constitution's accessibility requirement.

---

## 7. Verse / Prayer Item Selection UX

**Decision**: Single-tap toggles selection state. Multi-select supported. Tap outside (the surrounding `<section>` padding) fires a `clearSelection`. Keyboard: `Space`/`Enter` on a focused verse item toggles selection; `Escape` clears all.

**Implementation**: `useVerseSelection` hook stores a `Set<string>` of selected IDs in `readingStore`. The `VerseItem` component reads `isSelected` from the store and applies a Tailwind highlight class + `aria-pressed` attribute.

---

## 8. JSON Data Strategy

**Decision**: All JSON files live in `src/data/` and are imported as ES modules at build time. Next.js static export inlines them into the JavaScript bundle.

**Files**:
| File | Contents |
|------|----------|
| `passages.json` | 2 quick-select passages + full Bible mock (Genesis, Psalms — 2 books × 2 chapters × 2 verses) |
| `prayers.json` | 4 themes × 3 prayers each + 3 world prayers + 2 community prayers |
| `themes.json` | Theme metadata (id, label, description) |
| `community-feed.json` | 6 feed items: 1 pinned announcement, 1 pushed reading, 2 prayer posts, 2 events |
| `events.json` | 2 event details with date/time, location, description |
| `about.json` | Mission text, 3 values, 4 team profiles |

**No lazy loading needed** — JSON is small enough to bundle inline without exceeding performance budget.

---

## 9. Accessibility Strategy

**Decision**: Semantic HTML throughout (`<nav>`, `<main>`, `<article>`, `<section>`, `<button>`). Focus management: when contextual action bar appears, focus moves to the first action button; when dismissed, focus returns to the triggering verse. Colour contrast validated against WCAG 2.1 AA by using Tailwind's built-in palette at tested contrast ratios. Playwright `@axe-core/playwright` plugin runs in E2E suite.

---

## 10. Testing Strategy

| Layer | Tool | Coverage target |
|-------|------|----------------|
| Unit/Component | Jest + React Testing Library | Core interactive components (VerseItem, FocusPrayer, FeedItem, ContextualActionBar) |
| E2E Acceptance | Playwright | Spec Kit tests T1–T6 verbatim as test scripts |
| Accessibility | axe-core via Playwright | All 5 pages, automated on CI |
| Visual regression | Playwright screenshots (optional) | Home, Bible Reading, Community on 375 px viewport |

---

## Resolved NEEDS CLARIFICATION Summary

| Item | Resolution |
|------|-----------|
| Nav pattern | Bottom tab bar, 5 tabs, `fixed bottom-0`, `safe-area-inset-bottom` |
| Home content | Hero + Daily Verse + 3 quick-access cards + Community Spotlight |
| Focus timer options | 5 / 10 / 15 / 30 / 60 min segmented picker; default 10 min |
| Verse selection | Single tap; multi-select; tap-outside clears; Space/Enter/Escape keyboard |
| Role switching | Pill toggle in Community header; session-only; no auth |
| Share mock | Bottom sheet with Copy + 3 icon targets + toast confirmation |
| Quick-select passages | John 3:16–17 and Psalm 23:1–3 |
| Full Bible mock | Genesis + Psalms, 2 chapters each, 2 verses per chapter |
| Passage metadata | Book name + chapter/verse range + translation label |
| Focus mode suppression | Hides bottom nav, action bars, toast banners; restored on cancel/end |
| Session scope | Resets on reload/tab close only; navigation within tab preserves state |
| About content | Mission + 3 values + 4 team profiles |
| Prayers by Theme | 4 themes, 3 prayers each, "See all" link |
