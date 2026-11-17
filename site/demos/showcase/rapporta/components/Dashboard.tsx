"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  Ban,
  Bell,
  Blocks,
  Box,
  ChevronsUpDown,
  CircleCheck,
  LayoutGrid,
  Layers,
  type LucideIcon,
  Plus,
  Rocket,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  firstNewId,
  initialIncidents,
  kpis,
  newActivityTitles,
  notifications,
  origins,
  sections,
  todayIndex,
  units,
  windows,
  workspaces,
  type ColumnId,
  type Incident,
  type SectionId,
} from "../data/dashboard";
import { DashboardChart } from "./DashboardChart";
import { DashboardViews, type Filters } from "./DashboardViews";
import { dashboard as styles } from "@/demos/showcase/rapporta/styles";

const sectionIcons: Record<SectionId, LucideIcon> = {
  overview: Blocks,
  control: Box,
  integrations: LayoutGrid,
  queues: Layers,
  copilot: Sparkles,
};

const kpiIcons: Record<(typeof kpis)[number]["id"], LucideIcon> = {
  escalated: Rocket,
  review: Users,
  blocked: Ban,
  resolved: CircleCheck,
};

const order: ColumnId[] = ["detected", "acknowledged", "progress"];
const emptyFilters: Filters = { unit: "", origin: "", window: "" };

export function Dashboard() {
  const [section, setSection] = useState<SectionId>("overview");
  const [navQuery, setNavQuery] = useState("");
  const [query, setQuery] = useState("");
  const [workspace, setWorkspace] = useState(0);
  const [bellOpen, setBellOpen] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [filters, setFilters] = useState<Filters>(emptyFilters);

  const visible = useMemo(() => {
    const text = query.trim().toLowerCase();
    return incidents.filter(
      (item) =>
        (!filters.unit || item.handler === filters.unit) &&
        (!filters.origin || item.origin === filters.origin) &&
        (!filters.window || item.window === filters.window) &&
        (!text || `${item.title} ${item.id}`.toLowerCase().includes(text)),
    );
  }, [incidents, filters, query]);

  function addIncident(column: ColumnId) {
    setIncidents((current) => {
      const added = current.length - initialIncidents.length;
      const next: Incident = {
        id: `OPS-${firstNewId + added}`,
        title: newActivityTitles[added % newActivityTitles.length],
        column,
        origin: origins[added % origins.length],
        priority: "Medium Impact",
        handler: units[added % units.length],
        window: windows[added % windows.length],
        owner: "MO",
        startDay: todayIndex,
        dueDay: Math.min(todayIndex + 1 + (added % 3), 6),
      };
      return [next, ...current];
    });
  }

  function advance(id: string) {
    setIncidents((current) =>
      current.flatMap((item) => {
        if (item.id !== id) return [item];
        const index = order.indexOf(item.column);
        return index === order.length - 1 ? [] : [{ ...item, column: order[index + 1] }];
      }),
    );
  }

  const active = sections.find((item) => item.id === section) ?? sections[0];
  const ActiveIcon = sectionIcons[active.id];
  const navItems = sections.filter((item) => item.label.toLowerCase().includes(navQuery.trim().toLowerCase()));

  return (
    <div className={styles.app} role="group" aria-label="Rapporta control room, interactive demo">
      <aside className={styles.sidebar}>
        <div className={styles.workspace}>
          <button
            type="button"
            className={styles.workspaceButton}
            onClick={() => setWorkspace((value) => (value + 1) % workspaces.length)}
            aria-label={`Workspace: ${workspaces[workspace]}. Switch workspace`}
          >
            <span className={styles.workspaceMark} aria-hidden="true">
              <TrendingUp size={12} strokeWidth={3} />
            </span>
            <span className={styles.workspaceName}>{workspaces[workspace]}</span>
            <ChevronsUpDown size={12} aria-hidden="true" />
          </button>
          <label className={styles.search}>
            <Search size={12} aria-hidden="true" />
            <input
              type="search"
              placeholder="search"
              aria-label="Search sections"
              value={navQuery}
              onChange={(event) => setNavQuery(event.target.value)}
            />
          </label>
        </div>

        <nav aria-label="Dashboard sections" className={styles.sideNav}>
          {navItems.map((item) => {
            const Icon = sectionIcons[item.id];
            return (
              <button
                key={item.id}
                type="button"
                className={clsx(styles.sideItem, item.id === section && styles.sideItemActive)}
                aria-current={item.id === section ? "page" : undefined}
                onClick={() => setSection(item.id)}
              >
                <Icon size={14} aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
          {navItems.length === 0 && <p className={styles.empty}>No section matches.</p>}
        </nav>

        <div className={styles.user}>
          <span className={styles.userDot} aria-hidden="true" />
          <span>
            <strong>Mara Ortiz</strong>
            <small>Support lead</small>
          </span>
        </div>
      </aside>

      <div className={styles.main}>
        <div className={styles.topbar}>
          <p className={styles.title}>
            <ActiveIcon size={14} aria-hidden="true" />
            {active.label}
          </p>
          <label className={styles.topSearch}>
            <Search size={12} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search incidents by name or number..."
              aria-label="Search incidents"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSection("overview");
              }}
            />
          </label>
          <div className={styles.bellWrap}>
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Notifications"
              aria-expanded={bellOpen}
              onClick={() => setBellOpen((value) => !value)}
            >
              <Bell size={13} aria-hidden="true" />
            </button>
            {bellOpen && (
              <ul className={styles.popover}>
                {notifications.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            className={styles.newButton}
            onClick={() => {
              setSection("overview");
              addIncident("detected");
            }}
          >
            New activity <Plus size={12} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        {section === "overview" ? (
          <div className={styles.content}>
            <dl className={styles.kpis}>
              {kpis.map((kpi) => {
                const Icon = kpiIcons[kpi.id];
                return (
                  <div key={kpi.id} className={styles.kpi}>
                    <dt>
                      <Icon size={13} aria-hidden="true" />
                      {kpi.label}
                    </dt>
                    <dd>
                      <span className={styles.kpiValue}>{kpi.value}</span>
                      <span className={styles.kpiDelta}>
                        <TrendingUp size={11} aria-hidden="true" />
                        <b>{kpi.delta}</b> {kpi.note}
                      </span>
                    </dd>
                  </div>
                );
              })}
            </dl>

            <DashboardChart />

            <DashboardViews
              incidents={visible}
              filters={filters}
              onFilters={setFilters}
              onAdd={addIncident}
              onAdvance={advance}
            />
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.sectionPanel}>
              <p className={styles.sectionIntro}>{active.intro}</p>
              <dl>
                {active.rows.map((row) => (
                  <div key={row.label} className={styles.sectionRow}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
              <button type="button" className={styles.backButton} onClick={() => setSection("overview")}>
                Back to overview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
