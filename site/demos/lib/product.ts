/** A product as returned by the store backend. */
export interface Product {
  id: string;
  name: string;
  price: string;
  imageSrc: string;
  brand?: string;
  variant?: string;
  rating?: number;
  reviewCount?: string;
  onProductClick?: () => void;
}

/** Loads the product catalogue. No store is connected, so the list is empty. */
const fetchProducts = async (): Promise<Product[]> => [];

/** Loads a single product by id. No store is connected, so nothing is found. */
const fetchProduct = async (productId: string): Promise<Product | null> => {
  void productId;
  return null;
};

export { fetchProduct, fetchProducts };
