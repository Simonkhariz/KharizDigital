"use client";

import { useState } from "react";
import { ingredients } from "../data/content";
import { productById } from "../data/products";
import "./Ingredients.css";

export function Ingredients() {
  const [activeId, setActiveId] = useState(ingredients[0].id);
  const active = ingredients.find((item) => item.id === activeId) ?? ingredients[0];

  return (
    <section id="ingredients" className="ae-ingredients ae-on-sky" aria-labelledby="ae-ingredients-title">
      <div className="ae-wrap ae-ingredients__inner">
        <div>
          <h2 id="ae-ingredients-title" className="ae-h2">
            Five Actives, <em>Fully Explained</em>
          </h2>
          <p className="ae-lede">Choose an ingredient to see what it does, how much we use and where to find it.</p>
          <ul className="ae-ingredients__list">
            {ingredients.map((item, index) => (
              <li key={item.id}>
                <button type="button" aria-pressed={item.id === activeId} onClick={() => setActiveId(item.id)}>
                  <span>0{index + 1}</span>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="ae-ingredients__card" aria-live="polite" key={active.id}>
          <p className="ae-ingredients__strength">
            {active.strength}
            <span>in formula</span>
          </p>
          <h3>{active.name}</h3>
          <p className="ae-ingredients__source">{active.source}</p>
          <p>{active.does}</p>
          <p className="ae-ingredients__found">
            Found in{" "}
            {active.foundIn.map((id, index) => (
              <span key={id}>
                {index > 0 && " and "}
                <a href="#skincare">{productById(id)?.name}</a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
