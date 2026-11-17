"use client";

import { useEffect, useState } from "react";
import { fetchProducts, type Product } from "@/demos/lib/product";

/** Loads the product catalogue once on mount. */
const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const fetchedProducts = await fetchProducts();
        if (isMounted) {
          setProducts(fetchedProducts);
        }
      } catch (error) {
        if (isMounted) {
          setError(error instanceof Error ? error : Error("Failed to fetch products"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    products,
    isLoading,
    error,
  };
};

export { useProducts };
