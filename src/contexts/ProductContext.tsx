import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { products as defaultProducts, categories as defaultCategories } from "@/data/products";
import type { Product } from "@/data/products";

type ProductContextType = {
  products: Product[];
  categories: string[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY = "aquachem-products";

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const categories = [
    "Semua",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const addProduct = (product: Omit<Product, "id">) => {
    const id = crypto.randomUUID();
    setProducts((prev) => [...prev, { ...product, id }]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, categories, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
};
