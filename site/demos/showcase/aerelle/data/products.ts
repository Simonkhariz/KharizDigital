export type Category = "Cleanse" | "Treat" | "Moisturise" | "Protect";
export type BottleKind = "pump" | "cap" | "serum" | "dropper" | "jar" | "mist";

export type Product = {
  id: string;
  name: string;
  kind: string;
  category: Category;
  size: string;
  price: number;
  bottle: BottleKind;
  key: string;
  note: string;
};

export const categories: Category[] = ["Cleanse", "Treat", "Moisturise", "Protect"];

export const products: Product[] = [
  {
    id: "cloud-cleanser",
    name: "Cloud Cleanser",
    kind: "Gel-to-foam cleanser",
    category: "Cleanse",
    size: "200 ml",
    price: 28,
    bottle: "pump",
    key: "Oat amino acids",
    note: "Lifts sunscreen and the day without leaving skin tight.",
  },
  {
    id: "daylight-essence",
    name: "Daylight Essence",
    kind: "Hydrating essence",
    category: "Treat",
    size: "150 ml",
    price: 34,
    bottle: "cap",
    key: "Glycerin and panthenol",
    note: "A watery first layer that helps everything after it sink in.",
  },
  {
    id: "blue-hour-serum",
    name: "Blue Hour Serum",
    kind: "Niacinamide serum",
    category: "Treat",
    size: "30 ml",
    price: 46,
    bottle: "serum",
    key: "5% niacinamide",
    note: "Evens tone and calms the look of pores over a few weeks.",
  },
  {
    id: "dew-drop-concentrate",
    name: "Dew Drop Concentrate",
    kind: "Hyaluronic drops",
    category: "Treat",
    size: "30 ml",
    price: 42,
    bottle: "dropper",
    key: "Three weights of hyaluronic acid",
    note: "Holds water at the surface and just beneath it.",
  },
  {
    id: "cirrus-cream",
    name: "Cirrus Cream",
    kind: "Barrier moisturiser",
    category: "Moisturise",
    size: "50 ml",
    price: 38,
    bottle: "jar",
    key: "Ceramides and squalane",
    note: "A whipped cream that seals in the layers underneath.",
  },
  {
    id: "halo-mist",
    name: "Halo Mist SPF 30",
    kind: "Daily mineral sunscreen",
    category: "Protect",
    size: "75 ml",
    price: 32,
    bottle: "mist",
    key: "Non-nano zinc oxide",
    note: "A sheer finish that sits well under or over make-up.",
  },
];

export const productById = (id: string) => products.find((product) => product.id === id);
