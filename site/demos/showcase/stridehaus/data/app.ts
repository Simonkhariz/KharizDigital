/** Sample data for the phone app in the hero. */
export type SessionType = "Track" | "Run" | "Gym" | "Throws";

export type Session = { id: number; type: SessionType; minutes: number; effort: number; when: string };

export const sessionTypes: SessionType[] = ["Track", "Run", "Gym", "Throws"];

export const initialSessions: Session[] = [
  { id: 1, type: "Track", minutes: 55, effort: 8, when: "Yesterday" },
  { id: 2, type: "Gym", minutes: 40, effort: 6, when: "Monday" },
  { id: 3, type: "Run", minutes: 35, effort: 3, when: "Sunday" },
];

/** Load of a session: minutes × effort, scaled so that a typical hard hour is about 100. */
export function sessionLoad(session: Pick<Session, "minutes" | "effort">) {
  return Math.round((session.minutes * session.effort) / 5);
}

export const weekLoads = [
  { day: "T", load: 64 },
  { day: "W", load: 0 },
  { day: "T", load: 92 },
  { day: "F", load: 48 },
  { day: "S", load: 110 },
  { day: "S", load: 21 },
  { day: "M", load: 48 },
];

export const todayPlan = { title: "Speed endurance", detail: "5 × 300 m at 90%, 6 min recovery", time: "17:30, Lane 4" };

export const insight = {
  score: 72,
  average: 64,
  headline: "You are trending up",
  body: "Your 7-day average rose from 58 to 64. Sleep has been the biggest driver: four nights over 7.5 hours.",
  tips: ["Keep tonight's session as planned", "Add 10 minutes of mobility after", "Aim for lights out by 22:30"],
};

export const checkIn = [
  { label: "Sleep", value: "7 h 40" },
  { label: "Soreness", value: "3 / 10" },
  { label: "Resting HR", value: "48 bpm" },
];
