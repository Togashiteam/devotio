// contracts/prayer.ts
// TypeScript type contracts for Prayer entities.
// Governs src/data/prayers.json, src/data/themes.json,
// and the prayerStore session state.

// ─── Static data (from JSON) ──────────────────────────────────────────────────

export interface PrayerTheme {
  id: string;          // e.g. "gratitude"
  label: string;       // e.g. "Gratitude"
  description: string; // one-sentence description
}

export type PrayerSource = 'theme' | 'world' | 'community';

export interface PrayerItem {
  id: string;
  title: string;
  text: string;        // full prayer body
  themeId: string | null;  // null for world/community prayers
  source: PrayerSource;
  date: string;        // ISO date string
  summary: string | null;  // short preview; null for themed prayers
}

// Top-level shape of src/data/prayers.json
export interface PrayersData {
  themed: PrayerItem[];    // themeId is set; source = 'theme'
  world: PrayerItem[];     // source = 'world'
  community: PrayerItem[]; // source = 'community'
}

// Top-level shape of src/data/themes.json
export interface ThemesData {
  themes: PrayerTheme[]; // exactly 4: Gratitude, Healing, Guidance, Peace
}

// ─── Session state (prayerStore) ─────────────────────────────────────────────

export type FocusDuration = 5 | 10 | 15 | 30 | 60;

export interface FocusSession {
  isActive: boolean;
  durationMinutes: FocusDuration;
  startedAt: number | null;    // Date.now() or null when idle
  remainingSeconds: number;
}

export interface MyPrayer {
  id: string;          // UUID generated at creation
  title: string;
  text: string;
  isAnswered: boolean; // default false
  createdAt: number;
  updatedAt: number;
}

export interface PrayerComment {
  id: string;          // UUID
  prayerItemId: string; // FK → PrayerItem.id or MyPrayer.id
  text: string;
  createdAt: number;
}

export interface PrayerStore {
  myPrayers: MyPrayer[];
  selectedPrayerIds: string[];
  comments: Record<string, PrayerComment[]>; // prayerItemId → comments
  focusSession: FocusSession;

  // My Prayers actions
  addPrayer: (title: string, text: string) => void;
  editPrayer: (id: string, title: string, text: string) => void;
  deletePrayer: (id: string) => void;
  markAnswered: (id: string) => void;

  // Selection actions
  togglePrayer: (id: string) => void;
  clearSelection: () => void;

  // Comment actions
  addComment: (prayerItemId: string, text: string) => void;

  // Focus Prayer actions
  startFocus: (duration: FocusDuration) => void;
  tickFocus: () => void;   // called every second by useFocusTimer
  cancelFocus: () => void;
}
