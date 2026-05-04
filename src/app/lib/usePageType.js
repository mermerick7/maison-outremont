// src/app/lib/usePageType.js
// Hook utilitaire : infère le page_type GA4 depuis le pathname courant.
// Utilisé par le layout pour pousser la variable persistante page_type.

"use client";

import { usePathname } from "next/navigation";

export function usePageType() {
  const pathname = usePathname();

  if (pathname === "/") return "home";
  if (pathname === "/boutique") return "category";
  if (pathname.startsWith("/boutique/")) return "product";
  if (pathname === "/panier") return "cart";
  if (pathname.startsWith("/checkout/")) return "checkout";
  if (pathname === "/compte") return "account";
  if (pathname === "/wishlist") return "wishlist";
  if (
    pathname === "/atelier" ||
    pathname === "/nouveautes" ||
    pathname === "/magazine" ||
    pathname.startsWith("/magazine/")
  ) {
    return "content";
  }

  return "other"; // fallback pour les pages non listées
}