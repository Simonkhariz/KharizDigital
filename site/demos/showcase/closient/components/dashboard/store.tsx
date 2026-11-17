"use client";

import { createContext, useContext } from "react";
import type { Dispatch } from "react";
import { TODAY, currentUser, initialDeals } from "../../data/crm";
import type { Deal, Stage } from "../../data/crm";
import type { RangeKey } from "../../data/metrics";

export type ViewKey = "overview" | "pipeline" | "deals" | "contacts" | "reports" | "settings";

export interface DealFilters {
  query: string;
  stage: Stage | "all" | "open";
  owner: string;
}

export interface Settings {
  name: string;
  email: string;
  /** Multiplier applied to every rep's quota. */
  quotaScale: number;
  compactTables: boolean;
  notifyStalled: boolean;
  notifyWon: boolean;
  weeklyDigest: boolean;
}

export interface State {
  deals: Deal[];
  view: ViewKey;
  range: RangeKey;
  owner: string;
  filters: DealFilters;
  selectedDealId: string | null;
  addOpen: boolean;
  toast: { id: number; text: string } | null;
  settings: Settings;
}

export type NewDeal = Pick<Deal, "title" | "companyId" | "ownerId" | "stage" | "amount" | "source" | "closeDay">;

export type Action =
  | { type: "view"; view: ViewKey }
  | { type: "range"; range: RangeKey }
  | { type: "owner"; owner: string }
  | { type: "filters"; filters: Partial<DealFilters>; open?: boolean }
  | { type: "select"; id: string | null }
  | { type: "addOpen"; open: boolean }
  | { type: "addDeal"; deal: NewDeal }
  | { type: "stage"; id: string; stage: Stage }
  | { type: "note"; id: string; text: string }
  | { type: "settings"; settings: Settings }
  | { type: "reset" }
  | { type: "toast"; text: string }
  | { type: "dismissToast" };

const defaultFilters: DealFilters = { query: "", stage: "all", owner: "all" };

export const defaultSettings: Settings = {
  name: currentUser.name,
  email: "amara@closient.example",
  quotaScale: 1,
  compactTables: false,
  notifyStalled: true,
  notifyWon: true,
  weeklyDigest: false,
};

export const initialState: State = {
  deals: initialDeals,
  view: "overview",
  range: "12m",
  owner: "all",
  filters: defaultFilters,
  selectedDealId: null,
  addOpen: false,
  toast: null,
  settings: defaultSettings,
};

let toastCounter = 0;
const toast = (text: string) => ({ id: (toastCounter += 1), text });

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "view":
      return { ...state, view: action.view };
    case "range":
      return { ...state, range: action.range };
    case "owner":
      return { ...state, owner: action.owner };
    case "filters":
      return {
        ...state,
        filters: { ...(action.open ? defaultFilters : state.filters), ...action.filters },
        view: action.open ? "deals" : state.view,
      };
    case "select":
      return { ...state, selectedDealId: action.id };
    case "addOpen":
      return { ...state, addOpen: action.open };
    case "addDeal": {
      const nextNumber = 1001 + state.deals.length;
      const deal: Deal = { ...action.deal, id: `CL-${nextNumber}`, createdDay: TODAY, notes: [] };
      return {
        ...state,
        deals: [...state.deals, deal],
        addOpen: false,
        selectedDealId: deal.id,
        toast: toast(`${deal.id} added to the pipeline.`),
      };
    }
    case "stage":
      return {
        ...state,
        deals: state.deals.map((deal) => {
          if (deal.id !== action.id || deal.stage === action.stage) return deal;
          const closing = action.stage === "won" || action.stage === "lost";
          const reopening = !closing && (deal.stage === "won" || deal.stage === "lost");
          return {
            ...deal,
            stage: action.stage,
            // Closing a deal stamps it with today's date; reopening gives it a fresh 30-day target.
            closeDay: closing ? TODAY : reopening ? TODAY + 30 : deal.closeDay,
          };
        }),
        toast: toast(`${action.id} moved to ${action.stage === "won" ? "Won" : action.stage === "lost" ? "Lost" : action.stage}.`),
      };
    case "note":
      return {
        ...state,
        deals: state.deals.map((deal) =>
          deal.id === action.id ? { ...deal, notes: [...deal.notes, { day: TODAY, text: action.text }] } : deal,
        ),
      };
    case "settings":
      return { ...state, settings: action.settings, toast: toast("Settings saved for this session.") };
    case "reset":
      return { ...initialState, view: "settings", toast: toast("Demo data restored.") };
    case "toast":
      return { ...state, toast: toast(action.text) };
    case "dismissToast":
      return { ...state, toast: null };
  }
}

interface Store {
  state: State;
  dispatch: Dispatch<Action>;
}

export const StoreContext = createContext<Store | null>(null);

export function useStore(): Store {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used inside the dashboard");
  return store;
}
