"use client";

import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "maison-outremont-wishlist";

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch (e) {
      console.warn("Lecture wishlist impossible", e);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Écriture wishlist impossible", e);
    }
  }, [items, isHydrated]);

  const toggleWishlist = (sku) => {
    setItems((current) =>
      current.includes(sku) ? current.filter((s) => s !== sku) : [...current, sku]
    );
  };

  const removeFromWishlist = (sku) => {
    setItems((current) => current.filter((s) => s !== sku));
  };

  const isInWishlist = (sku) => items.includes(sku);

  const wishlistCount = items.length;

  return (
    <WishlistContext.Provider
      value={{ items, toggleWishlist, removeFromWishlist, isInWishlist, wishlistCount, isHydrated }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist doit être utilisé dans un WishlistProvider");
  return context;
}