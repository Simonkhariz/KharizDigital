"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { categories, products, type Category } from "../data/products";
import { ProductArt } from "./ProductArt";
import "./Collection.css";

type Filter = "All" | Category;
const filters: Filter[] = ["All", ...categories];

export function Collection() {
  const [filter, setFilter] = useState<Filter>("All");
  const [routine, setRoutine] = useState<string[]>([]);
  const [checkedOut, setCheckedOut] = useState(false);

  const visible = products.filter((product) => filter === "All" || product.category === filter);
  const chosen = products.filter((product) => routine.includes(product.id));
  const total = chosen.reduce((sum, product) => sum + product.price, 0);

  const toggle = (id: string) => {
    setCheckedOut(false);
    setRoutine((ids) => (ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]));
  };

  return (
    <section id="skincare" className="ae-section ae-collection" aria-labelledby="ae-collection-title">
      <div className="ae-wrap">
        <div className="ae-head">
          <h2 id="ae-collection-title" className="ae-h2">
            The Whole <em>Collection</em>
          </h2>
          <p className="ae-lede">Six products that cover a complete routine. Pick the ones you need and skip the rest.</p>
          <div className="ae-collection__filters" role="group" aria-label="Filter by step">
            {filters.map((item) => (
              <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <ul className="ae-collection__grid">
          {visible.map((product) => {
            const added = routine.includes(product.id);
            return (
              <li key={product.id} className="ae-product">
                <div className="ae-product__art">
                  <ProductArt bottle={product.bottle} id={`ae-p-${product.id}`} alt={`${product.name} bottle on a pale blue plinth`} />
                  <span className="ae-product__step">{product.category}</span>
                </div>
                <div className="ae-product__row">
                  <h3>{product.name}</h3>
                  <p className="ae-product__price">${product.price}</p>
                </div>
                <p className="ae-product__kind">
                  {product.kind}, {product.size}
                </p>
                <p className="ae-product__note">{product.note}</p>
                <button type="button" className={`ae-btn ${added ? "ae-btn--navy" : "ae-btn--line"}`} aria-pressed={added} onClick={() => toggle(product.id)}>
                  {added ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
                  {added ? "In Your Routine" : "Add To Routine"}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="ae-collection__bar" aria-live="polite">
          {chosen.length === 0 ? (
            <p>Your routine is empty. Add products above to see a total.</p>
          ) : checkedOut ? (
            <p>
              <strong>Thanks.</strong> This is a demo, so no order was placed and nothing was charged.
            </p>
          ) : (
            <>
              <p>
                <strong>
                  {chosen.length} {chosen.length === 1 ? "product" : "products"}, ${total}
                </strong>
                <span>{chosen.map((product) => product.name).join(", ")}</span>
              </p>
              <div className="ae-collection__actions">
                <button type="button" className="ae-btn ae-btn--ghost" onClick={() => setRoutine([])}>
                  Clear
                </button>
                <button type="button" className="ae-btn ae-btn--white" onClick={() => setCheckedOut(true)}>
                  Check Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
