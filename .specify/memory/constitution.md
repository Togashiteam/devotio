<!-- Sync Impact Report
Version: 1.0.0 → 1.1.0
Modified Principles:
- I. Mobile-First by Default (clarified requirements)
- II. Reactive UI (clarified requirements)
- III. Native-Like UX (clarified requirements)
- IV. Performance Budget (clarified requirements)
- V. Accessibility Baseline (clarified requirements)
Added Sections:
- VI. Visual Excellence
Removed Sections: None
Templates requiring updates:
- .specify/templates/plan-template.md ✅
- .specify/templates/spec-template.md ✅
- .specify/templates/tasks-template.md ✅
Deferred TODOs:
- TODO(MISSING_PAGE): user request truncated after "should have a"
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
interactions, and minimal main-thread blocking work. Targets MUST include
$\text{LCP} \le 2.5\,\text{s}$ on mobile-class devices and $\text{INP} \le 200\,\text{ms}$
for primary interactions. Rationale: performance is a core UX feature.

### V. Accessibility Baseline
The app MUST meet WCAG 2.1 AA for contrast, focus visibility, semantic
structure, and keyboard navigation. Rationale: accessibility is a baseline
requirement, not an enhancement.

### VI. Visual Excellence
The UI MUST use a cohesive visual system (typography, spacing, color, and
motion) that feels sleek and distinctive without sacrificing clarity. Visual
polish MUST be validated against real content on mobile screens. Rationale:
the product must stand out while remaining readable and calm.

## Minimum Technical Requirements

- Responsive layout with mobile-first breakpoints.
- Reactive state management with predictable updates.
- Primary navigation MUST include Home, Bible Reading, Prayer, Community, and
	TODO(MISSING_PAGE): user request truncated after "should have a".
- PWA-ready: installable, offline shell, and caching strategy.
- Secure by default: HTTPS-only, no secrets in client.

## Development Workflow

- PRs require review and basic lint + test pass.
- Feature work includes at least one UI test or acceptance check.
- Performance and accessibility checks run before release.
- Visual review against the design system is required before release.

## Governance
This constitution supersedes all other practices.

Amendments MUST include documented rationale, impact summary, and approval from
project maintainers. Versioning follows semantic versioning: MAJOR for
backward-incompatible governance changes, MINOR for new or materially expanded
principles/sections, PATCH for clarifications and non-semantic edits.

Compliance review is REQUIRED for each feature spec and before release to
verify adherence to core principles and minimum technical requirements.

**Version**: 1.1.0 | **Ratified**: 2026-02-03 | **Last Amended**: 2026-02-03
