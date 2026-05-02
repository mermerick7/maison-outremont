"use client";

import { useState } from "react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function BoutiquePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  // Filtrer les produits
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category_l1 === activeCategory);

  // Trier les produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price_eur - b.price_eur;
    if (sortBy === "price-desc") return b.price_eur - a.price_eur;
    if (sortBy === "new") return (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0);
    // Featured (défaut) : produits featured en premier
    return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
  });

  return (
    <main className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
      {/* En-tête de page */}
      <div className="text-center mb-16 md:mb-20">
        <p className="text-xs tracking-[0.4em] text-stone uppercase mb-4">
          Collection automne-hiver 2026
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-navy mb-6">
          La boutique
        </h1>
        <p className="text-base text-charcoal/70 max-w-xl mx-auto leading-relaxed">
          Une sélection rigoureuse de pièces intemporelles, taillées
          avec exigence dans nos ateliers européens.
        </p>
      </div>

      {/* Barre de filtres et tri */}
      <div className="border-y border-stone/30 py-6 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Filtres catégories */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            onClick={() => setActiveCategory("all")}
            className={`text-xs tracking-[0.2em] uppercase transition-colors ${
              activeCategory === "all"
                ? "text-navy font-medium"
                : "text-charcoal/60 hover:text-navy"
            }`}
          >
            Tout voir ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter(
              (p) => p.category_l1 === cat.slug
            ).length;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`text-xs tracking-[0.2em] uppercase transition-colors ${
                  activeCategory === cat.slug
                    ? "text-navy font-medium"
                    : "text-charcoal/60 hover:text-navy"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Tri */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="text-xs tracking-[0.2em] uppercase text-charcoal/60"
          >
            Trier
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-b border-stone/40 py-1 text-xs tracking-wide text-charcoal focus:outline-none focus:border-navy cursor-pointer"
          >
            <option value="featured">Sélection</option>
            <option value="new">Nouveautés</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>
      </div>

      {/* Compteur résultats */}
      <p className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-8">
        {sortedProducts.length} pièce
        {sortedProducts.length > 1 ? "s" : ""}
      </p>

      {/* Grille produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {sortedProducts.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>

      {/* État vide (au cas où) */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-24">
          <p className="text-charcoal/60 italic font-serif text-xl">
            Aucune pièce dans cette catégorie pour le moment.
          </p>
        </div>
      )}
    </main>
  );
}