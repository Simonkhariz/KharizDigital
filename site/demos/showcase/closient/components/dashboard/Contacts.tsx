"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { companies, isOpen } from "../../data/crm";
import { formatMoney } from "../../data/metrics";
import { useStore } from "./store";

export function Contacts() {
  const { state, dispatch } = useStore();
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("all");
  const industries = [...new Set(companies.map((company) => company.industry))].sort();
  const text = query.trim().toLowerCase();

  const rows = companies
    .filter((company) => industry === "all" || company.industry === industry)
    .filter((company) =>
      text ? [company.name, company.contact, company.city, company.role].some((value) => value.toLowerCase().includes(text)) : true,
    )
    .map((company) => {
      const deals = state.deals.filter((deal) => deal.companyId === company.id);
      return {
        company,
        dealCount: deals.length,
        openCount: deals.filter((deal) => isOpen(deal.stage)).length,
        won: deals.filter((deal) => deal.stage === "won").reduce((sum, deal) => sum + deal.amount, 0),
      };
    })
    .sort((a, b) => b.won - a.won);

  return (
    <section className="cl-d-card cl-d-table-card" aria-label="Contacts">
      <div className="cl-d-toolbar">
        <label className="cl-d-search cl-d-search-inline">
          <Search size={16} aria-hidden="true" />
          <span className="cl-sr">Search contacts</span>
          <input
            type="search"
            placeholder="Search by name, company or city"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="cl-d-select">
          <span className="cl-sr">Industry</span>
          <select value={industry} onChange={(event) => setIndustry(event.target.value)}>
            <option value="all">All industries</option>
            {industries.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="cl-d-count" aria-live="polite">
        {rows.length} {rows.length === 1 ? "contact" : "contacts"}, ordered by won revenue
      </p>
      {rows.length === 0 ? (
        <p className="cl-d-empty">No contacts match this search.</p>
      ) : (
        <ul className="cl-d-contacts">
          {rows.map(({ company, dealCount, openCount, won }) => (
            <li key={company.id}>
              <span className="cl-d-avatar" aria-hidden="true">
                {company.contact
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
              <div className="cl-d-contact-main">
                <strong>{company.contact}</strong>
                <span>
                  {company.role}, {company.name}
                </span>
                <span className="cl-d-mono">{company.email}</span>
              </div>
              <dl>
                <div>
                  <dt>Industry</dt>
                  <dd>{company.industry}</dd>
                </div>
                <div>
                  <dt>City</dt>
                  <dd>{company.city}</dd>
                </div>
                <div>
                  <dt>Deals</dt>
                  <dd>
                    {dealCount} ({openCount} open)
                  </dd>
                </div>
                <div>
                  <dt>Won</dt>
                  <dd>{formatMoney(won)}</dd>
                </div>
              </dl>
              <button
                type="button"
                className="cl-d-button"
                disabled={dealCount === 0}
                onClick={() => dispatch({ type: "filters", filters: { query: company.name }, open: true })}
              >
                View deals
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
