"use client";

import Link from "next/link";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { products } from "../data/products";

export default function WishlistPage() {
  const { items, removeFromWishlist, isHydrated } = useWishlist();
  const { addToCart } = useCart();

  if (!isHydrated) {
    return <main className="max-w-7xl mx-auto px-6 py-16 min-h-[60vh]" />;
  }

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <nav className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-12 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-navy transition-colors">Accueil</Link>
          <span>/</span>
          <span className="text-navy">Liste de souhaits</span>
        </nav>

        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-stone mb-4">Vos pièces préférées</p>
          <h1 className="font-serif text-4xl md:text-5xl text-navy">Liste de souhaits</h1>
        </div>

        <div className="max-w-xl mx-auto text-center py-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" className="mx-auto mb-8 text-stone">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
          </svg>
          <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">Aucune pièce sauvegardée</h2>
          <p className="text-charcoal/70 leading-relaxed mb-10">
            Marquez vos pièces favorites pour les retrouver facilement et suivre leur disponibilité.
          </p>
          <Link
            href="/boutique"
            className="inline-block text-xs tracking-[0.3em] uppercase bg-navy text-cream py-4 px-10 hover:bg-navy-dark transition-colors"
          >
            Découvrir la boutique
          </Link>
        </div>
      </main>
    );
  }

  const wishlistedProducts = items
    .map((sku) => products.find((p) => p.sku === sku))
    .filter(Boolean);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <nav className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-12 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-navy transition-colors">Accueil</Link>
        <span>/</span>
        <span className="text-navy">Liste de souhaits</span>
      </nav>

      <div className="mb-12">
        <p className="text-xs tracking-[0.4em] uppercase text-stone mb-3">Vos pièces préférées</p>
        <h1 className="font-serif text-4xl md:text-5xl text-navy">
          Liste de souhaits
          <span className="ml-4 text-base text-charcoal/50 font-sans tracking-wide">
            {wishlistedProducts.length} {wishlistedProducts.length > 1 ? "pièces" : "pièce"}
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {wishlistedProducts.map((product) => (
          <article key={product.sku} className="group">
            <Link href={`/boutique/${product.sku}`}>
              <div
                className="aspect-[4/5] w-full flex items-end p-6 mb-4 relative"
                style={{ backgroundColor: product.color_hex }}
              >
                {product.is_new && (
                  <span className="absolute top-4 right-4 text-[10px] tracking-[0.3em] uppercase bg-cream/90 text-navy px-3 py-1.5">
                    Nouveauté
                  </span>
                )}
              </div>
            </Link>

            <div className="space-y-2">
              <p className="text-xs tracking-[0.2em] uppercase text-stone">
                {product.category_l2_label}
              </p>
              <Link href={`/boutique/${product.sku}`}>
                <h3 className="font-serif text-xl text-navy hover:text-tobacco transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-charcoal/70">
                {product.color} · {product.material_primary}
              </p>
              <p className="text-base text-charcoal pt-1">
                {product.price_eur.toLocaleString("fr-FR")} €
              </p>

              <div className="pt-4 flex flex-col gap-2">
                <Link
                  href={`/boutique/${product.sku}`}
                  className="block w-full py-3 text-[10px] tracking-[0.3em] uppercase bg-navy text-cream text-center hover:bg-navy-dark transition-colors"
                >
                  Voir la pièce
                </Link>
                <button
                  onClick={() => removeFromWishlist(product.sku)}
                  className="text-xs tracking-[0.2em] uppercase text-charcoal/60 hover:text-tobacco transition-colors underline underline-offset-4 self-center"
                >
                  Retirer
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}