# Feature Specification: Mobile-First App Pages

**Feature Branch**: `001-app-pages-ui`  
**Created**: 2026-02-03  
**Status**: Draft  
**Input**: User description: "I am building a modern mobile first web app, I want it to look sleek, something that would stand out. Should have a home page, should have a bible reading page, should have a prayer page, should have a community page, should have a ABOUT US PAGE. no need to pull data from anything, the data should be mocked."

## Spec Kit Compatibility

- **Target**: GitHub Spec Kit (clear acceptance tests, test data, and scope). This spec includes required Spec Kit elements: purpose, user stories, acceptance criteria, edge cases, mock-data guidance, assumptions, dependencies, and measurable success criteria.
- **Acceptance Tests**: See “Acceptance Test Scripts” below — written as GIVEN/WHEN/THEN steps to map directly to Spec Kit automated or manual test cases.
- **Mock Data**: Mock-data guidance is included to allow easy creation of fixtures for storybook or spec-kit demos.
- **Out of Scope**: Authentication, backend persistence, third-party integrations (real push notifications, real calendar sync). These are intentionally mocked/session-scoped for demo purposes.

## Acceptance Test Scripts (for Spec Kit)

- Test 1 — Navigation: GIVEN the app loads, WHEN the user opens the Home page, THEN they can reach each page (Bible Reading, Prayer, Community, About Us) in ≤ 2 taps.
- Test 2 — Reading minimal view: GIVEN a Bible passage, WHEN opened, THEN only passage text + reference are visible and selecting a verse exposes contextual actions.
- Test 3 — Community member feed: GIVEN Member mock view, WHEN opening Community, THEN pinned items appear first and feed scrolls to show remaining mocked items without layout breaks.
- Test 4 — Admin push: GIVEN Admin mock view, WHEN Admin pushes a reading, THEN Members see a prioritized feed item with preview and reference for the session.
- Test 5 — Event RSVP: GIVEN an Event card, WHEN Member toggles RSVP, THEN RSVP state updates for the session and is visible in the event detail.
- Test 6 — Empty states: GIVEN no mock items for a page, WHEN the page opens, THEN a clear empty-state message is shown and layout remains intact.

Include these scripts as the Spec Kit test cases or convert to automated tests using your preferred test runner.

## Clarifications

### Session 2026-02-03

- Q: For reading and prayer pages, should the screen be minimal (only passage/prayer text and reference), with the action bar (share/comment/add-to-prayer) appearing only when the user selects verse(s) or prayer(s)? → A: Yes. Reading and prayer views must be visually clear and minimal: display only the passage/prayer text and its reference/address. The contextual action bar with user actions MUST appear only when the user selects verse(s) or prayer item(s). Actions may persist for the session only (mocked); no external persistence required.

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Home & Navigation (Priority: P1)

As a visitor, I want a sleek mobile-first home page with clear navigation so I can quickly understand the app and move to the other sections.

**Why this priority**: Home and navigation are the primary entry and must exist before any other page is usable.

**Independent Test**: Can be tested by loading the app, viewing the home page, and navigating to all other pages successfully.

**Acceptance Scenarios**:

1. **Given** a first-time visitor, **When** the app loads, **Then** a home page with mocked content and primary navigation is displayed.
2. **Given** the home page, **When** the visitor selects a navigation item, **Then** they are taken to the selected page without losing the ability to return home.

---

### User Story 2 - Bible Reading (Priority: P2)

As a visitor, I want a Bible reading page with mocked passages so I can read scripture without any external data source.

**Why this priority**: Scripture reading is a core value of the app and should be available early.

**Independent Test**: Can be tested by navigating to the Bible reading page and verifying mocked passages and basic reading controls are visible.

**Acceptance Scenarios**:

1. **Given** the Bible reading page **When** the visitor opens it **Then** a mocked passage is displayed along with its reference/address and basic passage metadata  

2. **Given** the Bible reading page **When** the visitor changes the mocked passage selection **Then** the displayed passage updates accordingly  

3. **Given** the Bible reading page **When** the visitor views a passage **Then** only the passage text and its reference/address are shown, with no additional UI chrome  

4. **Given** the Bible reading page **When** the visitor selects the full Bible reading option **Then** mocked content with 2 books, 2 chapters per book, and 2 verses per chapter is displayed for reading  

5. **Given** the Bible reading page with a passage displayed **When** the visitor selects one or more verses **Then** mocked options are presented (share, add comment, add to prayer, add to favorite) **And** the contextual action bar is visible only while one or more verses are selected  

6. **Given** one or more verses selected on the Bible reading page **When** the visitor clears the selection or navigates away from the passage **Then** the contextual action bar is dismissed  

7. **Given** one or more verses selected on the Bible reading page **When** the visitor chooses to share **Then** mocked share options for sharing the selected verses are presented  

8. **Given** one or more verses selected on the Bible reading page **When** the visitor adds them to prayer **Then** the verses are mocked as added to a prayer collection  

9. **Given** one or more verses selected on the Bible reading page **When** the visitor adds a personal comment **Then** the comment is mocked and persisted for the current page session  

10. **Given** verses with personal comments on the Bible reading page **When** the visitor opens the comments view **Then** the mocked comments are displayed alongside their associated verses  

11. **Given** verses with personal comments selected on the Bible reading page **When** the visitor chooses to share **Then** mocked share options include the ability to share verses together with their attached comments  

12. **Given** one or more verses selected on the Bible reading page **When** the visitor adds them to favorites **Then** the verses are mocked as added to a favorites collection  

**Future Enhancement**: Bible API integration to replace mocked data.


---

### User Story 3 - Prayer (Priority: P3)

As a visitor, I want a prayer page with mocked prayer items organized into focused sections so I can find, create, and intentionally engage with prayers.

**Why this priority**: Prayer is a key spiritual practice and should be accessible, discoverable, and supportive of focused prayer sessions.

**Independent Test**: Can be tested by navigating to the Prayer page and verifying each section and its interactions render and behave as described.

**Page Sections (required)**:

- **Prayers by Theme**: A browsable list grouped by themes (e.g., Gratitude, Healing, Guidance). Each theme shows a short list of mocked prayers and a link to view the full theme list.
- **My Prayers (User-Created)**: A list of prayers the user has created during the session. Each item shows an "answered" mark if the prayer was marked answered; items support create/edit/delete in-session (mocked persistence only).
- **World & Community Prayers**: A combined feed of worldly (global) and community-submitted mocked prayers separated into subsections with date/summary metadata.
- **Focus Prayer (Do Not Disturb)**: A focused view where the user can activate a timed prayer session. Activating focus uses an explicit two-thumb gesture (two-finger press) or dedicated UI control on a prayer item to start a configurable Do Not Disturb timer for the session. While active, non-essential UI and notifications are suppressed (mocked behavior).

**Acceptance Scenarios**:

1. **Given** the prayer page, **When** the visitor opens it, **Then** the page displays the four sections: Prayers by Theme, My Prayers, World & Community Prayers, and Focus Prayer.
2. **Given** Prayers by Theme, **When** the visitor selects a theme, **Then** a list of mocked prayers for that theme is shown and each item can be opened to view full content.
3. **Given** My Prayers, **When** the visitor creates a new prayer, **Then** the prayer appears in the My Prayers list for the session and can be edited or removed (mocked session persistence).
4. **Given** a user-created prayer in My Prayers, **When** the visitor marks it as answered, **Then** the item displays an "answered" mark and this state persists for the session.
5. **Given** World & Community Prayers, **When** the visitor opens an item, **Then** the prayer detail shows title, source (world/community), date, and full text with minimal UI.
6. **Given** any prayer item, **When** the visitor selects one or more items, **Then** a contextual action bar appears with actions (share, comment, add to collection) and MUST appear only while items are selected.
7. **Given** a prayer item, **When** the visitor initiates the two-thumb (two-finger) press or uses the Focus control, **Then** a Do Not Disturb focus timer starts (mocked), the UI enters a minimal focus state, and a visible countdown or indicator shows remaining focus time.
8. **Given** an active Focus session, **When** the configured timer ends or the user cancels, **Then** the UI exits focus mode and restores normal controls; focus state is session-only and mocked.
9. **Given** one or more prayers selected, **When** the visitor chooses to share or comment, **Then** mocked share/comment UIs are presented and any comments are persisted only for the current session.

**Notes / UX details**:

- The two-thumb gesture should be considered an accessibility-friendly alternative to an on-screen Focus button; both should be present in the design so users on non-touch devices can use Focus.
- All user-created content and state (created prayers, answered marks, comments, focus timers) are session-scoped and do not require backend persistence for this feature.

---

### User Story 4 - Community (Priority: P4)

As a member of a faith group (or an admin), I want a lightweight social experience for our church or youth group so we can share Bible texts, prayers, and events, coordinate activities, and keep the group engaged.

**Why this priority**: A focused community hub turns static content into ongoing shared practice and enables admins to guide reading and prayer rhythms for the group.

**Independent Test**: Can be tested by navigating to the Community page, switching between Member and Admin mock views, viewing feeds, opening event details, and triggering mocked admin actions (send text, pin item, create event).

**Roles**:

- **Member**: views the community feed, RSVPs to events, reads pushed Bible texts, views and filters prayers, posts comments (session-mocked), and toggles notification preferences.
- **Admin**: in addition to Member capabilities, can post group announcements, push Bible reading suggestions, create/edit/delete mocked events, pin/unpin items, and moderate (hide) items for the session.

**Core Features (mocked)**:

- Group feed: mixed stream of announcements, pushed Bible texts, prayers, and events.
- Admin push: admins can send a mocked Bible text (title + short passage) that appears as a prioritized feed item for members.
- Events: event cards with date/time, summary, RSVP mock, and a simple calendar integration view.
- Focused prayer posts: shareable prayer items that open minimal detail views (text + metadata).
- Pinned items: admins can pin important announcements or reading suggestions to the top of the feed.
- Moderation controls: admins can hide or mark items as removed (session-only effect).
- Member interactions: like, comment (session-only), RSVP, and save-to-collection (session-only).
- Filtering & search: filter the feed by type (Announcements, Readings, Prayers, Events) and search by keywords.
- Notification toggles: per-member mock preference to opt into push-like notices for admin pushes and events (mocked behavior).

**Acceptance Scenarios**:

1. **Given** the Community page, **When** a Member opens it, **Then** a mixed feed of mocked announcements, readings, prayers, and events is displayed with pinned items first.
2. **Given** the Community page and a long feed, **When** the Member scrolls, **Then** additional mocked items are visible without layout breaks and without visual corruption.
3. **Given** an Admin view, **When** the Admin pushes a Bible text, **Then** a prioritized feed item appears for Members during the session and shows the text preview and reference.
4. **Given** an Event card, **When** a Member opens it, **Then** the event detail shows title, date/time, location (mocked), description, and an RSVP control that toggles RSVP state for the session.
5. **Given** a prayer item in the feed, **When** a Member opens it, **Then** the prayer detail presents only text and metadata by default and contextual actions appear only when the Member selects the prayer item.
6. **Given** a pinned announcement, **When** a Member opens the page, **Then** pinned items appear at the top and are visually distinguished.
7. **Given** a comment or RSVP action, **When** a Member performs it, **Then** the action is mocked and visible only for the current session.
8. **Given** an Admin who moderates an item, **When** the Admin hides the item, **Then** the item is removed from the feed for the session and a dismiss/undo affordance is shown to the Admin.
9. **Given** feed filtering, **When** the Member selects a filter (e.g., Events), **Then** only items of that type are shown and the UI remains usable on small screens.
10. **Given** empty community content, **When** the feed has no items, **Then** a clear empty-state message is shown (for example, “No group activity yet — admins can post an announcement”).

**UX Notes**:

- The Community feed MUST be mobile-first and thumb-friendly; primary actions (RSVP, comment, save) should be reachable without complex gestures.
- Reading pushes from Admins should open the minimal reading view described in the Reading story: only passage text + reference by default; contextual actions appear on selection.
- Admin controls should be accessible via an Admin toggle or contextual menu and must not appear for Members.
- All community state (posts, RSVPs, comments, pinned/hidden status) is session-scoped and mocked; no backend persistence required for this feature.

**Metrics / Success Criteria**:

- Feed items render without layout shifts on mobile (visual sanity check).
- Admin push items are visible and prioritized in the Member feed during the session.
- Event RSVP toggles and pinned items function correctly in-session.

**Edge Cases**:

- Long event titles and descriptions must wrap and remain readable without horizontal scrolling.
- Rapid admin actions (push, pin, remove) must leave the feed in a consistent state and not duplicate items.
- When notifications are toggled off, the UI must not show notification banners for pushed items (mocked behavior).

**Mock Data Guidance**:

- Provide at least: 6 feed items (including 1 pinned announcement, 1 pushed reading, 2 prayers, 2 events) to test scrolling, filtering, and empty states.
- Provide an Admin mock view and a Member mock view for acceptance testing.

---

### User Story 5 - About Us (Priority: P5)

As a visitor, I want an About Us page with mocked mission and team content so I can understand the purpose of the app.

**Why this priority**: About Us is informative and supports trust but can follow core content pages.

**Independent Test**: Can be tested by navigating to About Us and confirming the mocked mission and team sections render.

**Acceptance Scenarios**:

1. **Given** the About Us page, **When** the visitor opens it, **Then** mocked mission and values content is displayed.
2. **Given** the About Us page, **When** the visitor views the team section, **Then** mocked team profiles are shown.

### Edge Cases

<!--
  NOTE: The items in this section document known and anticipated edge cases.
  Keep this list up to date as new behaviors or scenarios are discovered during design, implementation, and testing.
-->

- **Empty mocked content**: When any mocked content list (e.g., community posts, prayers, reading plans) is empty, the corresponding page MUST render a clear empty-state message (for example, “No items to show yet”) and MUST NOT show an error state, broken layout, or loading spinner.
- **Very small screens and long text**: On narrow mobile screens and for unusually long titles or body text, all text MUST wrap within the viewport and remain fully readable via vertical scrolling; horizontal scrolling for core content MUST NOT be required, and text MUST NOT be clipped or overlap other UI elements.
- **Rapid navigation between pages**: If the user taps navigation controls rapidly to switch between pages, the app MUST remain responsive, MUST render only the final selected page’s content (no mixed content from previous pages), and MUST NOT crash, freeze, or display obvious visual corruption (e.g., duplicated headers or overlapping sections).

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: The app MUST provide five pages: Home, Bible Reading, Prayer, Community, and About Us.
- **FR-002**: The app MUST provide clear primary navigation that reaches any page in one action from Home.
- **FR-003**: Each page MUST display mocked content without relying on external data sources.
- **FR-004**: The Bible Reading page MUST support switching between at least two mocked passages.
- **FR-005**: The Prayer page MUST show a list of mocked prayer items and a readable detail view.
- **FR-006**: The Community page MUST show a list of mocked updates or events.
- **FR-007**: The About Us page MUST present mocked mission/values and team sections.
- **FR-008**: The experience MUST be mobile-first with layouts usable on small screens.
- **FR-009**: The visual presentation MUST be sleek and distinctive while remaining readable.
- **FR-011**: The Community page MUST support role-based mock behaviors:
  - Admins can post announcements, push Bible readings, create and edit mocked events, pin/unpin items, and moderate (hide) items for the session.
  - Members can view the feed, RSVP to events, comment (session-only), like, save items to a session collection, and toggle notification preferences (mocked behavior).
- **FR-010**: The Bible reading and Prayer detail views MUST be minimal: display only the text content and its reference/address by default. Any additional action UI (contextual action bar with share/comment/add actions) MUST appear only when the user explicitly selects verse(s) or prayer item(s). Session-only mocked persistence is acceptable for comments or temporary collections.

### Key Entities *(include if feature involves data)*

- **Page**: Represents a top-level section (Home, Bible Reading, Prayer, Community, About Us).
- **Content Section**: A block of mocked content within a page (title, body text, optional media).
- **Bible Passage**: Mocked scripture content with reference and passage text.
- **Prayer Item**: Mocked prayer title and full text content.
- **Community Update**: Mocked community item with title, summary, and date.
- **Team Profile**: Mocked person profile with name, role, and short bio.

## Success Criteria *(mandatory)*

<!--
  NOTE: The success criteria below are defined as measurable, technology-agnostic outcomes.
-->

### Measurable Outcomes

- **SC-001**: 90% of test users can reach any page from Home in ≤ 2 taps within 10 seconds.
- **SC-002**: 90% of test users can locate the Bible Reading page and switch passages in under 30 seconds.
- **SC-003**: The app renders all five pages correctly on screens 360px wide without horizontal scrolling.
- **SC-004**: 90% of test users rate the design as “sleek and standout” on a post-test survey.

## Assumptions

- All content is mocked and provided within the app experience.
- No user authentication or backend data persistence is required. Any user-generated content (e.g., prayers, comments, selections) may exist only as mocked, non-persisted, session-scoped state within the app.
- The app targets modern mobile browsers and scales up for larger screens.

## Dependencies

- None.
