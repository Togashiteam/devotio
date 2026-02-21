// src/types/community.ts
// TypeScript domain types for Community entities.
// Mirrors specs/develop/contracts/community.ts

// ─── Static data (from JSON) ──────────────────────────────────────────────────

export type FeedItemType = 'announcement' | 'reading' | 'prayer' | 'event';
export type AuthorRole = 'admin' | 'member';

/** Base fields shared by all feed item types */
interface FeedItemBase {
  id: string;
  type: FeedItemType;
  isPinned: boolean;    // static default; session overlay may override
  timestamp: string;   // ISO datetime string
  authorRole: AuthorRole;
}

export interface Announcement extends FeedItemBase {
  type: 'announcement';
  title: string;
  body: string;
}

export interface PushedReading extends FeedItemBase {
  type: 'reading';
  title: string;
  passagePreview: string; // first verse or short excerpt
  reference: string;      // e.g. "John 3:16–17"
  passageId: string;      // FK → BiblePassage.id
}

export interface PrayerPost extends FeedItemBase {
  type: 'prayer';
  prayerItemId: string; // FK → PrayerItem.id
  summary: string;
}

export interface EventFeedItem extends FeedItemBase {
  type: 'event';
  title: string;
  datetime: string;  // ISO datetime
  location: string;  // mocked
  description: string;
}

export type CommunityFeedItem =
  | Announcement
  | PushedReading
  | PrayerPost
  | EventFeedItem;

/** Top-level shape of src/data/community-feed.json */
export interface CommunityFeedData {
  items: CommunityFeedItem[]; // min 6: 1 pinned announcement, 1 reading, 2 prayers, 2 events
}

// ─── Session state (communityStore) ──────────────────────────────────────────

export type UserRole = 'member' | 'admin';
export type RsvpStatus = 'going' | 'not-going' | null;
export type FeedFilterType = 'all' | FeedItemType;

export interface RSVP {
  eventId: string;
  status: RsvpStatus;
}

export interface FeedComment {
  id: string;          // UUID
  feedItemId: string;  // FK → CommunityFeedItem.id
  text: string;
  createdAt: number;
}

export interface NotificationPreference {
  adminPushEnabled: boolean; // default true
  eventEnabled: boolean;     // default true
}

export interface FeedFilter {
  activeType: FeedFilterType; // default 'all'
  searchQuery: string;        // default ''
}

export interface CommunityStore {
  role: UserRole;  // default 'member'; toggled by role pill
  rsvps: Record<string, RsvpStatus>;           // eventId → status
  feedComments: Record<string, FeedComment[]>; // feedItemId → comments
  pinnedIds: Set<string>;   // session overrides for pin state
  hiddenIds: Set<string>;   // admin-moderated item IDs (session only)
  notifPrefs: NotificationPreference;
  filter: FeedFilter;

  // Role
  toggleRole: () => void;

  // RSVP
  setRsvp: (eventId: string, status: RsvpStatus) => void;

  // Comments
  addFeedComment: (feedItemId: string, text: string) => void;

  // Admin: pin/unpin
  pinItem: (id: string) => void;
  unpinItem: (id: string) => void;

  // Admin: moderation
  hideItem: (id: string) => void;
  unhideItem: (id: string) => void;

  // Notifications
  setNotifPref: (key: keyof NotificationPreference, value: boolean) => void;

  // Filter
  setFilter: (filter: Partial<FeedFilter>) => void;

  // Derived helpers (computed via selectors, not stored)
  // isVisible(item: CommunityFeedItem): boolean — filters out hiddenIds
  // sortedFeed(items: CommunityFeedItem[]): CommunityFeedItem[] — pinned first
}
