"use client";

import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, ChevronsUpDown, Search, X } from "lucide-react";
import { useState } from "react";
import { companyById, isOpen, repById, reps, stageMeta, stageOrder } from "../../data/crm";
import type { Deal } from "../../data/crm";
import { formatDay, formatMoney } from "../../data/metrics";
import { StageBadge } from "./Shared";
import { useStore } from "./store";
import type { DealFilters } from "./store";

type SortKey = "id" | "title" | "owner" | "stage" | "amount" | "created" | "close";

const columns: Array<{ key: SortKey; label: string; numeric?: boolean }> = [
  { key: "id", label: "ID" },
  { key: "title", label: "Deal" },
  { key: "owner", label: "Owner" },
  { key: "stage", label: "Stage" },
  { key: "amount", label: "Amount", numeric: true },
  { key: "created", label: "Created" },
  { key: "close", label: "Close date" },
];

const sorters: Record<SortKey, (a: Deal, b: Deal) => number> = {
  id: (a, b) => Number(a.id.slice(3)) - Number(b.id.slice(3)),
  title: (a, b) => a.title.localeCompare(b.title),
  owner: (a, b) => repById(a.ownerId).name.localeCompare(repById(b.ownerId).name),
  stage: (a, b) => stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage),
  amount: (a, b) => a.amount - b.amount,
  created: (a, b) => a.createdDay - b.createdDay,
  close: (a, b) => a.closeDay - b.closeDay,
};

const PAGE_SIZE = 10;

export function DealsTable() {
  const { state, dispatch } = useStore();
  const { filters } = state;
  const [sort, setSort] = useState<{ key: SortKey; descending: boolean }>({ key: "created", descending: true });
  const [page, setPage] = useState(1);

  const setFilters = (next: Partial<DealFilters>) => {
    dispatch({ type: "filters", filters: next });
    setPage(1);
  };

  const query = filters.query.trim().toLowerCase();
  const matching = state.deals.filter((deal) => {
    if (filters.stage === "open" ? !isOpen(deal.stage) : filters.stage !== "all" && deal.stage !== filters.stage) return false;
    if (filters.owner !== "all" && deal.ownerId !== filters.owner) return false;
    if (!query) return true;
    const company = companyById(deal.companyId);
    return [deal.id, deal.title, company.contact, repById(deal.ownerId).name, deal.source].some((text) =>
      text.toLowerCase().includes(query),
    );
  });
  const sorted = [...matching].sort((a, b) => {
    const result = sorters[sort.key](a, b) || sorters.id(a, b);
    return sort.descending ? -result : result;
  });
  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const rows = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const total = matching.reduce((sum, deal) => sum + deal.amount, 0);
  const filtered = Boolean(query) || filters.stage !== "all" || filters.owner !== "all";

  const toggleSort = (key: SortKey) => {
    setSort((value) => ({ key, descending: value.key === key ? !value.descending : key === "amount" || key === "created" }));
    setPage(1);
  };

  return (
    <section className="cl-d-card cl-d-table-card" aria-label="Deals">
      <div className="cl-d-toolbar">
        <label className="cl-d-search cl-d-search-inline">
          <Search size={16} aria-hidden="true" />
          <span className="cl-sr">Search deals</span>
          <input
            type="search"
            placeholder="Search by deal, company, contact or ID"
            value={filters.query}
            onChange={(event) => setFilters({ query: event.target.value })}
          />
        </label>
        <label className="cl-d-select">
          <span className="cl-sr">Stage</span>
          <select value={filters.stage} onChange={(event) => setFilters({ stage: event.target.value as DealFilters["stage"] })}>
            <option value="all">All stages</option>
            <option value="open">Open deals</option>
            {stageOrder.map((stage) => (
              <option key={stage} value={stage}>
                {stageMeta[stage].label}
              </option>
            ))}
          </select>
        </label>
        <label className="cl-d-select">
          <span className="cl-sr">Owner</span>
          <select value={filters.owner} onChange={(event) => setFilters({ owner: event.target.value })}>
            <option value="all">All owners</option>
            {reps.map((rep) => (
              <option key={rep.id} value={rep.id}>
                {rep.name}
              </option>
            ))}
          </select>
        </label>
        {filtered && (
          <button type="button" className="cl-d-link" onClick={() => setFilters({ query: "", stage: "all", owner: "all" })}>
            <X size={14} aria-hidden="true" /> Clear
          </button>
        )}
      </div>

      <p className="cl-d-count" aria-live="polite">
        {matching.length} {matching.length === 1 ? "deal" : "deals"} · {formatMoney(total)} in total
      </p>

      <div className="cl-d-table-wrap">
        <table className="cl-d-table">
          <thead>
            <tr>
              {columns.map((column) => {
                const active = sort.key === column.key;
                return (
                  <th
                    key={column.key}
                    scope="col"
                    className={column.numeric ? "cl-d-num" : undefined}
                    aria-sort={active ? (sort.descending ? "descending" : "ascending") : "none"}
                  >
                    <button type="button" onClick={() => toggleSort(column.key)}>
                      {column.label}
                      {active ? (
                        sort.descending ? (
                          <ArrowDown size={13} aria-hidden="true" />
                        ) : (
                          <ArrowUp size={13} aria-hidden="true" />
                        )
                      ) : (
                        <ChevronsUpDown size={13} aria-hidden="true" />
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((deal) => {
              const company = companyById(deal.companyId);
              return (
                <tr key={deal.id} onClick={() => dispatch({ type: "select", id: deal.id })}>
                  <td className="cl-d-mono" data-label="ID">
                    {deal.id}
                  </td>
                  <td data-label="Deal" className="cl-d-cell-title">
                    <button type="button" onClick={() => dispatch({ type: "select", id: deal.id })}>
                      {deal.title}
                    </button>
                    <small>{company.contact}</small>
                  </td>
                  <td data-label="Owner">{repById(deal.ownerId).name}</td>
                  <td data-label="Stage">
                    <StageBadge stage={deal.stage} />
                  </td>
                  <td data-label="Amount" className="cl-d-num">
                    {formatMoney(deal.amount)}
                  </td>
                  <td data-label="Created">{formatDay(deal.createdDay)}</td>
                  <td data-label={isOpen(deal.stage) ? "Expected close" : "Closed"}>{formatDay(deal.closeDay)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && <p className="cl-d-empty">No deals match these filters.</p>}
      </div>

      <nav className="cl-d-pager" aria-label="Pagination">
        <p>
          {sorted.length === 0
            ? "0 results"
            : `${(currentPage - 1) * PAGE_SIZE + 1} to ${Math.min(currentPage * PAGE_SIZE, sorted.length)} of ${sorted.length}`}
        </p>
        <div>
          <button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
            <ChevronLeft size={15} aria-hidden="true" /> Previous
          </button>
          <span>
            Page {currentPage} of {pageCount}
          </span>
          <button type="button" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>
            Next <ChevronRight size={15} aria-hidden="true" />
          </button>
        </div>
      </nav>
    </section>
  );
}
