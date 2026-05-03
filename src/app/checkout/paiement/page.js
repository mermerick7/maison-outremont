"use client";

import CheckoutSteps from "../../components/CheckoutSteps";

export default function CheckoutPaiementPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <CheckoutSteps currentStep={2} />

      <div className="text-center py-20">
        <h1 className="font-serif text-3xl text-navy mb-4">
          Étape 2 — Paiement
        </h1>
        <p className="text-charcoal/70">
          Le choix du moyen de paiement arrive plus tard dans cette session.
        </p>
      </div>
    </main>
  );
}