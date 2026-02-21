// src/types/bible.ts
// TypeScript domain types for Bible Reading entities.
// Mirrors specs/develop/contracts/bible.ts

// ─── Static data (from JSON) ──────────────────────────────────────────────────

export interface Verse {
  id: string;          // e.g. "john-3-16"
  number: number;      // verse number within chapter
  text: string;        // mocked verse text
}

export interface BibleChapter {
  number: number;
  verses: Verse[];
}

export interface BibleBook {
  id: string;          // e.g. "genesis"
  name: string;        // e.g. "Genesis"
  chapters: BibleChapter[];
}

export interface BiblePassage {
  id: string;          // e.g. "john-3-16-17"
  book: string;        // book name
  chapterRange: string; // e.g. "3:16–17"
  reference: string;   // full label e.g. "John 3:16–17"
  translation: string; // "Mocked – Standard Version"
  verses: Verse[];
}

/** Top-level shape of src/data/passages.json */
export interface PassagesData {
  quickSelect: BiblePassage[];  // exactly 2 passages
  fullBible: BibleBook[];       // exactly 2 books
}

// ─── Session state (readingStore) ────────────────────────────────────────────

export interface VerseComment {
  id: string;
  verseId: string;
  text: string;
  createdAt: number; // Date.now()
}

export interface ReadingStore {
  selectedVerseIds: string[];
  comments: Record<string, VerseComment[]>; // verseId → comments
  favorites: string[];                       // verseIds

  // Actions
  selectVerse: (id: string) => void;
  deselectVerse: (id: string) => void;
  toggleVerse: (id: string) => void;
  clearSelection: () => void;
  addComment: (verseId: string, text: string) => void;
  addFavorite: (verseId: string) => void;
  removeFavorite: (verseId: string) => void;
}
