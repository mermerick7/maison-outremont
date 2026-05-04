"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { trackViewItem, trackAddToCart } from "../../lib/analytics";

export default function ProductPage({ params }) {
  const { sku } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist, isHydrated: wishlistHydrated } = useWishlist();

  const product = products.find((p) => p.sku === sku);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeError, setShowSizeError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
// Tracking GA4 : déclenche view_item quand un produit valide est affiché.
  // Dépendance product?.sku (et non product) pour éviter des re-runs sur chaque render.
  useEffect(() => {
    if (product) {
      trackViewItem(product);
    }
  }, [product?.sku]);

  if (!product) {
    return (
      <main className="px-6 py-32 max-w-2xl mx-auto text-center">
        <h1 className="font-serif text-4xl text-navy mb-4">
          Pièce introuvable
        </h1>
        <p className="text-charcoal/70 mb-8">
          La pièce que vous recherchez n&apos;existe plus dans notre vestiaire.
        </p>
        <Link
          href="/boutique"
          className="inline-block text-xs tracking-[0.3em] uppercase border border-navy py-3 px-8 hover:bg-navy hover:text-cream transition-colors"
        >
          Retour à la boutique
        </Link>
      </main>
    );
  }

  const suggestedProducts = products
    .filter(
      (p) => p.category_l1 === product.category_l1 && p.sku !== product.sku
    )
    .slice(0, 3);

  const handleAddToCart = () => {
  if (!selectedSize) {
    setShowSizeError(true);
    return;
  }
  addToCart(product.sku, selectedSize, quantity);
  trackAddToCart(product, { size: selectedSize, quantity });
  setAddedToCart(true);
  setTimeout(() => setAddedToCart(false), 2500);
};

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <nav className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-8 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-navy transition-colors">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/boutique" className="hover:text-navy transition-colors">
          Boutique
        </Link>
        <span>/</span>
        <span className="text-navy">{product.category_l1_label}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24">
        <div className="md:sticky md:top-32 md:self-start">
          <div
            className="aspect-[4/5] w-full flex items-end p-8 relative overflow-hidden"
            style={{ backgroundColor: product.color_hex }}
          >
            {product.is_new && (
              <span className="absolute top-6 right-6 text-[10px] tracking-[0.3em] uppercase bg-cream/90 text-navy px-3 py-1.5">
                Nouveauté
              </span>
            )}
            <span
              className="text-[10px] tracking-[0.2em] uppercase opacity-50"
              style={{
                color: isLightColor(product.color_hex) ? "#2C2826" : "#F5F1EB",
              }}
            >
              {product.sku}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-xs tracking-[0.3em] uppercase text-stone mb-3">
            {product.category_l2_label} · {product.season_collection}
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-4 leading-tight">
            {product.name}
          </h1>

          <p className="text-sm text-charcoal/70 mb-6">
            {product.color} · {product.material_primary}
          </p>

          <p className="text-2xl text-charcoal mb-8 font-light">
            {product.price_eur.toLocaleString("fr-FR")} €
          </p>

          <div className="w-12 h-px bg-tobacco mb-8"></div>

          <p className="text-base text-charcoal/80 leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="mb-8">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-xs tracking-[0.2em] uppercase text-navy">
                Taille
              </span>
              <button className="text-xs tracking-[0.2em] uppercase text-charcoal/60 hover:text-navy underline underline-offset-4">
                Guide des tailles
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.available_sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setShowSizeError(false);
                  }}
                  className={`min-w-[56px] px-4 py-3 text-sm tracking-wide border transition-all ${
                    selectedSize === size
                      ? "border-navy bg-navy text-cream"
                      : "border-stone/40 text-charcoal hover:border-navy"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {showSizeError && (
              <p className="text-xs text-tobacco mt-3 italic">
                Veuillez sélectionner une taille
              </p>
            )}
          </div>

          <div className="mb-8">
            <span className="text-xs tracking-[0.2em] uppercase text-navy block mb-4">
              Quantité
            </span>
            <div className="flex items-center border border-stone/40 w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 hover:bg-cream-light transition-colors text-lg"
                aria-label="Diminuer la quantité"
              >
                −
              </button>
              <span className="w-12 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 hover:bg-cream-light transition-colors text-lg"
                aria-label="Augmenter la quantité"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-3 mb-10">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 text-xs tracking-[0.3em] uppercase transition-all ${
                addedToCart
                  ? "bg-tobacco text-cream"
                  : "bg-navy text-cream hover:bg-navy-dark"
              }`}
            >
              {addedToCart ? "Ajouté au panier ✓" : "Ajouter au panier"}
            </button>
            <button
              onClick={() => toggleWishlist(product.sku)}
              className={`w-full py-4 text-xs tracking-[0.3em] uppercase border transition-colors ${
                wishlistHydrated && isInWishlist(product.sku)
                  ? "border-tobacco bg-tobacco text-cream hover:bg-tobacco/90"
                  : "border-navy text-navy hover:bg-navy hover:text-cream"
              }`}
            >
              {wishlistHydrated && isInWishlist(product.sku)
                ? "Retirer de la liste de souhaits"
                : "Ajouter à la liste de souhaits"}
            </button>
          </div>

          <div className="border-t border-stone/30 pt-8 space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal/60">Coupe</span>
              <span className="text-charcoal">{product.fit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/60">Origine</span>
              <span className="text-charcoal">{product.country_of_origin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal/60">Référence</span>
              <span className="text-charcoal font-mono text-xs">{product.sku}</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone/30 text-xs text-charcoal/60 space-y-2">
            <p>Livraison offerte dès 200 € en France métropolitaine</p>
            <p>Retours gratuits sous 30 jours</p>
            <p>Service client : du lundi au vendredi, 9h - 18h</p>
          </div>
        </div>
      </div>

      {suggestedProducts.length > 0 && (
        <section className="border-t border-stone/30 pt-16">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] uppercase text-stone mb-3">
              À découvrir également
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-navy">
              Pièces complémentaires
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {suggestedProducts.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function isLightColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}