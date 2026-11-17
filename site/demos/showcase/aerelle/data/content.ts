export const navLinks = [
  { label: "Skincare", href: "#skincare" },
  { label: "Journal", href: "#journal" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  titleStart: "Glow Starts",
  titleEnd: "With Pure",
  titleAccent: "Ingredients",
  body: "Formulated With Nature, Backed By Science. Feel Good About What Goes On Your Skin.",
  cta: "Shop The Collection",
};

export const credible = {
  title: "What Makes It Skin-Credible",
  body: "We believe skincare should be simple, luxurious, and effective, so we’ve stripped it down to only the most potent, proven ingredients that your skin will love.",
  cards: [
    {
      image: "jars-ledge.webp",
      width: 1000,
      height: 817,
      position: "50% 60%",
      title: "Short Formulas",
      body: "No product has more than fourteen ingredients, and every one is listed with its job.",
      alt: "Two plain white cosmetic jars leaning together on a marble ledge against a deep blue backdrop",
    },
    {
      image: "serum-bottle.webp",
      width: 1000,
      height: 937,
      position: "50% 50%",
      title: "Tested Concentrations",
      body: "Actives are used at the levels shown to work in published studies, never a token drop.",
      alt: "A clear glass dropper bottle of serum on a glossy blue surface with floating spheres",
    },
    {
      image: "cream-jar.webp",
      width: 1000,
      height: 563,
      position: "52% 50%",
      title: "Gentle By Default",
      body: "Fragrance-free and pH-balanced, made to sit comfortably on reactive skin.",
      alt: "An open blue glass jar of whipped cream nestled among smooth pale spheres",
    },
  ],
};

export type Ingredient = {
  id: string;
  name: string;
  source: string;
  does: string;
  foundIn: string[];
  strength: string;
};

export const ingredients: Ingredient[] = [
  {
    id: "niacinamide",
    name: "Niacinamide",
    source: "Vitamin B3",
    does: "Supports the skin barrier, evens tone and reduces the look of enlarged pores with steady use.",
    foundIn: ["blue-hour-serum"],
    strength: "5%",
  },
  {
    id: "hyaluronic",
    name: "Hyaluronic Acid",
    source: "Fermented from wheat",
    does: "Binds water in the upper layers of skin. We use three molecular weights so it works at more than one depth.",
    foundIn: ["dew-drop-concentrate", "daylight-essence"],
    strength: "1.5%",
  },
  {
    id: "ceramides",
    name: "Ceramides",
    source: "Plant-derived lipids",
    does: "Replace the fats that hold skin cells together, which is what keeps moisture in and irritants out.",
    foundIn: ["cirrus-cream"],
    strength: "2%",
  },
  {
    id: "squalane",
    name: "Squalane",
    source: "Sugarcane",
    does: "A light, stable oil that softens without clogging. It mirrors a lipid your skin already makes.",
    foundIn: ["cirrus-cream", "cloud-cleanser"],
    strength: "4%",
  },
  {
    id: "zinc",
    name: "Zinc Oxide",
    source: "Mineral",
    does: "Reflects and scatters UVA and UVB light. Non-nano particles stay on the surface of the skin.",
    foundIn: ["halo-mist"],
    strength: "18%",
  },
];

export const quiz = {
  title: "Get Your Formula",
  body: "Three questions, under a minute. We will suggest a routine from the collection and tell you why each product is in it.",
  steps: [
    {
      id: "skin",
      question: "How does your skin feel by midday?",
      options: [
        { id: "dry", label: "Tight or flaky" },
        { id: "oily", label: "Shiny all over" },
        { id: "combination", label: "Shiny in the centre, dry at the edges" },
        { id: "sensitive", label: "Easily red or stingy" },
      ],
    },
    {
      id: "concern",
      question: "What would you most like to change?",
      options: [
        { id: "dullness", label: "Dullness and uneven tone" },
        { id: "dehydration", label: "Dehydration and fine lines" },
        { id: "breakouts", label: "Breakouts and visible pores" },
        { id: "redness", label: "Redness and reactivity" },
      ],
    },
    {
      id: "time",
      question: "How long do you want your routine to take?",
      options: [
        { id: "short", label: "Two minutes, three products" },
        { id: "long", label: "Five minutes, four products" },
      ],
    },
  ],
} as const;

export const journal = [
  {
    id: "order",
    tag: "Routine",
    title: "The Order You Apply Things In Matters More Than The Number",
    minutes: 4,
    body: [
      "A useful rule is thinnest to thickest. Watery layers go first because they cannot get through an oil or a cream, while a cream can happily sit on top of a serum.",
      "That gives most people the same sequence: cleanse, essence, serum, moisturiser, and sunscreen in the morning. If you only have time for three, keep the cleanser, one treatment and the last protective layer.",
    ],
  },
  {
    id: "percent",
    tag: "Ingredients",
    title: "What A Percentage On The Label Does And Does Not Tell You",
    minutes: 5,
    body: [
      "A higher number is not automatically better. Niacinamide is well studied between two and five percent, and going far beyond that mostly raises the chance of flushing.",
      "The base matters as much as the active. The same concentration can behave differently depending on pH and what it is dissolved in, which is why we publish the full formula and not just the headline figure.",
    ],
  },
  {
    id: "barrier",
    tag: "Skin Science",
    title: "How To Tell If Your Skin Barrier Needs A Rest",
    minutes: 3,
    body: [
      "Stinging from products that never used to sting, tightness after washing and patches that look both shiny and flaky are the usual signs.",
      "The fix is boring and reliable: stop exfoliating for two weeks, wash with lukewarm water, and use a moisturiser with ceramides morning and night. Add actives back one at a time.",
    ],
  },
];

export const about = {
  title: "Made Small, On Purpose",
  body: [
    "Aerelle started with one question: how few ingredients does a product need to do its job well? The answer was usually fewer than twenty, and often fewer than ten.",
    "We make six products in small batches, publish every formula in full, and change one only when the evidence does.",
  ],
  facts: [
    { figure: "6", label: "Products in the whole range" },
    { figure: "14", label: "Ingredients at most in any formula" },
    { figure: "0", label: "Added fragrance or dye" },
  ],
};

export const contact = {
  title: "Ask Us Anything",
  body: "Questions about an ingredient, an order or which product comes first? Write to us and a person on the formulation team will reply.",
  topics: ["A product or ingredient", "My routine", "An order", "Something else"],
};

export const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "The Collection", href: "#skincare" },
      { label: "Get Your Formula", href: "#formula" },
      { label: "Ingredients", href: "#ingredients" },
    ],
  },
  {
    title: "Aerelle",
    links: [
      { label: "About", href: "#about" },
      { label: "Journal", href: "#journal" },
      { label: "Contact", href: "#contact" },
    ],
  },
];
