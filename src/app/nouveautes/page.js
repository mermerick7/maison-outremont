"use client";

import Link from "next/link";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function NouveautesPage() {
  const newProducts = products.filter((p) => p.is_new);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <nav className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-12 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-navy transition-colors">Accueil</Link>
        <span>/</span>
        <span className="text-navy">Nouveautés</span>
      </nav>

      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] uppercase text-stone mb-4">Collection FW26</p>
        <h1 className="font-serif text-4xl md:text-5xl text-navy mb-6">Nouveautés</h1>
        <p className="text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
          Les dernières pièces ajoutées à notre vestiaire. Tailoring contemporain et savoir-faire français, entre tradition et modernité.
        </p>
      </div>

      {newProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-charcoal/60 mb-8">Aucune nouveauté actuellement.</p>
          <Link
            href="/boutique"
            className="inline-block text-xs tracking-[0.3em] uppercase bg-navy text-cream py-4 px-10 hover:bg-navy-dark transition-colors"
          >
            Découvrir la boutique
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-charcoal/60 mb-8">
            {newProducts.length} {newProducts.length > 1 ? "pièces" : "pièce"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {newProducts.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}