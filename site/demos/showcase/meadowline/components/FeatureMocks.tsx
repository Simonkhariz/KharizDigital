"use client";

import {
  BadgeCheck,
  Bot,
  Calendar,
  CalendarDays,
  ChevronDown,
  Eye,
  Flag,
  LayoutGrid,
  Lightbulb,
  List,
  Send,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import clsx from "clsx";
import { assistantReplies, goals, teams } from "../data/content";
import { Avatar, AvatarStack, LogoMark } from "./Brand";
import "./FeatureMocks.css";

type GoalView = "focus" | "list" | "board";

export function GoalsMock() {
  const [view, setView] = useState<GoalView>("list");
  const [expanded, setExpanded] = useState(true);
  const visibleGoals = view === "focus" ? goals.slice(0, 1) : goals;

  return (
    <div className={clsx("ml-feature-mocks-mock", "ml-feature-mocks-green")}>
      <div className="ml-feature-mocks-goal-head">
        <span className="ml-feature-mocks-goal-icon">
          <Target size={14} aria-hidden="true" />
        </span>
        <span>Increase Revenue By +25%</span>
        <Avatar tone="umber" size={22} />
      </div>
      <div className="ml-feature-mocks-views" role="group" aria-label="Goal view">
        <button type="button" aria-pressed={view === "focus"} aria-label="Focus view" onClick={() => setView("focus")}>
          <Eye size={14} aria-hidden="true" />
          {view === "focus" ? "Focus" : <i />}
        </button>
        <button type="button" aria-pressed={view === "list"} aria-label="List view" onClick={() => setView("list")}>
          <List size={14} aria-hidden="true" />
          {view === "list" ? "List" : <i />}
        </button>
        <button type="button" aria-pressed={view === "board"} aria-label="Board view" onClick={() => setView("board")}>
          <LayoutGrid size={14} aria-hidden="true" />
          {view === "board" ? "Board" : <i />}
        </button>
      </div>
      <button
        type="button"
        className="ml-feature-mocks-group"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        <ChevronDown size={13} aria-hidden="true" />
        In Progress
      </button>
      {expanded && (
        <>
          <p className="ml-feature-mocks-task">
            <Lightbulb size={13} aria-hidden="true" />
            <span>Close Q1 customer deals</span>
            <Avatar tone="moss" size={18} />
            <small>Alex</small>
          </p>
          <ul className={clsx("ml-feature-mocks-goal-list", view === "board" && "ml-feature-mocks-board")}>
            {visibleGoals.map((goal) => (
              <li key={goal.id}>
                <strong>{goal.title}</strong>
                <span className="ml-feature-mocks-progress-row">
                  <span
                    className="ml-feature-mocks-progress"
                    role="progressbar"
                    aria-label={goal.title}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={goal.progress}
                  >
                    <span style={{ width: `${goal.progress}%` }} />
                  </span>
                  <small>{goal.progress}%</small>
                  <Avatar tone={goal.owner} size={20} />
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

type ChatMessage = { id: number; from: "user" | "assistant"; text: string };

export function AssistantMock() {
  const inputId = useId();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, from: "user", text: assistantReplies[0].question },
    { id: 1, from: "assistant", text: assistantReplies[0].answer },
  ]);
  const [draft, setDraft] = useState("");
  const [turn, setTurn] = useState(1);

  const ask = (question: string) => {
    const known = assistantReplies.find((reply) => reply.question.toLowerCase() === question.toLowerCase());
    const reply = known ?? assistantReplies[turn % assistantReplies.length];
    setMessages((current) => [
      ...current.slice(-2),
      { id: current.length * 2 + turn, from: "user", text: question },
      { id: current.length * 2 + turn + 1, from: "assistant", text: reply.answer },
    ]);
    setTurn((value) => value + 1);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = draft.trim();
    if (!question) return;
    ask(question);
    setDraft("");
  };

  const suggestion = assistantReplies[turn % assistantReplies.length];

  return (
    <div className={clsx("ml-feature-mocks-mock", "ml-feature-mocks-blue")}>
      <span className="ml-feature-mocks-badge">
        <Bot size={26} aria-hidden="true" />
      </span>
      <div className="ml-feature-mocks-chat-head">
        <span>
          <Sparkles size={13} aria-hidden="true" />
          Meadowline AI
        </span>
        <small>Active Now</small>
      </div>
      <div className="ml-feature-mocks-chat" aria-live="polite">
        {messages.slice(-2).map((message) => (
          <p key={message.id} className={message.from === "user" ? "ml-feature-mocks-asked" : "ml-feature-mocks-answered"}>
            {message.text}
          </p>
        ))}
      </div>
      <button type="button" className="ml-feature-mocks-suggest" onClick={() => ask(suggestion.question)}>
        <Sparkles size={12} aria-hidden="true" />
        {suggestion.question}
      </button>
      <form className="ml-feature-mocks-ask" onSubmit={onSubmit}>
        <label htmlFor={inputId} className="ml-feature-mocks-sr-only">
          Ask the assistant
        </label>
        <input
          id={inputId}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask anything..."
          autoComplete="off"
        />
        <button type="submit" aria-label="Send question">
          <Send size={16} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

const dueOptions = ["Today", "Tomorrow", "Next week"] as const;

export function TaskMock() {
  const inputId = useId();
  const [title, setTitle] = useState("Call Alex Tomorrow");
  const [due, setDue] = useState(1);
  const [starred, setStarred] = useState(false);
  const [flagged, setFlagged] = useState(false);
  const [status, setStatus] = useState("");
  const [count, setCount] = useState(0);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = title.trim();
    if (!name) {
      setStatus("Give the task a name first.");
      return;
    }
    setCount((value) => value + 1);
    setStatus(`Added "${name}" for ${dueOptions[due].toLowerCase()}.`);
    setTitle("");
    setStarred(false);
    setFlagged(false);
  };

  return (
    <form className={clsx("ml-feature-mocks-mock", "ml-feature-mocks-lilac")} onSubmit={onSubmit} noValidate>
      <span className="ml-feature-mocks-badge">
        <BadgeCheck size={26} aria-hidden="true" />
      </span>
      <label htmlFor={inputId} className="ml-feature-mocks-field-label">
        Add Task
      </label>
      <input
        id={inputId}
        className="ml-feature-mocks-field"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs doing?"
        autoComplete="off"
      />
      <div className="ml-feature-mocks-tools">
        <button
          type="button"
          className="ml-feature-mocks-tool"
          aria-label={`Due ${dueOptions[due]}. Change due date`}
          onClick={() => setDue((value) => (value + 1) % dueOptions.length)}
        >
          <CalendarDays size={15} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="ml-feature-mocks-tool"
          aria-pressed={starred}
          aria-label="Mark as priority"
          onClick={() => setStarred((value) => !value)}
        >
          <Star size={15} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="ml-feature-mocks-tool"
          aria-pressed={flagged}
          aria-label="Flag for review"
          onClick={() => setFlagged((value) => !value)}
        >
          <Flag size={15} aria-hidden="true" />
        </button>
        <span className="ml-feature-mocks-due">
          <Calendar size={12} aria-hidden="true" />
          {dueOptions[due]}
        </span>
      </div>
      <div className="ml-feature-mocks-members">
        <AvatarStack more="29+" size={24} />
        <small>{count === 0 ? "32 Members" : `${count} added today`}</small>
      </div>
      <button type="submit" className="ml-feature-mocks-submit">
        Add Task
      </button>
      <p className="ml-feature-mocks-status" role="status">
        {status}
      </p>
    </form>
  );
}

export function TeamMock() {
  const selectId = useId();
  const [teamId, setTeamId] = useState<string>(teams[0].id);
  const [joined, setJoined] = useState(false);
  const team = teams.find((entry) => entry.id === teamId) ?? teams[0];

  return (
    <div className={clsx("ml-feature-mocks-mock", "ml-feature-mocks-peach", "ml-feature-mocks-bare")}>
      <div className="ml-feature-mocks-team-card">
        <span className="ml-feature-mocks-badge">
          <LogoMark size={26} />
        </span>
        <div className="ml-feature-mocks-team-pick">
          <label htmlFor={selectId}>
            <em>Meadowline</em> Team
          </label>
          <select id={selectId} value={teamId} onChange={(event) => setTeamId(event.target.value)}>
            {teams.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.name.replace(" Members", "")}
              </option>
            ))}
          </select>
          <ChevronDown size={14} aria-hidden="true" />
        </div>
        <strong>{team.name}</strong>
        <small>{team.count} Members</small>
        <AvatarStack more={`${team.count - 3}+`} size={42} />
      </div>
      <div className="ml-feature-mocks-meeting">
        <span className="ml-feature-mocks-meeting-icon">
          <CalendarDays size={16} aria-hidden="true" />
        </span>
        <span>
          <strong>Design Sync In 10 Min</strong>
          <small>{joined ? "You are in. See you there." : "Today, 10:00 AM"}</small>
        </span>
        <button type="button" aria-pressed={joined} onClick={() => setJoined((value) => !value)}>
          {joined ? "Joined" : "Join"}
        </button>
      </div>
    </div>
  );
}
