"use client";

import {
  ArrowLeft,
  BarChart3,
  ChevronsUpDown,
  KanbanSquare,
  LayoutGrid,
  Menu,
  PanelLeft,
  Plus,
  Search,
  Settings as SettingsIcon,
  Table2,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useReducer, useState } from "react";
import type { FormEvent } from "react";
import { TODAY, isOpen } from "../../data/crm";
import { formatDay } from "../../data/metrics";
import { LogoMark } from "../Logo";
import { AddDealDialog } from "./AddDealDialog";
import { Contacts } from "./Contacts";
import { DealDrawer } from "./DealDrawer";
import { DealsTable } from "./DealsTable";
import { Overview } from "./Overview";
import { Pipeline } from "./Pipeline";
import { Reports } from "./Reports";
import { SettingsView } from "./SettingsView";
import { StoreContext, initialState, reducer } from "./store";
import type { ViewKey } from "./store";
import "./Dashboard.css";

const views: Array<{ key: ViewKey; label: string; icon: LucideIcon; group: "main" | "tools" }> = [
  { key: "overview", label: "Overview", icon: LayoutGrid, group: "main" },
  { key: "pipeline", label: "Pipeline", icon: KanbanSquare, group: "main" },
  { key: "deals", label: "Deals", icon: Table2, group: "main" },
  { key: "contacts", label: "Contacts", icon: Users, group: "main" },
  { key: "reports", label: "Reports", icon: BarChart3, group: "main" },
  { key: "settings", label: "Settings", icon: SettingsIcon, group: "tools" },
];

export function DashboardApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const store = useMemo(() => ({ state, dispatch }), [state]);
  const openCount = state.deals.filter((deal) => isOpen(deal.stage)).length;
  const current = views.find((view) => view.key === state.view) ?? views[0];
  const initials = state.settings.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  useEffect(() => {
    // Links from the landing page can open a specific view, for example /dashboard/#pipeline.
    const syncFromHash = () => {
      const requested = views.find((view) => `#${view.key}` === window.location.hash);
      if (requested) dispatch({ type: "view", view: requested.key });
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  useEffect(() => {
    if (!state.toast) return;
    const timer = window.setTimeout(() => dispatch({ type: "dismissToast" }), 3600);
    return () => window.clearTimeout(timer);
  }, [state.toast]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (view: ViewKey) => {
    dispatch({ type: "view", view });
    setMenuOpen(false);
  };

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    dispatch({ type: "filters", filters: { query: search.trim() }, open: true });
    setMenuOpen(false);
  };

  return (
    <StoreContext.Provider value={store}>
      <div className="cl-d-app" data-collapsed={collapsed} data-menu={menuOpen} data-compact={state.settings.compactTables}>
        <button
          type="button"
          className="cl-d-scrim"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        />
        <aside className="cl-d-side" id="cl-d-side" aria-label="Workspace">
          <div className="cl-d-side-top">
            <Link href="/demos/closient/" className="cl-d-brand" aria-label="Closient website">
              <LogoMark size={22} />
              <span>Closient</span>
            </Link>
            <button
              type="button"
              className="cl-d-icon-button cl-d-collapse"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-pressed={collapsed}
              onClick={() => setCollapsed((value) => !value)}
            >
              <PanelLeft size={18} aria-hidden="true" />
            </button>
            <button type="button" className="cl-d-icon-button cl-d-side-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <button type="button" className="cl-d-user" onClick={() => go("settings")} aria-label={`${state.settings.name}, open settings`}>
            <span className="cl-d-avatar" aria-hidden="true">
              {initials || "?"}
            </span>
            <span className="cl-d-user-text">
              <strong>{state.settings.name}</strong>
              <span>
                <em>TEAM</em> 6 seats
              </span>
            </span>
            <ChevronsUpDown size={16} aria-hidden="true" />
          </button>

          <form className="cl-d-search" role="search" onSubmit={submitSearch}>
            <Search size={16} aria-hidden="true" />
            <label className="cl-sr" htmlFor="cl-d-global-search">
              Search deals
            </label>
            <input
              id="cl-d-global-search"
              type="search"
              placeholder="Search deals"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <kbd aria-hidden="true">Enter</kbd>
          </form>

          <nav aria-label="Dashboard views">
            {(["main", "tools"] as const).map((group) => (
              <div key={group} className="cl-d-nav-group">
                <p className="cl-d-nav-title">{group === "main" ? "Main menu" : "Tools"}</p>
                <ul>
                  {views
                    .filter((view) => view.group === group)
                    .map((view) => (
                      <li key={view.key}>
                        <button
                          type="button"
                          className="cl-d-nav-item"
                          aria-current={state.view === view.key ? "page" : undefined}
                          title={view.label}
                          onClick={() => go(view.key)}
                        >
                          <view.icon size={17} aria-hidden="true" />
                          <span>{view.label}</span>
                          {view.key === "pipeline" && <em>{openCount}</em>}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </nav>

          <Link href="/demos/closient/" className="cl-d-nav-item cl-d-back" title="Back to website">
            <ArrowLeft size={17} aria-hidden="true" />
            <span>Back to website</span>
          </Link>
        </aside>

        <div className="cl-d-main">
          <header className="cl-d-top">
            <button
              type="button"
              className="cl-d-icon-button cl-d-menu-button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="cl-d-side"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
            <div className="cl-d-top-title">
              <h1>{current.label}</h1>
              <p>Demonstration data to {formatDay(TODAY)}</p>
            </div>
            <button type="button" className="cl-d-button cl-d-button-primary" aria-label="Add deal" onClick={() => dispatch({ type: "addOpen", open: true })}>
              <Plus size={16} aria-hidden="true" />
              <span>Add deal</span>
            </button>
          </header>

          <main className="cl-d-content" key={state.view}>
            {state.view === "overview" && <Overview />}
            {state.view === "pipeline" && <Pipeline />}
            {state.view === "deals" && <DealsTable />}
            {state.view === "contacts" && <Contacts />}
            {state.view === "reports" && <Reports />}
            {state.view === "settings" && <SettingsView />}
          </main>
        </div>

        <DealDrawer />
        <AddDealDialog />
        <div className="cl-d-toast" role="status" aria-live="polite">
          {state.toast && <p key={state.toast.id}>{state.toast.text}</p>}
        </div>
      </div>
    </StoreContext.Provider>
  );
}
