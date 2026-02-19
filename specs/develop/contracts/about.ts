// contracts/about.ts
// TypeScript type contracts for About Us entities.
// Governs src/data/about.json — all static, no session state.

export interface MissionStatement {
  text: string; // 2–3 sentences of mocked mission text
}

export interface Value {
  id: string;          // e.g. "scripture"
  label: string;       // e.g. "Scripture"
  description: string; // one sentence
}

export interface TeamProfile {
  id: string;
  name: string;
  role: string;        // job/role title
  bio: string;         // one sentence
  avatarUrl: string;   // path to placeholder image, e.g. "/avatars/team-1.png"
}

// Top-level shape of src/data/about.json
export interface AboutData {
  mission: MissionStatement;
  values: Value[];       // exactly 3: Scripture, Community, Prayer
  team: TeamProfile[];   // exactly 4 profiles
}
