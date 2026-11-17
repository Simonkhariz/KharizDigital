"use client";

import { useState } from "react";
import clsx from "clsx";
import {
  AlarmClock,
  ArrowRight,
  Asterisk,
  ChevronDown,
  CircleCheck,
  CircleDashed,
  Diamond,
  Ellipsis,
  Flag,
  type LucideIcon,
  Plus,
  Wrench,
} from "lucide-react";
import {
  columns,
  days,
  origins,
  owners,
  todayIndex,
  units,
  windows,
  type ColumnId,
  type Incident,
} from "../data/dashboard";
import { dashboard as styles } from "@/demos/showcase/rapporta/styles";

export type Filters = { unit: string; origin: string; window: string };

type Props = {
  incidents: Incident[];
  filters: Filters;
  onFilters: (filters: Filters) => void;
  onAdd: (column: ColumnId) => void;
  onAdvance: (id: string) => void;
};

const views = ["Board", "List", "Roadmap", "Calendar"] as const;
type View = (typeof views)[number];

const columnIcons: Record<ColumnId, LucideIcon> = {
  detected: AlarmClock,
  acknowledged: CircleCheck,
  progress: CircleDashed,
};

const filterDefs: { key: keyof Filters; label: string; options: string[] }[] = [
  { key: "unit", label: "Assigned unit", options: units },
  { key: "origin", label: "Service type", options: origins },
  { key: "window", label: "Resolution window", options: windows },
];

const nextLabel: Record<ColumnId, string> = {
  detected: "Acknowledge",
  acknowledged: "Start work",
  progress: "Mark resolved",
};

function Avatar({ owner }: { owner: string }) {
  const person = owners[owner];
  return (
    <span className={styles.avatar} style={{ background: person.tone }} title={person.name}>
      <span aria-hidden="true">{owner}</span>
      <span className={styles.srOnly}>Owner: {person.name}</span>
    </span>
  );
}

function Card({ item, onAdvance }: { item: Incident; onAdvance: (id: string) => void }) {
  return (
    <li className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.cardMark} aria-hidden="true">
          <Asterisk size={13} strokeWidth={3} />
        </span>
        <p>
          <strong>{item.title}</strong>
          <small>#{item.id}</small>
        </p>
        <Avatar owner={item.owner} />
      </div>
      <dl className={styles.cardMeta}>
        <div>
          <dt>
            <Flag size={11} aria-hidden="true" />
            Origin
          </dt>
          <dd>{item.origin}</dd>
        </div>
        <div>
          <dt>
            <Diamond size={11} aria-hidden="true" />
            Priority
          </dt>
          <dd>{item.priority}</dd>
        </div>
        <div>
          <dt>
            <Wrench size={11} aria-hidden="true" />
            Handler
          </dt>
          <dd>{item.handler}</dd>
        </div>
      </dl>
      <button type="button" className={styles.cardAction} onClick={() => onAdvance(item.id)}>
        {nextLabel[item.column]} <ArrowRight size={11} aria-hidden="true" />
      </button>
    </li>
  );
}

export function DashboardViews({ incidents, filters, onFilters, onAdd, onAdvance }: Props) {
  const [view, setView] = useState<View>("Board");
  const [collapsed, setCollapsed] = useState<ColumnId[]>([]);
  const activeFilters = Object.values(filters).filter(Boolean).length;

  function toggleColumn(id: ColumnId) {
    setCollapsed((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <section className={styles.views} aria-label="Incidents">
      <div className={styles.viewBar}>
        <div className={styles.tabs} role="tablist" aria-label="Incident views">
          {views.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              id={`rapporta-tab-${name}`}
              aria-selected={view === name}
              aria-controls="rapporta-view-panel"
              className={clsx(styles.tab, view === name && styles.tabActive)}
              onClick={() => setView(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className={styles.filters}>
          <button
            type="button"
            className={styles.filterCount}
            disabled={activeFilters === 0}
            onClick={() => onFilters({ unit: "", origin: "", window: "" })}
            aria-label={activeFilters ? `Clear ${activeFilters} filters` : "No filters applied"}
          >
            Filter <span>{activeFilters}</span>
          </button>
          {filterDefs.map((def) => (
            <label key={def.key} className={clsx(styles.select, filters[def.key] && styles.selectActive)}>
              <span className={styles.srOnly}>{def.label}</span>
              <select value={filters[def.key]} onChange={(event) => onFilters({ ...filters, [def.key]: event.target.value })}>
                <option value="">{def.label}</option>
                {def.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <ChevronDown size={11} aria-hidden="true" />
            </label>
          ))}
        </div>
      </div>

      <div id="rapporta-view-panel" role="tabpanel" aria-labelledby={`rapporta-tab-${view}`} className={styles.panel}>
        {view === "Board" && (
          <div className={styles.board}>
            {columns.map((column) => {
              const Icon = columnIcons[column.id];
              const items = incidents.filter((item) => item.column === column.id);
              const isCollapsed = collapsed.includes(column.id);
              return (
                <div key={column.id} className={styles.column}>
                  <div className={styles.columnHead}>
                    <h4>
                      <Icon size={13} aria-hidden="true" />
                      {column.label} <span>{items.length}</span>
                    </h4>
                    <button type="button" aria-label={`Add to ${column.label}`} onClick={() => onAdd(column.id)}>
                      <Plus size={13} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={`${isCollapsed ? "Show" : "Hide"} ${column.label} cards`}
                      aria-expanded={!isCollapsed}
                      onClick={() => toggleColumn(column.id)}
                    >
                      <Ellipsis size={13} aria-hidden="true" />
                    </button>
                  </div>
                  {!isCollapsed && (
                    <ul className={styles.cards}>
                      {items.map((item) => (
                        <Card key={item.id} item={item} onAdvance={onAdvance} />
                      ))}
                      {items.length === 0 && <li className={styles.empty}>Nothing here.</li>}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {view === "List" && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Incident</th>
                <th scope="col">Status</th>
                <th scope="col">Priority</th>
                <th scope="col">Handler</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((item) => (
                <tr key={item.id}>
                  <th scope="row">
                    {item.title} <small>#{item.id}</small>
                  </th>
                  <td>{columns.find((column) => column.id === item.column)?.label}</td>
                  <td>{item.priority}</td>
                  <td>{item.handler}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {view === "Roadmap" && (
          <div className={styles.roadmap}>
            <div className={styles.weekHead} aria-hidden="true">
              {days.map((day, index) => (
                <span key={day} className={clsx(index === todayIndex && styles.today)}>
                  {day}
                </span>
              ))}
            </div>
            <ul>
              {incidents.map((item) => (
                <li key={item.id} className={styles.roadRow}>
                  <span
                    className={clsx(styles.roadBar, item.priority === "High Impact" && styles.roadBarHigh)}
                    style={{ gridColumn: `${item.startDay + 1} / ${item.dueDay + 2}` }}
                  >
                    {item.title}
                    <span className={styles.srOnly}>
                      , {days[item.startDay]} to {days[item.dueDay]}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {view === "Calendar" && (
          <ol className={styles.calendar}>
            {days.map((day, index) => (
              <li key={day} className={clsx(index === todayIndex && styles.today)}>
                <span className={styles.calDay}>{day}</span>
                {incidents
                  .filter((item) => item.dueDay === index)
                  .map((item) => (
                    <span key={item.id} className={styles.calItem}>
                      {item.title}
                    </span>
                  ))}
              </li>
            ))}
          </ol>
        )}

        {incidents.length === 0 && view !== "Board" && <p className={styles.empty}>No incidents match.</p>}
      </div>
    </section>
  );
}
