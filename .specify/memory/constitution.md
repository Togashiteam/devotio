<!-- Sync Impact Report
Version: 1.1.0 → 1.2.0
Modified Principles:
- VI. Visual Excellence (expanded to include reading focus requirements)
Added Principles:
- VII. Distraction-Free Reading
Removed Sections: None
Templates requiring updates:
- .specify/templates/plan-template.md ✅
- .specify/templates/spec-template.md ⚠ pending
- .specify/templates/tasks-template.md ⚠ pending
Deferred TODOs:
- None
-->

# Devotio Constitution

## Core Principles

### I. Mobile-First by Default
All screens and flows MUST be designed for small viewports first, with primary
actions reachable in thumb-friendly zones. Larger breakpoints MAY enhance
layout but MUST NOT replace or hide core functionality. Rationale: the product
is mobile-first, and mobile usability defines the experience baseline.

### II. Reactive UI
State changes MUST automatically update the UI through the chosen framework’s
reactive patterns. Direct DOM manipulation outside those patterns MUST NOT be
used. Rationale: predictable state flow prevents UI drift and regressions.

### III. Native-Like UX
Touch targets MUST be at least 44×44 CSS pixels, transitions MUST be smooth,
and critical flows MUST remain responsive under low connectivity. Rationale:
app-like responsiveness builds trust and keeps the experience frictionless.

### IV. Performance Budget
The app MUST meet a lightweight performance budget: fast first load, smooth
interactions, and minimal main-thread blocking work. Targets SHOULD include
LCP ≤ 2.5s on mobile-class devices and INP ≤ 200ms for primary interactions.
Rationale: performance is a core UX feature.

### V. Accessibility Baseline
The app MUST meet WCAG 2.1 AA for contrast, focus visibility, semantic
structure, and keyboard navigation. Rationale: accessibility is a baseline
requirement, not an enhancement.

### VI. Visual Excellence
The UI MUST use a cohesive visual system (typography, spacing, color, and
motion) that feels sleek and distinctive without sacrificing clarity. Visual
polish MUST be validated against real content on mobile screens. Rationale:
the product must stand out while remaining readable and calm.

### VII. Distraction-Free Reading
Reading and prayer detail views MUST prioritize clarity: by default they MUST
display only the content text and a concise reference/address. Supplementary
UI chrome (navigation, metadata, persistent action bars) MUST be hidden or
minimized while in focus mode. Contextual actions (share, comment, add-to-
prayer/collection) MUST appear only when the user explicitly selects text or
items. Rationale: focused reading requires minimal visual noise to support
contemplation and comprehension.

## Minimum Technical Requirements

- Responsive layout with mobile-first breakpoints.
- Reactive state management with predictable updates.
- PWA-ready: installable, offline shell, and caching strategy.
- Secure by default: HTTPS-only, no secrets in client.
- Reading/detail screens MUST support a focus/minimal mode and a contextual
  action mechanism triggered by explicit selection gestures.

## Development Workflow

- PRs require review and basic lint + test pass.
- Feature work includes at least one UI test or acceptance check.
- Performance, accessibility, and visual-focus checks run before release.

## Governance
This constitution supersedes all other practices.

Amendments MUST include documented rationale, impact summary, and approval from
project maintainers. Versioning follows semantic versioning: MAJOR for
backward-incompatible governance changes, MINOR for new or materially expanded
principles/sections, PATCH for clarifications and non-semantic edits.

Compliance review is REQUIRED for each feature spec and before release to
verify adherence to core principles and minimum technical requirements.

**Version**: 1.2.0 | **Ratified**: 2026-02-03 | **Last Amended**: 2026-02-03
