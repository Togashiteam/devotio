# Feature Specification: Mobile-First App Pages

**Feature Branch**: `001-app-pages-ui`  
**Created**: 2026-02-03  
**Status**: Ready  
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

### Session 2026-02-18 — Open Questions Resolved

- Q: What navigation pattern should the app use? → A: A persistent **bottom navigation bar** with five icon-labeled tabs (Home, Read, Pray, Community, About). Keeps all pages reachable in one tap and sits in the thumb-friendly zone on all mobile screen sizes. Active tab is visually highlighted.

- Q: What mocked content should the Home page display? → A: The Home page MUST display: (1) a hero section with the app name ("Devotio"), a short tagline (e.g., "Your daily space for Scripture, Prayer, and Community"), and a full-bleed background image; (2) a "Daily Verse" card showing one mocked Bible verse with reference; (3) three quick-access cards linking to Bible Reading, Prayer, and Community; and (4) a "Community Spotlight" preview card with one mocked recent announcement.

- Q: What are the default and configurable options for the Focus Prayer timer? → A: Default duration is **10 minutes**. The user may choose from preset options: 5, 10, 15, 30, and 60 minutes, presented as a segmented picker before the session starts. Free-form entry is not required for this feature.

- Q: How does a user select a verse on the Bible Reading page? → A: A **single tap** on a verse highlights it. Tapping an additional verse adds it to the selection (multi-select). Tapping a selected verse deselects it. Tapping anywhere outside the verse list clears all selections and dismisses the contextual action bar.

- Q: How does the user switch between Member and Admin mock views in the Community page? → A: A **role toggle** is displayed in the Community page header (e.g., a pill labelled "Member / Admin"). Tapping it switches the active mock role for the session. This toggle is visible only for demo purposes and does not represent real authentication.

- Q: What does a mocked "share" action look like? → A: Tapping Share opens a **bottom sheet** with: (1) a "Copy text" option that shows a success toast ("Copied!"); and (2) three mocked share targets as icon buttons (WhatsApp, Email, Link) each showing a mocked confirmation toast ("Shared via [target]"). No real sharing or system share sheet is triggered.

- Q: Which specific passages are used for the Bible Reading quick-select? → A: The two default quick-select passages are **John 3:16–17** and **Psalm 23:1–3**. The full Bible reading mode uses two mocked books: **Genesis** (chapters 1–2, two verses each) and **Psalms** (chapters 1–2, two verses each).

- Q: What does "basic passage metadata" mean on the Bible Reading page? → A: Metadata MUST include: **book name**, **chapter and verse range** (e.g., "John 3:16–17"), and a brief **translation label** ("Mocked – Standard Version"). No further metadata (cross-references, author dates) is required for this feature.

- Q: What exactly is suppressed during Focus Prayer mode? → A: The bottom navigation bar, persistent action bars, and notification/toast banners MUST be hidden. The visible UI is reduced to prayer text, remaining time, and a "Cancel" control. All suppressed elements are restored immediately on session end or cancel.

- Q: When does session scope reset? → A: Session state resets on **page reload or browser tab close**. Navigating between pages within the same tab MUST NOT reset state — comments, favorites, prayer lists, RSVP states, and focus history persist across in-app navigation for the duration of the browser session.

- Q: How many mocked team profiles appear on About Us, and what values sections are required? → A: The About Us page MUST include: a **Mission section** (2–3 sentences of mocked text), a **Values section** (three values each with a short label and one-sentence description — e.g., Scripture, Community, Prayer), and a **Team section** with **four mocked profiles** (name, role title, one-sentence bio, placeholder avatar).

- Q: How many items should appear in Prayers by Theme, and which themes? → A: The section MUST include at least **four themes**: Gratitude, Healing, Guidance, and Peace. Each theme MUST show a preview of **three mocked prayers** inline, with a "See all" link that expands or navigates to the full list for that theme.

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

#### Core App Structure

- **FR-001**: The app MUST provide five pages: Home, Bible Reading, Prayer, Community, and About Us.
- **FR-002**: The app MUST provide clear primary navigation that reaches any page in one action from Home.
- **FR-003**: Each page MUST display mocked content without relying on external data sources.
- **FR-004**: The experience MUST be mobile-first with layouts usable on small screens (≥360px width) without horizontal scrolling.
- **FR-005**: The visual presentation MUST be sleek and distinctive while remaining readable.

#### Home Page

- **FR-006**: The Home page MUST display mocked content introducing the app purpose.
- **FR-007**: The Home page MUST provide navigation controls to reach all other pages (Bible Reading, Prayer, Community, About Us).

#### Bible Reading Page

- **FR-008**: The Bible Reading page MUST support switching between at least two mocked passages.
- **FR-009**: The Bible Reading page MUST display passage text with its reference/address and basic metadata.
- **FR-010**: The Bible Reading page MUST support a full Bible reading mode with mocked content (≥2 books, ≥2 chapters per book, ≥2 verses per chapter).
- **FR-011**: The Bible Reading page MUST allow verse selection and display a contextual action bar ONLY when one or more verses are selected.
- **FR-012**: The contextual action bar for verses MUST provide mocked actions: share, add comment, add to prayer, add to favorite.
- **FR-013**: The Bible Reading page MUST dismiss the contextual action bar when the user clears selection or navigates away.
- **FR-014**: The Bible Reading page MUST support mocked session-scoped comments on verses with a view to display comments alongside their verses.
- **FR-015**: The Bible Reading page MUST support sharing verses with their attached comments.
- **FR-016**: The Bible Reading page MUST support mocked session-scoped favorites collection.
- **FR-017**: Bible passage detail views MUST be minimal by default: only passage text and reference/address are visible; no persistent UI chrome.

#### Prayer Page

- **FR-018**: The Prayer page MUST display four sections: Prayers by Theme, My Prayers, World & Community Prayers, and Focus Prayer.
- **FR-019**: Prayers by Theme MUST show a browsable list grouped by themes (e.g., Gratitude, Healing, Guidance) with links to view full theme lists.
- **FR-020**: My Prayers MUST support creating, editing, and deleting user prayers with session-scoped mocked persistence.
- **FR-021**: My Prayers MUST allow marking prayers as "answered" with an answered indicator that persists for the session.
- **FR-022**: World & Community Prayers MUST display a combined feed of global and community-submitted mocked prayers separated into subsections with date/summary metadata.
- **FR-023**: Focus Prayer MUST support activating a Do Not Disturb timed prayer session via two-thumb gesture (two-finger press) OR a dedicated UI control.
- **FR-024**: Focus Prayer MUST display a configurable timer with visible countdown/indicator during an active focus session.
- **FR-025**: Focus Prayer MUST suppress non-essential UI and notifications (mocked behavior) while active and restore normal controls when the timer ends or the user cancels.
- **FR-026**: Prayer detail views MUST be minimal by default: only prayer text and metadata are visible.
- **FR-027**: Prayer items MUST support selection with a contextual action bar (share, comment, add to collection) that appears ONLY when one or more items are selected.
- **FR-028**: All prayer state (created prayers, answered marks, comments, focus timers) MUST be session-scoped and mocked; no backend persistence required.

#### Community Page

- **FR-029**: The Community page MUST support two roles: Member and Admin, with distinct mock behaviors.
- **FR-030**: Members MUST be able to view the community feed, RSVP to events, read pushed Bible texts, view and filter prayers, post comments (session-mocked), and toggle notification preferences.
- **FR-031**: Admins MUST be able to perform all Member actions PLUS post announcements, push Bible reading suggestions, create/edit/delete mocked events, pin/unpin items, and moderate (hide) items for the session.
- **FR-032**: The Community feed MUST display a mixed stream of announcements, pushed Bible texts, prayers, and events with pinned items appearing first.
- **FR-033**: Admin push (Bible text) MUST create a prioritized feed item for Members showing text preview and reference during the session.
- **FR-034**: Event cards MUST display date/time, summary, location (mocked), description, and an RSVP control that toggles state for the session.
- **FR-035**: Prayer posts in the Community feed MUST open minimal detail views (text + metadata) with contextual actions appearing only on selection.
- **FR-036**: Admin controls (post, push, pin, moderate) MUST be accessible via an Admin toggle or contextual menu and MUST NOT appear for Members.
- **FR-037**: The Community page MUST support filtering the feed by type (Announcements, Readings, Prayers, Events) and searching by keywords.
- **FR-038**: Member interactions (like, comment, RSVP, save-to-collection) MUST be session-scoped and mocked.
- **FR-039**: Notification toggles MUST allow Members to opt into mocked push-like notices for admin pushes and events.
- **FR-040**: The Community feed MUST be mobile-first and thumb-friendly with primary actions reachable without complex gestures.
- **FR-041**: All Community state (posts, RSVPs, comments, pinned/hidden status) MUST be session-scoped and mocked; no backend persistence required.

#### About Us Page

- **FR-042**: The About Us page MUST present mocked mission/values content.
- **FR-043**: The About Us page MUST display mocked team profiles with name, role, and short bio.

#### Cross-Cutting Requirements

- **FR-044**: Empty state for any content list (community posts, prayers, reading plans) MUST render a clear message (e.g., "No items to show yet") without showing errors, broken layouts, or loading spinners.
- **FR-045**: All text content MUST wrap within the viewport on narrow mobile screens and remain fully readable via vertical scrolling; horizontal scrolling MUST NOT be required.
- **FR-046**: Rapid navigation between pages MUST keep the app responsive, render only the final selected page's content, and MUST NOT crash, freeze, or display visual corruption.

### Key Entities *(include if feature involves data)*

#### Core Entities

- **Page**: Represents a top-level section (Home, Bible Reading, Prayer, Community, About Us).
- **User Role**: Either Member or Admin, affecting available actions on Community page.

#### Bible Reading Entities

- **Bible Passage**: Mocked scripture content with reference, passage text, book, chapter, and verse identifiers.
- **Verse**: Individual verse within a passage, selectable for actions.
- **Verse Comment**: User-created comment attached to one or more verses (session-scoped).
- **Favorites Collection**: Session-scoped collection of saved verses.

#### Prayer Entities

- **Prayer Item**: Mocked or user-created prayer with title, full text, theme, and metadata (date, source).
- **Prayer Theme**: Category grouping for prayers (e.g., Gratitude, Healing, Guidance).
- **Answered Mark**: Boolean indicator showing whether a user prayer has been answered (session-scoped).
- **Focus Session**: Timed Do Not Disturb prayer session with configurable duration and countdown indicator (session-scoped).

#### Community Entities

- **Community Feed Item**: Base type for announcements, pushed readings, prayers, and events displayed in the Community feed.
- **Announcement**: Admin-posted message with title, body, and timestamp.
- **Pushed Reading**: Bible text shared by Admin with title, short passage, and reference.
- **Event**: Calendar item with title, date/time, location, description, and RSVP collection.
- **RSVP**: Member's response to an event (session-scoped).
- **Comment**: User-posted response to a feed item (session-scoped).
- **Pin Status**: Boolean indicator showing whether an item is pinned to the top of the feed (session-scoped).
- **Moderation Action**: Admin action to hide/remove an item from the feed (session-scoped).
- **Notification Preference**: Per-member toggle for mocked push notices (session-scoped).
- **Feed Filter**: Type-based filter (Announcements, Readings, Prayers, Events).

#### About Us Entities

- **Team Profile**: Mocked person profile with name, role, and short bio.
- **Mission Statement**: Mocked mission and values content.

## Success Criteria *(mandatory)*

<!--
  NOTE: The success criteria below are defined as measurable, technology-agnostic outcomes.
-->

### Measurable Outcomes

#### Core App & Navigation

- **SC-001**: 90% of test users can reach any page from Home in ≤ 2 taps within 10 seconds.
- **SC-002**: The app renders all five pages correctly on screens 360px wide without horizontal scrolling.
- **SC-003**: Navigation controls are visible and accessible within the thumb-friendly zone on mobile devices (bottom 60% of screen or persistent bottom nav).
- **SC-004**: 90% of test users successfully return to Home from any page within 5 seconds.
- **SC-005**: 90% of test users rate the design as "sleek and standout" on a post-test survey (4.5/5 or higher).

#### Bible Reading Page

- **SC-006**: 90% of test users can locate the Bible Reading page and switch passages in under 30 seconds.
- **SC-007**: When viewing a passage, only passage text and reference are visible by default without scrolling (minimal view validated on 375px × 667px viewport).
- **SC-008**: 85% of test users successfully select a verse and trigger the contextual action bar within 15 seconds.
- **SC-009**: Contextual action bar appears within 200ms of verse selection.
- **SC-010**: 80% of test users successfully add a comment to a verse and view the comment within 45 seconds.
- **SC-011**: 85% of test users successfully add verses to favorites within 20 seconds.
- **SC-012**: Sharing a verse with attached comments includes both verse text and comment text in the mocked share output.

#### Prayer Page

- **SC-013**: 90% of test users can identify and navigate to all four prayer sections (by Theme, My Prayers, World & Community, Focus) within 30 seconds.
- **SC-014**: 85% of test users successfully create a new prayer and see it appear in My Prayers within 40 seconds.
- **SC-015**: 80% of test users successfully mark a prayer as "answered" and observe the visual indicator within 20 seconds.
- **SC-016**: 75% of test users successfully activate Focus Prayer mode (via two-thumb gesture or UI control) within 30 seconds.
- **SC-017**: Focus mode countdown timer is visible and updates every second without lag or visual jitter.
- **SC-018**: When Focus mode is active, non-essential UI elements (navigation, action bars) are hidden or minimized, verified by visual inspection.
- **SC-019**: Prayer detail views display only text and metadata by default, with contextual actions appearing only when prayer is selected (validated on 360px viewport).

#### Community Page

- **SC-020**: 90% of test users viewing the Community feed can distinguish pinned items from regular items within 10 seconds (visual differentiation test).
- **SC-021**: 85% of test users in Member role successfully RSVP to an event and see the RSVP state update within 25 seconds.
- **SC-022**: 80% of test users in Admin role successfully push a Bible reading and verify it appears as a prioritized feed item within 40 seconds.
- **SC-023**: 85% of test users successfully filter the Community feed by type (Events, Prayers, Announcements, Readings) within 20 seconds.
- **SC-024**: The Community feed scrolls smoothly without layout shifts or visual jitter on 360px mobile viewport (validated via visual inspection or Lighthouse CLS < 0.1).
- **SC-025**: 80% of test users can identify and use at least two member interactions (like, comment, save) within 35 seconds.
- **SC-026**: Admin controls (post, pin, moderate) are not visible to Members (100% verified in role-based testing).
- **SC-027**: When Community feed is empty, 90% of test users see and understand the empty-state message within 5 seconds.

#### About Us Page

- **SC-028**: 90% of test users can locate and read mission/values content within 20 seconds.
- **SC-029**: 85% of test users can view at least one team profile with name, role, and bio within 25 seconds.

#### Cross-Cutting UX & Performance

- **SC-030**: All pages load and render initial content within 2.5 seconds on a simulated 3G mobile connection (Lighthouse LCP ≤ 2.5s).
- **SC-031**: Primary interactions (tap, select, RSVP, navigate) respond within 200ms (Lighthouse INP ≤ 200ms).
- **SC-032**: Long text content (event descriptions, prayer text, Bible passages) wraps correctly on 360px viewport without requiring horizontal scrolling (100% validated across all pages).
- **SC-033**: Rapid navigation (5 page switches in 10 seconds) does not cause crashes, freezes, or visual corruption (100% pass rate in smoke tests).
- **SC-034**: Empty states for all content lists render clear messages without errors or loading spinners (100% validated across all pages).
- **SC-035**: The app meets WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text) across all pages (100% validated via automated accessibility audit).
- **SC-036**: All interactive controls meet minimum touch target size of 44×44 CSS pixels (100% validated via automated accessibility audit).

## Assumptions

- All content is mocked and provided within the app experience.
- No user authentication or backend data persistence is required. Any user-generated content (e.g., prayers, comments, selections) may exist only as mocked, non-persisted, session-scoped state within the app.
- The app targets modern mobile browsers and scales up for larger screens.

## Dependencies

- None.
