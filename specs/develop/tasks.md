# Tasks: Mobile-First App Pages

**Input**: Design documents from `/specs/develop/`  
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Included because the spec defines acceptance test scripts and the plan requires Jest/RTL + Playwright coverage.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Next.js static-export project tooling and baseline structure.

- [X] T001 Initialize Next.js 14 App Router TypeScript project in `package.json`
- [X] T002 Configure static export and PWA plugin in `next.config.ts`
- [X] T003 [P] Configure Tailwind theme + safe-area plugin in `tailwind.config.ts`
- [X] T004 [P] Configure TypeScript path aliases and strict options in `tsconfig.json`
- [X] T005 [P] Configure Jest + RTL environment in `jest.config.ts`
- [X] T006 [P] Configure Playwright test runner in `playwright.config.ts`
- [X] T007 Create source folder structure and route skeletons in `src/app/`
- [X] T008 [P] Add lint/format scripts for TS and Tailwind ordering in `package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared infrastructure required by all user stories.

**⚠️ CRITICAL**: No user story work begins before this phase is complete.

- [X] T009 Define shared TypeScript domain types from contracts in `src/types/bible.ts`
- [X] T010 [P] Define prayer domain types from contracts in `src/types/prayer.ts`
- [X] T011 [P] Define community domain types from contracts in `src/types/community.ts`
- [X] T012 [P] Define about domain types from contracts in `src/types/about.ts`
- [X] T013 Create JSON mock-data fixtures (passages/prayers/themes/feed/events/about) in `src/data/`
- [X] T014 Implement utility class merger helper in `src/lib/cn.ts`
- [X] T015 [P] Implement two-finger gesture utility in `src/lib/gesture.ts`
- [X] T016 Implement shared UI primitives (BottomSheet/Toast/EmptyState/PageTransition/Avatar) in `src/components/ui/`
- [X] T017 Implement persistent bottom navigation shell in `src/components/navigation/BottomNav.tsx`
- [X] T018 Wire root app layout with bottom nav and page transitions in `src/app/layout.tsx`
- [X] T019 Configure PWA manifest metadata and icons in `public/manifest.json`
- [X] T020 Add base accessibility and mobile defaults (focus-visible, touch targets, safe-area spacing) in `src/app/globals.css`

**Checkpoint**: Foundation complete — all user stories can now be implemented independently.

---

## Phase 3: User Story 1 - Home & Navigation (Priority: P1) 🎯 MVP

**Goal**: Deliver sleek home page and one-tap access to all pages.

**Independent Test**: Load app, verify home content, navigate to all pages and back home via bottom nav.

### Tests for User Story 1

- [ ] T021 [P] [US1] Add navigation acceptance test for all five tabs in `tests/e2e/us1-navigation.spec.ts`
- [ ] T022 [P] [US1] Add Home page component render test in `tests/unit/home-page.test.tsx`

### Implementation for User Story 1

- [ ] T023 [P] [US1] Implement hero section component in `src/components/home/HeroSection.tsx`
- [ ] T024 [P] [US1] Implement daily verse card component in `src/components/home/DailyVerseCard.tsx`
- [ ] T025 [P] [US1] Implement quick access cards component in `src/components/home/QuickAccessCards.tsx`
- [ ] T026 [P] [US1] Implement community spotlight component in `src/components/home/CommunitySpotlight.tsx`
- [ ] T027 [US1] Compose Home route with mocked content blocks in `src/app/page.tsx`
- [ ] T028 [US1] Ensure tab-to-route mapping and active-state behavior in `src/components/navigation/BottomNav.tsx`

**Checkpoint**: US1 is fully functional and demoable as MVP.

---

## Phase 4: User Story 2 - Bible Reading (Priority: P2)

**Goal**: Provide minimal reading view with passage switching, verse selection, contextual actions, comments, favorites.

**Independent Test**: Open Reading page, switch passages, select verses, use action bar actions, verify session-scoped comments/favorites.

### Tests for User Story 2

- [ ] T029 [P] [US2] Add Reading minimal-view acceptance test in `tests/e2e/us2-reading-minimal.spec.ts`
- [ ] T030 [P] [US2] Add verse selection and action bar behavior test in `tests/unit/reading-selection.test.tsx`
- [ ] T031 [P] [US2] Add comments and favorites session-state test in `tests/unit/reading-store.test.ts`

### Implementation for User Story 2

- [ ] T032 [P] [US2] Implement reading Zustand store for selection/comments/favorites in `src/stores/readingStore.ts`
- [ ] T033 [P] [US2] Implement verse selection hook in `src/hooks/useVerseSelection.ts`
- [ ] T034 [P] [US2] Implement passage picker component in `src/components/reading/PassagePicker.tsx`
- [ ] T035 [P] [US2] Implement verse item component with selectable state in `src/components/reading/VerseItem.tsx`
- [ ] T036 [P] [US2] Implement verse list component with outside-tap clear in `src/components/reading/VerseList.tsx`
- [ ] T037 [P] [US2] Implement contextual action bar (share/comment/prayer/favorite) in `src/components/reading/ContextualActionBar.tsx`
- [ ] T038 [US2] Implement mocked share bottom-sheet flow integration in `src/components/reading/ContextualActionBar.tsx`
- [ ] T039 [US2] Compose Reading route (quick-select + full-bible mode + comments view) in `src/app/reading/page.tsx`

**Checkpoint**: US2 works independently and preserves distraction-free reading behavior.

---

## Phase 5: User Story 3 - Prayer (Priority: P3)

**Goal**: Deliver themed prayers, My Prayers CRUD, world/community feed, focus prayer timer with gesture/button, and contextual actions.

**Independent Test**: Open Prayer page, use all four sections, create/edit/delete prayers, mark answered, start/cancel focus mode, verify selection action bar.

### Tests for User Story 3

- [ ] T040 [P] [US3] Add Prayer sections and interactions acceptance test in `tests/e2e/us3-prayer-sections.spec.ts`
- [ ] T041 [P] [US3] Add focus timer + UI suppression behavior test in `tests/e2e/us3-focus-mode.spec.ts`
- [ ] T042 [P] [US3] Add prayer store CRUD/answered/comment unit tests in `tests/unit/prayer-store.test.ts`

### Implementation for User Story 3

- [ ] T043 [P] [US3] Implement prayer Zustand store (my prayers/comments/focus) in `src/stores/prayerStore.ts`
- [ ] T044 [P] [US3] Implement focus timer hook in `src/hooks/useFocusTimer.ts`
- [ ] T045 [P] [US3] Implement themed prayers section component in `src/components/prayer/ThemeList.tsx`
- [ ] T046 [P] [US3] Implement My Prayers CRUD section component in `src/components/prayer/MyPrayers.tsx`
- [ ] T047 [P] [US3] Implement world/community prayers section component in `src/components/prayer/WorldCommunityPrayers.tsx`
- [ ] T048 [P] [US3] Implement Focus Prayer component with segmented duration picker in `src/components/prayer/FocusPrayer.tsx`
- [ ] T049 [P] [US3] Implement prayer contextual action bar component in `src/components/prayer/PrayerActionBar.tsx`
- [ ] T050 [US3] Integrate two-finger press detection into focus activation in `src/components/prayer/FocusPrayer.tsx`
- [ ] T051 [US3] Compose Prayer route with four required sections and minimal detail view in `src/app/prayer/page.tsx`

**Checkpoint**: US3 is independently functional with session-only focus and prayer workflows.

---

## Phase 6: User Story 4 - Community (Priority: P4)

**Goal**: Deliver role-based community feed (Member/Admin), pinned items, admin push/moderation, event RSVP, filter/search, and session interactions.

**Independent Test**: Switch roles, verify feed ordering, admin actions, member interactions, filters/search, and empty state behavior.

### Tests for User Story 4

- [ ] T052 [P] [US4] Add community member-feed acceptance test in `tests/e2e/us4-community-member.spec.ts`
- [ ] T053 [P] [US4] Add admin role actions acceptance test (push/pin/hide) in `tests/e2e/us4-community-admin.spec.ts`
- [ ] T054 [P] [US4] Add community store unit tests (RSVP/filter/moderation) in `tests/unit/community-store.test.ts`

### Implementation for User Story 4

- [ ] T055 [P] [US4] Implement community Zustand store (role/rsvp/comments/pins/hide/filter) in `src/stores/communityStore.ts`
- [ ] T056 [P] [US4] Implement feed filtering/search hook in `src/hooks/useFeedFilter.ts`
- [ ] T057 [P] [US4] Implement role toggle component in `src/components/community/RoleToggle.tsx`
- [ ] T058 [P] [US4] Implement feed filter/search controls component in `src/components/community/FeedFilter.tsx`
- [ ] T059 [P] [US4] Implement generic feed item renderer component in `src/components/community/FeedItem.tsx`
- [ ] T060 [P] [US4] Implement event card with RSVP controls in `src/components/community/EventCard.tsx`
- [ ] T061 [P] [US4] Implement admin toolbar actions component in `src/components/community/AdminToolbar.tsx`
- [ ] T062 [P] [US4] Implement feed list with pinned-first ordering and hidden-item handling in `src/components/community/FeedList.tsx`
- [ ] T063 [US4] Compose Community route with role-based UI and empty state in `src/app/community/page.tsx`
- [ ] T064 [US4] Connect reading push item navigation to minimal reading view in `src/app/community/page.tsx`

**Checkpoint**: US4 independently supports core faith-group social workflows.

---

## Phase 7: User Story 5 - About Us (Priority: P5)

**Goal**: Deliver mission, values, and team profile content with mocked data.

**Independent Test**: Open About page and verify mission text, three values, and four team profiles render on mobile and desktop.

### Tests for User Story 5

- [ ] T065 [P] [US5] Add About page render acceptance test in `tests/e2e/us5-about.spec.ts`

### Implementation for User Story 5

- [ ] T066 [P] [US5] Implement mission section component in `src/components/about/MissionSection.tsx`
- [ ] T067 [P] [US5] Implement values section component in `src/components/about/ValuesSection.tsx`
- [ ] T068 [P] [US5] Implement team section component in `src/components/about/TeamSection.tsx`
- [ ] T069 [US5] Compose About route with mission/values/team sections in `src/app/about/page.tsx`

**Checkpoint**: US5 is independently complete and testable.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final quality pass across all stories.

- [ ] T070 [P] Add empty-state fallback handling across page-level lists in `src/components/ui/EmptyState.tsx`
- [ ] T071 [P] Add accessibility assertions (contrast/focus/touch-target checks) in `tests/e2e/a11y.spec.ts`
- [ ] T072 Add performance budget checks for LCP/INP/CLS in `tests/e2e/perf-budget.spec.ts`
- [ ] T073 Run responsive text-wrapping and rapid-navigation smoke tests in `tests/e2e/smoke-mobile.spec.ts`
- [ ] T074 [P] Update implementation and run instructions in `README.md`
- [ ] T075 Validate `quickstart.md` end-to-end commands in `specs/develop/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Starts immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1 completion; blocks all user stories.
- **Phases 3–7 (User Stories)**: Depend on Phase 2 completion.
- **Phase 8 (Polish)**: Depends on completion of all selected user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2. No dependency on other stories.
- **US2 (P2)**: Starts after Phase 2. Can run in parallel with US1 if staffed.
- **US3 (P3)**: Starts after Phase 2. Can run in parallel with US1/US2.
- **US4 (P4)**: Starts after Phase 2. Can run in parallel with US1/US2/US3.
- **US5 (P5)**: Starts after Phase 2. Can run in parallel with other stories.

### Story Completion Order (Priority)

1. US1 (MVP): Home + Navigation
2. US2: Bible Reading
3. US3: Prayer
4. US4: Community
5. US5: About Us

---

## Parallel Execution Examples

### US1 Parallel Example

- T023, T024, T025, T026 can run in parallel (different component files).
- T021 and T022 can run in parallel with component work.

### US2 Parallel Example

- T032, T033, T034, T035, T036, T037 can run in parallel.
- T029, T030, T031 can run in parallel before or during implementation.

### US3 Parallel Example

- T043, T044, T045, T046, T047, T048, T049 can run in parallel.
- T040, T041, T042 can run in parallel.

### US4 Parallel Example

- T055, T056, T057, T058, T059, T060, T061, T062 can run in parallel.
- T052, T053, T054 can run in parallel.

### US5 Parallel Example

- T066, T067, T068 can run in parallel.
- T065 can run in parallel with implementation.

---

## Implementation Strategy

### MVP First (US1 only)

1. Complete Phase 1 + Phase 2.
2. Complete US1 tasks (T021–T028).
3. Validate navigation and home acceptance criteria.
4. Demo/deploy MVP increment.

### Incremental Delivery

1. Ship US1 → validate.
2. Add US2 → validate reading interactions.
3. Add US3 → validate prayer/focus flows.
4. Add US4 → validate community role workflows.
5. Add US5 → finalize informational page.
6. Execute Polish phase and release candidate checks.

### Completeness Validation

- Every user story has:
  - explicit independent test criteria,
  - dedicated acceptance/unit test tasks,
  - implementation tasks covering data, UI, and route integration.
- All tasks follow strict checklist format with Task ID, optional `[P]`, required story label for story phases, and explicit file path.
