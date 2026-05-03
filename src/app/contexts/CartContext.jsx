"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "maison-outremont-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydratation au premier render côté client uniquement
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Lecture localStorage impossible", e);
    }
    setIsHydrated(true);
  }, []);

  // Sauvegarde à chaque changement, mais SEULEMENT après hydratation
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Écriture localStorage impossible", e);
    }
  }, [items, isHydrated]);

  // Ajouter un article (incrémente si déjà présent dans la même taille)
  const addToCart = (sku, size, quantity = 1) => {
    setItems((current) => {
      const existingIndex = current.findIndex(
        (item) => item.sku === sku && item.size === size
      );
      if (existingIndex >= 0) {
        const updated = [...current];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...current, { sku, size, quantity }];
    });
  };

  // Retirer complètement une ligne du panier
  const removeFromCart = (sku, size) => {
    setItems((current) =>
      current.filter((item) => !(item.sku === sku && item.size === size))
    );
  };

  // Modifier la quantité d'une ligne (supprime si 0 ou moins)
  const updateQuantity = (sku, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(sku, size);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.sku === sku && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Vider le panier (utile après une commande)
  const clearCart = () => setItems([]);

  // Nombre total d'articles (somme des quantités, pas des lignes)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook custom pour consommer le context plus simplement
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider");
  }
  return context;
}