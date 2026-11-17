"use client";

import { Activity, CalendarCheck, Minus, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { checkIn, initialSessions, insight, sessionLoad, sessionTypes, todayPlan, weekLoads, type Session, type SessionType } from "../data/app";
import "./PhoneApp.css";

const tabs = [
  { id: "today", label: "Today", Icon: CalendarCheck },
  { id: "log", label: "Log", Icon: Activity },
  { id: "insights", label: "Insights", Icon: Sparkles },
] as const;

type TabId = (typeof tabs)[number]["id"];

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 26;
  return (
    <svg className="sh-app-ring" viewBox="0 0 64 64" role="img" aria-label={`Stride score ${score} out of 100`}>
      <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="6" />
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke="#a8f76d"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
        transform="rotate(-90 32 32)"
      />
      <text x="32" y="38" textAnchor="middle">
        {score}
      </text>
    </svg>
  );
}

/** The phone in the hero: a small working training app with three tabs. */
export function PhoneApp() {
  const [tab, setTab] = useState<TabId>("today");
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [type, setType] = useState<SessionType>("Track");
  const [minutes, setMinutes] = useState(45);
  const [effort, setEffort] = useState(6);

  const logged = sessions.slice(0, sessions.length - initialSessions.length);
  const todayLoad = logged.reduce((sum, session) => sum + sessionLoad(session), 0);
  const week = weekLoads.map((entry, index) => (index === weekLoads.length - 1 ? { ...entry, load: entry.load + todayLoad } : entry));
  const weekTotal = week.reduce((sum, entry) => sum + entry.load, 0);
  const average = Math.round(weekTotal / week.length);
  const peak = Math.max(...week.map((entry) => entry.load), 120);

  const addSession = () => {
    setSessions((list) => [{ id: list.length + 1, type, minutes, effort, when: "Today" }, ...list]);
  };

  return (
    <div className="sh-phone">
      <div className="sh-phone-screen">
        <span className="sh-phone-island" aria-hidden="true" />
        <div className="sh-app" role="group" aria-label="Stridehaus app preview">
          {tab === "today" && (
            <div className="sh-app-view">
              <div className="sh-app-cover">
                <img src="/showcase/stridehaus/runner-track-infield.webp" alt="" width={700} height={593} />
                <div>
                  <p>Tuesday</p>
                  <h3>Ready to push</h3>
                </div>
                <ScoreRing score={insight.score} />
              </div>
              <div className="sh-app-card">
                <header>
                  <span>Training load</span>
                  <em>7-day average</em>
                </header>
                <div className="sh-app-load">
                  <strong>{average}</strong>
                  <ol aria-label="Load for the last seven days">
                    {week.map((entry, index) => (
                      <li key={index}>
                        <i style={{ height: `${Math.max(8, (entry.load / peak) * 100)}%` }} data-today={index === week.length - 1} />
                        <span>{entry.day}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="sh-app-card sh-app-plan">
                <span>Next session</span>
                <strong>{todayPlan.title}</strong>
                <p>{todayPlan.detail}</p>
                <em>{todayPlan.time}</em>
              </div>
              <dl className="sh-app-checkin">
                {checkIn.map((entry) => (
                  <div key={entry.label}>
                    <dt>{entry.label}</dt>
                    <dd>{entry.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {tab === "log" && (
            <div className="sh-app-view sh-app-pad">
              <h3>Log a session</h3>
              <div className="sh-app-types" role="group" aria-label="Session type">
                {sessionTypes.map((entry) => (
                  <button key={entry} type="button" aria-pressed={entry === type} onClick={() => setType(entry)}>
                    {entry}
                  </button>
                ))}
              </div>
              <div className="sh-app-stepper">
                <span id="sh-app-minutes">Minutes</span>
                <button type="button" aria-label="Five minutes less" onClick={() => setMinutes((value) => Math.max(5, value - 5))}>
                  <Minus size={14} aria-hidden="true" />
                </button>
                <output aria-labelledby="sh-app-minutes">{minutes}</output>
                <button type="button" aria-label="Five minutes more" onClick={() => setMinutes((value) => Math.min(180, value + 5))}>
                  <Plus size={14} aria-hidden="true" />
                </button>
              </div>
              <label className="sh-app-effort">
                <span>
                  Effort <b>{effort} / 10</b>
                </span>
                <input type="range" min={1} max={10} value={effort} onChange={(event) => setEffort(Number(event.target.value))} />
              </label>
              <button type="button" className="sh-app-add" onClick={addSession}>
                Add session · load {sessionLoad({ minutes, effort })}
              </button>
              <ul className="sh-app-sessions" aria-label="Recent sessions" aria-live="polite">
                {sessions.slice(0, 3).map((session) => (
                  <li key={session.id}>
                    <strong>{session.type}</strong>
                    <span>
                      {session.when} · {session.minutes} min
                    </span>
                    <em>{sessionLoad(session)}</em>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tab === "insights" && (
            <div className="sh-app-view sh-app-pad">
              <h3>{insight.headline}</h3>
              <div className="sh-app-compare">
                <div>
                  <strong>{insight.score}</strong>
                  <span>Today</span>
                </div>
                <div>
                  <strong>{insight.average}</strong>
                  <span>7-day average</span>
                </div>
              </div>
              <p className="sh-app-note">{insight.body}</p>
              <ul className="sh-app-tips">
                {insight.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="sh-app-tabs" role="group" aria-label="App sections">
            {tabs.map(({ id, label, Icon }) => (
              <button key={id} type="button" aria-pressed={tab === id} onClick={() => setTab(id)}>
                <Icon size={16} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
