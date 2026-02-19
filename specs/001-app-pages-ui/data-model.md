# Data Model: Mobile-First App Pages

**Date**: 2026-02-18  
**Source**: [specs/001-app-pages-ui/spec.md](./spec.md) — Key Entities section  
**Research**: [research.md](./research.md)

All entities are session-scoped in-memory only (Zustand stores) unless marked **static** (from JSON data files). No database or backend persistence.

---

## Entity Diagram

```
BiblePassage ──< Verse ──< VerseComment   (static + session)
                 Verse ──> FavoritesCollection  (session)

PrayerTheme ──< PrayerItem               (static)
MyPrayer                                 (session, user-created)
AnsweredMark ── MyPrayer                 (session)
FocusSession                             (session, transient)

CommunityFeedItem (discriminated union)
  ├── Announcement
  ├── PushedReading ── BiblePassage ref
  ├── PrayerPost    ── PrayerItem ref
  └── Event ──< RSVP   (session)
PinStatus   ── CommunityFeedItem         (session)
ModerationAction ── CommunityFeedItem    (session)
FeedComment  ── CommunityFeedItem        (session)
NotificationPreference                   (session)

TeamProfile                              (static)
MissionStatement                         (static)
Value                                    (static)
```

---

## 1. Core

### `Page`
Represents a top-level route. Not a runtime entity — used for navigation logic.

| Field | Type | Notes |
|-------|------|-------|
| `id` | `'home' \| 'reading' \| 'prayer' \| 'community' \| 'about'` | Route key |
| `label` | `string` | Tab label (e.g., "Read") |
| `icon` | `string` | Lucide icon name |
| `href` | `string` | Next.js route path |

### `UserRole`
| Field | Type | Notes |
|-------|------|-------|
| `role` | `'member' \| 'admin'` | Session-scoped; toggled by role pill in Community header |

---

## 2. Bible Reading

### `BibleBook` *(static)*
| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | e.g., `"genesis"` |
| `name` | `string` | e.g., `"Genesis"` |
| `chapters` | `BibleChapter[]` | |

### `BibleChapter` *(static)*
| Field | Type | Notes |
|-------|------|-------|
| `number` | `number` | Chapter number |
| `verses` | `Verse[]` | |

### `BiblePassage` *(static)*
Quick-select passage or a chapter slice.

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | e.g., `"john-3-16-17"` |
| `book` | `string` | Book name |
| `chapterRange` | `string` | e.g., `"3:16–17"` |
| `reference` | `string` | Full label: `"John 3:16–17"` |
| `translation` | `string` | `"Mocked – Standard Version"` |
| `verses` | `Verse[]` | |

### `Verse` *(static)*
| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | e.g., `"john-3-16"` |
| `number` | `number` | Verse number |
| `text` | `string` | Mocked verse text |

### `VerseComment` *(session)*
| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | UUID generated at creation |
| `verseId` | `string` | FK → `Verse.id` |
| `text` | `string` | User comment body |
| `createdAt` | `number` | `Date.now()` timestamp |

### `FavoritesCollection` *(session)*
Flat set of verse IDs held in `readingStore`. No separate entity needed — stored as `Set<string>`.

**State transitions (readingStore)**:
```
idle → verse tapped → selected
selected → verse tapped again → idle
selected → action bar "Add to Favorites" → verseId appended to favorites
selected → tap outside verse list → idle (action bar dismissed)
selected → navigate away → idle (action bar dismissed)
```

---

## 3. Prayer

### `PrayerTheme` *(static)*
| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | e.g., `"gratitude"` |
| `label` | `string` | e.g., `"Gratitude"` |
| `description` | `string` | One-sentence description |

### `PrayerItem` *(static — themed/world/community)*
| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | |
| `title` | `string` | Prayer heading |
| `text` | `string` | Full prayer body |
| `themeId` | `string \| null` | FK → `PrayerTheme.id`; null for world/community |
| `source` | `'theme' \| 'world' \| 'community'` | Used to route to correct section |
| `date` | `string` | ISO date string |
| `summary` | `string \| null` | Short preview for world/community list; null for themed |

### `MyPrayer` *(session — user-created)*
| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | UUID |
| `title` | `string` | |
| `text` | `string` | |
| `isAnswered` | `boolean` | Default `false` |
| `createdAt` | `number` | `Date.now()` |
| `updatedAt` | `number` | |

**State transitions (prayerStore — MyPrayer)**:
```
create → MyPrayer created, isAnswered: false
edit → title/text updated, updatedAt refreshed
markAnswered → isAnswered: true
delete → removed from store
```

### `FocusSession` *(session — transient)*
| Field | Type | Notes |
|-------|------|-------|
| `isActive` | `boolean` | |
| `durationMinutes` | `5 \| 10 \| 15 \| 30 \| 60` | Selected before start; default `10` |
| `startedAt` | `number \| null` | `Date.now()` or null when idle |
| `remainingSeconds` | `number` | Decremented by timer tick |

**State transitions**:
```
idle → user activates (button or two-finger press) → picker shown
picker → duration chosen → active (remainingSeconds = duration × 60)
active → time elapsed → idle (UI restored)
active → user cancels → idle (UI restored)
```

### `PrayerComment` *(session)*
| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | UUID |
| `prayerItemId` | `string` | FK → `PrayerItem.id` or `MyPrayer.id` |
| `text` | `string` | |
| `createdAt` | `number` | |

---

## 4. Community

### `CommunityFeedItem` *(discriminated union — static base, session overlays)*

Base fields common to all item types:

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | |
| `type` | `'announcement' \| 'reading' \| 'prayer' \| 'event'` | Discriminant |
| `isPinned` | `boolean` | Static default; can be toggled by Admin in session |
| `timestamp` | `string` | ISO date string |
| `authorRole` | `'admin' \| 'member'` | |

#### `Announcement`
| Field | Type |
|-------|------|
| `title` | `string` |
| `body` | `string` |

#### `PushedReading`
| Field | Type |
|-------|------|
| `title` | `string` |
| `passagePreview` | `string` — first verse or short excerpt |
| `reference` | `string` — e.g., `"John 3:16–17"` |
| `passageId` | `string` — FK → `BiblePassage.id` |

#### `PrayerPost`
| Field | Type |
|-------|------|
| `prayerItemId` | `string` — FK → `PrayerItem.id` |
| `summary` | `string` |

#### `Event`
| Field | Type |
|-------|------|
| `title` | `string` |
| `datetime` | `string` — ISO datetime |
| `location` | `string` — mocked |
| `description` | `string` |

### `RSVP` *(session)*
| Field | Type | Notes |
|-------|------|-------|
| `eventId` | `string` | FK → `Event.id` |
| `status` | `'going' \| 'not-going' \| null` | null = no response |

### `FeedComment` *(session)*
| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | UUID |
| `feedItemId` | `string` | FK → `CommunityFeedItem.id` |
| `text` | `string` | |
| `createdAt` | `number` | |

### `PinStatus` *(session overlay)*
Stored as `Set<string>` of pinned item IDs in `communityStore`. Overrides the static `isPinned` field.

### `ModerationAction` *(session)*
Stored as `Set<string>` of hidden item IDs. Items in this set are excluded from the rendered feed for Admins with an undo affordance.

### `NotificationPreference` *(session)*
| Field | Type | Notes |
|-------|------|-------|
| `adminPushEnabled` | `boolean` | Default `true` |
| `eventEnabled` | `boolean` | Default `true` |

### `FeedFilter` *(session)*
| Field | Type | Notes |
|-------|------|-------|
| `activeType` | `'all' \| 'announcement' \| 'reading' \| 'prayer' \| 'event'` | Default `'all'` |
| `searchQuery` | `string` | Default `''` |

---

## 5. About Us

### `MissionStatement` *(static)*
| Field | Type |
|-------|------|
| `text` | `string` — 2–3 sentences |

### `Value` *(static)*
| Field | Type |
|-------|------|
| `id` | `string` |
| `label` | `string` — e.g., `"Scripture"` |
| `description` | `string` — one sentence |

### `TeamProfile` *(static)*
| Field | Type |
|-------|------|
| `id` | `string` |
| `name` | `string` |
| `role` | `string` |
| `bio` | `string` — one sentence |
| `avatarUrl` | `string` — placeholder image path |

---

## Zustand Store Summary

| Store | Key State | Resets On |
|-------|-----------|-----------|
| `readingStore` | `selectedVerseIds`, `comments`, `favorites` | Page reload |
| `prayerStore` | `myPrayers`, `comments`, `focusSession` | Page reload |
| `communityStore` | `role`, `rsvps`, `feedComments`, `pinnedIds`, `hiddenIds`, `notifPrefs`, `filter` | Page reload |
