"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CheckoutSteps from "../../components/CheckoutSteps";
import { useCart } from "../../contexts/CartContext";
import { useCheckout } from "../../contexts/CheckoutContext";
import { products } from "../../data/products";

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Carte bancaire",
    description: "Visa, Mastercard, American Express",
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "Paiement sécurisé via votre compte PayPal",
  },
  {
    id: "apple_pay",
    label: "Apple Pay",
    description: "Paiement rapide depuis votre appareil Apple",
  },
];

const VALID_PROMO_CODES = {
  BIENVENUE10: { discount: 0.1, label: "10% de réduction" },
};

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

export default function CheckoutPaiementPage() {
  const router = useRouter();
  const { items, isHydrated: cartHydrated } = useCart();
  const { data, updateCheckout, isHydrated: checkoutHydrated } = useCheckout();
  const [showError, setShowError] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [promoFeedback, setPromoFeedback] = useState(null); // { type: "success" | "error", message }

  // Garde-fous : panier vide -> /panier ; étape 1 incomplète -> /checkout/livraison
  useEffect(() => {
    if (!cartHydrated || !checkoutHydrated) return;
    if (items.length === 0) {
      router.push("/panier");
      return;
    }
    const requiredFields = ["email", "firstName", "lastName", "address", "postalCode", "city", "country", "phone"];
    const isStep1Complete = requiredFields.every((f) => data[f] && data[f].trim() !== "");
    if (!isStep1Complete) {
      router.push("/checkout/livraison");
    }
  }, [cartHydrated, checkoutHydrated, items.length, data, router]);

  if (!cartHydrated || !checkoutHydrated) {
    return <main className="max-w-7xl mx-auto px-6 py-16 min-h-[60vh]" />;
  }

  if (items.length === 0) {
    return <main className="max-w-7xl mx-auto px-6 py-16 min-h-[60vh]" />;
  }

  // Calculs
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

  // Handlers
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (VALID_PROMO_CODES[code]) {
      updateCheckout({ promoCode: code });
      setPromoFeedback({ type: "success", message: `Code appliqué : ${VALID_PROMO_CODES[code].label}` });
      setPromoInput("");
    } else {
      setPromoFeedback({ type: "error", message: "Code promo invalide" });
    }
  };

  const handleRemovePromo = () => {
    updateCheckout({ promoCode: "" });
    setPromoFeedback(null);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!data.paymentMethod) {
      setShowError(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setShowError(false);
    router.push("/checkout/confirmation");
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <CheckoutSteps currentStep={2} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* COLONNE GAUCHE */}
        <div className="lg:col-span-2 space-y-10">
          <h1 className="font-serif text-3xl md:text-4xl text-navy">
            Paiement
          </h1>

          {showError && (
            <div className="p-4 border border-tobacco bg-tobacco/5">
              <p className="text-sm text-tobacco">
                Veuillez sélectionner un mode de paiement avant de confirmer.
              </p>
            </div>
          )}

          {/* Récap livraison */}
          <section className="border border-stone/30 p-6">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h2 className="text-xs tracking-[0.3em] uppercase text-navy">
                Adresse de livraison
              </h2>
              <Link
                href="/checkout/livraison"
                className="text-xs tracking-[0.2em] uppercase text-charcoal/60 hover:text-navy underline underline-offset-4"
              >
                Modifier
              </Link>
            </div>
            <div className="text-sm text-charcoal space-y-1">
              <p>
                {data.firstName} {data.lastName}
              </p>
              <p>{data.address}</p>
              {data.addressComplement && <p>{data.addressComplement}</p>}
              <p>
                {data.postalCode} {data.city}
              </p>
              <p>{data.country}</p>
              <p className="pt-2 text-charcoal/70">{data.email}</p>
              <p className="text-charcoal/70">{data.phone}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-stone/30">
              <p className="text-xs tracking-[0.2em] uppercase text-charcoal/60 mb-1">
                Mode de livraison
              </p>
              <p className="text-sm text-charcoal">
                {SHIPPING_LABELS[data.shippingMethod] || SHIPPING_LABELS.standard}
              </p>
            </div>
          </section>

          {/* Mode de paiement */}
          <section>
            <h2 className="text-xs tracking-[0.3em] uppercase text-navy mb-4">
              Mode de paiement
            </h2>
            <form onSubmit={handleConfirm} className="space-y-3">
              {PAYMENT_METHODS.map((method) => {
                const isSelected = data.paymentMethod === method.id;
                return (
                  <label
                    key={method.id}
                    className={`block p-4 border cursor-pointer transition-colors ${
                      isSelected
                        ? "border-navy bg-cream-light/40"
                        : "border-stone/40 hover:border-navy/60"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={isSelected}
                        onChange={(e) => {
                          updateCheckout({ paymentMethod: e.target.value });
                          if (showError) setShowError(false);
                        }}
                        className="mt-1 accent-navy"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-navy">{method.label}</p>
                        <p className="text-xs text-charcoal/60 mt-1">
                          {method.description}
                        </p>
                      </div>
                    </div>

                    {/* Faux formulaire carte bancaire si sélectionné */}
                    {isSelected && method.id === "card" && (
                      <div className="mt-4 pt-4 border-t border-stone/30 space-y-3">
                        <p className="text-xs italic text-tobacco">
                          Démo portfolio — saisie désactivée. Aucun paiement réel ne sera traité.
                        </p>
                        <div>
                          <label className="block text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-2">
                            Numéro de carte
                          </label>
                          <input
                            type="text"
                            disabled
                            placeholder="•••• •••• •••• ••••"
                            className="w-full border border-stone/40 px-4 py-3 text-sm bg-stone/10 text-charcoal/40 cursor-not-allowed"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-2">
                              Expiration
                            </label>
                            <input
                              type="text"
                              disabled
                              placeholder="MM / AA"
                              className="w-full border border-stone/40 px-4 py-3 text-sm bg-stone/10 text-charcoal/40 cursor-not-allowed"
                            />
                          </div>
                          <div>
                            <label className="block text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-2">
                              CVC
                            </label>
                            <input
                              type="text"
                              disabled
                              placeholder="•••"
                              className="w-full border border-stone/40 px-4 py-3 text-sm bg-stone/10 text-charcoal/40 cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {isSelected && method.id === "paypal" && (
                      <div className="mt-4 pt-4 border-t border-stone/30">
                        <p className="text-xs italic text-tobacco">
                          Démo portfolio — vous seriez normalement redirigé vers PayPal pour valider la transaction.
                        </p>
                      </div>
                    )}

                    {isSelected && method.id === "apple_pay" && (
                      <div className="mt-4 pt-4 border-t border-stone/30">
                        <p className="text-xs italic text-tobacco">
                          Démo portfolio — Apple Pay nécessiterait Touch ID ou Face ID.
                        </p>
                      </div>
                    )}
                  </label>
                );
              })}

              {/* Boutons */}
              <div className="pt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-4 text-xs tracking-[0.3em] uppercase bg-navy text-cream hover:bg-navy-dark transition-colors"
                >
                  Confirmer la commande
                </button>
                <Link
                  href="/checkout/livraison"
                  className="flex-1 py-4 text-xs tracking-[0.3em] uppercase border border-navy text-navy text-center hover:bg-navy hover:text-cream transition-colors"
                >
                  Retour à la livraison
                </Link>
              </div>
            </form>
          </section>
        </div>

        {/* COLONNE DROITE — Récap commande */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-32 bg-cream-light/50 p-8 border border-stone/30">
            <h2 className="text-xs tracking-[0.3em] uppercase text-navy mb-6">
              Votre commande
            </h2>

            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {enrichedItems.map((item) => (
                <div key={`${item.sku}-${item.size}`} className="flex gap-3">
                  <div
                    className="w-14 h-18 flex-shrink-0"
                    style={{ backgroundColor: item.product.color_hex }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-navy truncate">{item.product.name}</p>
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

            {/* Code promo */}
            <div className="border-t border-stone/40 pt-4 pb-4">
              {!appliedPromo ? (
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <label className="block text-xs tracking-[0.2em] uppercase text-charcoal/70">
                    Code promo
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoFeedback(null);
                      }}
                      placeholder="Entrer un code"
                      className="flex-1 border border-stone/40 px-3 py-2 text-sm bg-cream focus:outline-none focus:border-navy transition-colors uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs tracking-[0.2em] uppercase border border-navy text-navy hover:bg-navy hover:text-cream transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                  {promoFeedback && (
                    <p
                      className={`text-xs ${
                        promoFeedback.type === "success" ? "text-navy" : "text-tobacco"
                      } italic`}
                    >
                      {promoFeedback.message}
                    </p>
                  )}
                </form>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-navy">
                      Code {data.promoCode}
                    </p>
                    <p className="text-xs text-charcoal/60 mt-1">
                      {appliedPromo.label}
                    </p>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-xs tracking-[0.2em] uppercase text-charcoal/60 hover:text-tobacco underline underline-offset-4"
                  >
                    Retirer
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-stone/40 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/70">Sous-total</span>
                <span className="text-charcoal">
                  {subtotal.toLocaleString("fr-FR")} €
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal/70">Livraison</span>
                <span className="text-charcoal">
                  {shippingCost === 0
                    ? "Offerte"
                    : `${shippingCost.toLocaleString("fr-FR")} €`}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-tobacco">Réduction</span>
                  <span className="text-tobacco">
                    − {discountAmount.toLocaleString("fr-FR")} €
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-stone/40 mt-4 pt-4">
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
          </div>
        </aside>
      </div>
    </main>
  );
}