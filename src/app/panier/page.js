"use client";

import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import { products } from "../data/products";

export default function CartPage() {
  const { items, isHydrated, updateQuantity, removeFromCart } = useCart();

  // Pendant l'hydratation, on évite tout flash visuel en n'affichant rien
  if (!isHydrated) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 min-h-[60vh]" />
    );
  }

  // État vide
  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Fil d'Ariane */}
        <nav className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-12 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-navy transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <span className="text-navy">Panier</span>
        </nav>

        {/* En-tête de page */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-stone mb-4">
            Votre sélection
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-navy">
            Panier
          </h1>
        </div>

        {/* Bloc état vide */}
        <div className="max-w-xl mx-auto text-center py-20">
          {/* Icône panier en grand */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            viewBox="0 0 24 24"
            className="mx-auto mb-8 text-stone"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>

          <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
            Votre panier est vide
          </h2>

          <p className="text-charcoal/70 leading-relaxed mb-10">
            Aucune pièce ne vous attend pour le moment. Découvrez notre
            sélection actuelle de prêt-à-porter et accessoires.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/boutique"
              className="inline-block text-xs tracking-[0.3em] uppercase bg-navy text-cream py-4 px-10 hover:bg-navy-dark transition-colors"
            >
              Découvrir la boutique
            </Link>
            <Link
              href="/nouveautes"
              className="inline-block text-xs tracking-[0.3em] uppercase border border-navy text-navy py-4 px-10 hover:bg-navy hover:text-cream transition-colors"
            >
              Voir les nouveautés
            </Link>
          </div>
        </div>

        {/* Mentions de réassurance */}
        <div className="border-t border-stone/30 mt-20 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-navy mb-2">
                Livraison offerte
              </p>
              <p className="text-sm text-charcoal/70">
                Dès 200 € en France métropolitaine
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-navy mb-2">
                Retours gratuits
              </p>
              <p className="text-sm text-charcoal/70">
                Sous 30 jours sans condition
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-navy mb-2">
                Service client
              </p>
              <p className="text-sm text-charcoal/70">
                Du lundi au vendredi, 9h - 18h
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

 // État rempli — Enrichissement des lignes avec les données produit
  const enrichedItems = items
    .map((item) => {
      const product = products.find((p) => p.sku === item.sku);
      if (!product) return null; // SKU disparu du catalogue, on ignore
      return {
        ...item,
        product,
        lineTotal: product.price_eur * item.quantity,
      };
    })
    .filter(Boolean);

  // Calculs récapitulatif
  const subtotal = enrichedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const shippingThreshold = 200;
  const shipping = subtotal >= shippingThreshold ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      {/* Fil d'Ariane */}
      <nav className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-12 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-navy transition-colors">
          Accueil
        </Link>
        <span>/</span>
        <span className="text-navy">Panier</span>
      </nav>

      {/* En-tête */}
      <div className="mb-12">
        <p className="text-xs tracking-[0.4em] uppercase text-stone mb-3">
          Votre sélection
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-navy">
          Panier
          <span className="ml-4 text-base text-charcoal/50 font-sans tracking-wide">
            {enrichedItems.length} {enrichedItems.length > 1 ? "pièces" : "pièce"}
          </span>
        </h1>
      </div>

      {/* Layout 2 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* COLONNE GAUCHE — Liste des articles */}
        <div className="lg:col-span-2 space-y-8">
          {enrichedItems.map((item) => (
            <article
              key={`${item.sku}-${item.size}`}
              className="flex gap-6 pb-8 border-b border-stone/30"
            >
              {/* Visuel produit */}
              <Link
                href={`/boutique/${item.sku}`}
                className="flex-shrink-0 block"
              >
                <div
                  className="w-28 h-36 md:w-32 md:h-40 flex items-end p-3"
                  style={{ backgroundColor: item.product.color_hex }}
                >
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase opacity-50"
                    style={{
                      color: isLightColor(item.product.color_hex)
                        ? "#2C2826"
                        : "#F5F1EB",
                    }}
                  >
                    {item.sku}
                  </span>
                </div>
              </Link>

              {/* Infos produit + actions */}
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-stone mb-2">
                      {item.product.category_l2_label}
                    </p>
                    <Link href={`/boutique/${item.sku}`}>
                      <h3 className="font-serif text-xl md:text-2xl text-navy hover:text-tobacco transition-colors leading-tight">
                        {item.product.name}
                      </h3>
                    </Link>
                  </div>
                  <p className="text-base text-charcoal whitespace-nowrap">
                    {item.lineTotal.toLocaleString("fr-FR")} €
                  </p>
                </div>

                <p className="text-sm text-charcoal/70 mb-4">
                  {item.product.color} · Taille {item.size}
                </p>

                {/* Bas de ligne : sélecteur quantité + supprimer */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-stone/40">
                    <button
                      onClick={() =>
                        updateQuantity(item.sku, item.size, item.quantity - 1)
                      }
                      className="w-9 h-9 hover:bg-cream-light transition-colors text-base"
                      aria-label="Diminuer la quantité"
                    >
                      −
                    </button>
                    <span className="w-9 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.sku, item.size, item.quantity + 1)
                      }
                      className="w-9 h-9 hover:bg-cream-light transition-colors text-base"
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.sku, item.size)}
                    className="text-xs tracking-[0.2em] uppercase text-charcoal/60 hover:text-tobacco transition-colors underline underline-offset-4"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* COLONNE DROITE — Récapitulatif */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-32 bg-cream-light/50 p-8 border border-stone/30">
            <h2 className="text-xs tracking-[0.3em] uppercase text-navy mb-8">
              Récapitulatif
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/70">Sous-total</span>
                <span className="text-charcoal">
                  {subtotal.toLocaleString("fr-FR")} €
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/70">Livraison estimée</span>
                <span className="text-charcoal">
                  {shipping === 0 ? "Offerte" : `${shipping} €`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-tobacco italic pt-2">
                  Plus que {(shippingThreshold - subtotal).toLocaleString("fr-FR")} €
                  pour bénéficier de la livraison offerte
                </p>
              )}
            </div>

            <div className="border-t border-stone/40 pt-4 mb-8">
              <div className="flex justify-between items-baseline">
                <span className="text-sm tracking-[0.2em] uppercase text-navy">
                  Total
                </span>
                <span className="text-2xl text-navy font-light">
                  {total.toLocaleString("fr-FR")} €
                </span>
              </div>
              <p className="text-xs text-charcoal/50 mt-1 text-right">
                TVA incluse
              </p>
            </div>

            <Link
              href="/checkout/livraison"
              className="block w-full py-4 text-xs tracking-[0.3em] uppercase bg-navy text-cream text-center hover:bg-navy-dark transition-colors mb-3"
            >
              Passer commande
            </Link>

            <Link
              href="/boutique"
              className="block w-full py-4 text-xs tracking-[0.3em] uppercase border border-navy text-navy text-center hover:bg-navy hover:text-cream transition-colors"
            >
              Continuer mes achats
            </Link>

            {/* Mentions de réassurance */}
            <div className="mt-8 pt-6 border-t border-stone/30 space-y-2 text-xs text-charcoal/60">
              <p>Paiement sécurisé</p>
              <p>Retours gratuits sous 30 jours</p>
              <p>Service client : du lundi au vendredi</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

// Helper réutilisé du ProductCard et de la fiche produit
function isLightColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}
