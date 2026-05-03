"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CheckoutSteps from "../../components/CheckoutSteps";
import { useCart } from "../../contexts/CartContext";
import { useCheckout } from "../../contexts/CheckoutContext";
import { products } from "../../data/products";

const SHIPPING_PRICES = {
  standard: (subtotal) => (subtotal >= 200 ? 0 : 12),
  express: () => 12,
  relay: () => 6,
};

const SHIPPING_LABELS = {
  standard: "Livraison standard (3 à 5 jours)",
  express: "Livraison express (24 à 48h)",
  relay: "Point relais (3 à 5 jours)",
};

const PAYMENT_LABELS = {
  card: "Carte bancaire",
  paypal: "PayPal",
  apple_pay: "Apple Pay",
};

const VALID_PROMO_CODES = {
  BIENVENUE10: { discount: 0.1, label: "10% de réduction" },
};

// Génère un numéro de commande de la forme MO-2026-XXXX
function generateOrderNumber() {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MO-${year}-${random}`;
}

export default function CheckoutConfirmationPage() {
  const { items, clearCart, isHydrated: cartHydrated } = useCart();
  const { data, resetCheckout, isHydrated: checkoutHydrated } = useCheckout();

  // Snapshot figé de la commande : on capture une fois et on n'y touche plus
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    if (!cartHydrated || !checkoutHydrated) return;
    if (snapshot) return; // déjà capturé, on ne refait pas

    // Si arrivé directement par URL sans contexte, on capture quand même un état vide
    if (items.length === 0 && !data.email) {
      setSnapshot({ empty: true });
      return;
    }

    // Capture des items enrichis
    const enrichedItems = items
      .map((item) => {
        const product = products.find((p) => p.sku === item.sku);
        if (!product) return null;
        return { ...item, product, lineTotal: product.price_eur * item.quantity };
      })
      .filter(Boolean);

    const subtotal = enrichedItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const shippingCost = (SHIPPING_PRICES[data.shippingMethod] || SHIPPING_PRICES.standard)(subtotal);
    const appliedPromo = data.promoCode && VALID_PROMO_CODES[data.promoCode]
      ? VALID_PROMO_CODES[data.promoCode]
      : null;
    const discountAmount = appliedPromo ? Math.round(subtotal * appliedPromo.discount) : 0;
    const total = subtotal + shippingCost - discountAmount;

    setSnapshot({
      orderNumber: generateOrderNumber(),
      orderDate: new Date(),
      enrichedItems,
      subtotal,
      shippingCost,
      shippingMethod: data.shippingMethod,
      paymentMethod: data.paymentMethod,
      promoCode: data.promoCode,
      appliedPromo,
      discountAmount,
      total,
      address: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        addressComplement: data.addressComplement,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country,
        email: data.email,
        phone: data.phone,
      },
    });

    // Vidage du panier et reset du checkout après capture
    clearCart();
    resetCheckout();
  }, [cartHydrated, checkoutHydrated, items, data, snapshot, clearCart, resetCheckout]);

  // Pendant l'hydratation ou la capture, on évite tout flash
  if (!snapshot) {
    return <main className="max-w-7xl mx-auto px-6 py-16 min-h-[60vh]" />;
  }

  // Cas d'arrivée sans contexte
  if (snapshot.empty) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-xl mx-auto text-center py-20">
          <h1 className="font-serif text-3xl md:text-4xl text-navy mb-4">
            Aucune commande récente
          </h1>
          <p className="text-charcoal/70 mb-10">
            Cette page affiche la confirmation de commande après un achat. Vous
            n&apos;avez pas de commande active à confirmer pour le moment.
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

  // Confirmation normale
  const formattedDate = snapshot.orderDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <CheckoutSteps currentStep={3} />

      {/* Bandeau de remerciement */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        {/* Cercle avec checkmark */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="text-cream"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <p className="text-xs tracking-[0.4em] uppercase text-stone mb-4">
          Commande confirmée
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-navy mb-6 leading-tight">
          Merci, {snapshot.address.firstName}
        </h1>
        <p className="text-charcoal/80 leading-relaxed mb-2">
          Votre commande a bien été enregistrée. Un e-mail de confirmation vient
          d&apos;être envoyé à <span className="text-navy">{snapshot.address.email}</span>.
        </p>
        <p className="text-sm text-charcoal/60">
          Numéro de commande :{" "}
          <span className="text-navy font-mono">{snapshot.orderNumber}</span>{" "}
          · {formattedDate}
        </p>
      </div>

      {/* Récap détaillé en 2 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        {/* GAUCHE — Adresse, livraison, paiement */}
        <div className="lg:col-span-2 space-y-8">
          <section className="border border-stone/30 p-6">
            <h2 className="text-xs tracking-[0.3em] uppercase text-navy mb-4">
              Adresse de livraison
            </h2>
            <div className="text-sm text-charcoal space-y-1">
              <p>
                {snapshot.address.firstName} {snapshot.address.lastName}
              </p>
              <p>{snapshot.address.address}</p>
              {snapshot.address.addressComplement && (
                <p>{snapshot.address.addressComplement}</p>
              )}
              <p>
                {snapshot.address.postalCode} {snapshot.address.city}
              </p>
              <p>{snapshot.address.country}</p>
              <p className="pt-2 text-charcoal/70">{snapshot.address.phone}</p>
            </div>
          </section>

          <section className="border border-stone/30 p-6">
            <h2 className="text-xs tracking-[0.3em] uppercase text-navy mb-4">
              Mode de livraison
            </h2>
            <p className="text-sm text-charcoal">
              {SHIPPING_LABELS[snapshot.shippingMethod] || SHIPPING_LABELS.standard}
            </p>
            <p className="text-xs text-charcoal/60 mt-2 italic">
              Vous recevrez un e-mail dès l&apos;expédition de votre commande.
            </p>
          </section>

          <section className="border border-stone/30 p-6">
            <h2 className="text-xs tracking-[0.3em] uppercase text-navy mb-4">
              Mode de paiement
            </h2>
            <p className="text-sm text-charcoal">
              {PAYMENT_LABELS[snapshot.paymentMethod] || snapshot.paymentMethod}
            </p>
            <p className="text-xs text-tobacco mt-2 italic">
              Démo portfolio — aucune transaction n&apos;a été réellement effectuée.
            </p>
          </section>
        </div>

        {/* DROITE — Articles + récap montants */}
        <aside className="lg:col-span-1">
          <div className="bg-cream-light/50 p-8 border border-stone/30">
            <h2 className="text-xs tracking-[0.3em] uppercase text-navy mb-6">
              Articles commandés
            </h2>

            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
              {snapshot.enrichedItems.map((item) => (
                <div key={`${item.sku}-${item.size}`} className="flex gap-3">
                  <div
                    className="w-14 h-18 flex-shrink-0"
                    style={{ backgroundColor: item.product.color_hex }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-navy truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-charcoal/60 mt-1">
                      Taille {item.size} · Qté {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm text-charcoal whitespace-nowrap">
                    {item.lineTotal.toLocaleString("fr-FR")} €
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-stone/40 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/70">Sous-total</span>
                <span className="text-charcoal">
                  {snapshot.subtotal.toLocaleString("fr-FR")} €
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/70">Livraison</span>
                <span className="text-charcoal">
                  {snapshot.shippingCost === 0
                    ? "Offerte"
                    : `${snapshot.shippingCost.toLocaleString("fr-FR")} €`}
                </span>
              </div>
              {snapshot.discountAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-tobacco">
                    Réduction ({snapshot.promoCode})
                  </span>
                  <span className="text-tobacco">
                    − {snapshot.discountAmount.toLocaleString("fr-FR")} €
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-stone/40 mt-4 pt-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm tracking-[0.2em] uppercase text-navy">
                  Total payé
                </span>
                <span className="text-2xl text-navy font-light">
                  {snapshot.total.toLocaleString("fr-FR")} €
                </span>
              </div>
              <p className="text-xs text-charcoal/50 mt-1 text-right">
                TVA incluse
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* CTA finaux */}
      <div className="border-t border-stone/30 pt-12 text-center">
        <p className="text-sm text-charcoal/70 mb-6 max-w-xl mx-auto">
          Une question sur votre commande ? Notre service client est joignable
          du lundi au vendredi, de 9h à 18h.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/boutique"
            className="inline-block text-xs tracking-[0.3em] uppercase bg-navy text-cream py-4 px-10 hover:bg-navy-dark transition-colors"
          >
            Continuer mes achats
          </Link>
          <Link
            href="/"
            className="inline-block text-xs tracking-[0.3em] uppercase border border-navy text-navy py-4 px-10 hover:bg-navy hover:text-cream transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}