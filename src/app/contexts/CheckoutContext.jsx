"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CheckoutContext = createContext(null);

const STORAGE_KEY = "maison-outremont-checkout";

const initialCheckoutData = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  addressComplement: "",
  postalCode: "",
  city: "",
  country: "France",
  phone: "",
  shippingMethod: "standard",
  paymentMethod: "",
  promoCode: "",
};

export function CheckoutProvider({ children }) {
  const [data, setData] = useState(initialCheckoutData);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydratation depuis localStorage au premier render client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge avec initialCheckoutData pour gérer les nouveaux champs ajoutés
        // après un déploiement (sinon les anciens visiteurs auraient des champs manquants)
        setData({ ...initialCheckoutData, ...parsed });
      }
    } catch (e) {
      console.warn("Lecture localStorage checkout impossible", e);
    }
    setIsHydrated(true);
  }, []);

  // Sauvegarde à chaque changement, mais après hydratation
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Écriture localStorage checkout impossible", e);
    }
  }, [data, isHydrated]);

  // Mise à jour partielle (un seul champ ou plusieurs en même temps)
  const updateCheckout = (partialData) => {
    setData((current) => ({ ...current, ...partialData }));
  };

  // Reset complet (à appeler après un purchase réussi)
  const resetCheckout = () => setData(initialCheckoutData);

  return (
    <CheckoutContext.Provider
      value={{
        data,
        updateCheckout,
        resetCheckout,
        isHydrated,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

// Hook custom pour consommer le context
export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout doit être utilisé à l'intérieur d'un CheckoutProvider");
  }
  return context;
}