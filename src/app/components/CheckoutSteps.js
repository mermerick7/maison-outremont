"use client";

import Link from "next/link";

const STEPS = [
  { number: 1, label: "Livraison", path: "/checkout/livraison" },
  { number: 2, label: "Paiement", path: "/checkout/paiement" },
  { number: 3, label: "Confirmation", path: "/checkout/confirmation" },
];

export default function CheckoutSteps({ currentStep }) {
  return (
    <nav className="mb-12">
      <ol className="flex items-center justify-center gap-4 md:gap-8">
        {STEPS.map((step, index) => {
          const isCurrent = step.number === currentStep;
          const isCompleted = step.number < currentStep;
          const isClickable = isCompleted; // on ne peut revenir qu'aux étapes déjà passées

          const labelContent = (
            <div className="flex flex-col items-center gap-2">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border transition-colors ${
                  isCurrent
                    ? "bg-navy text-cream border-navy"
                    : isCompleted
                    ? "bg-cream border-navy text-navy"
                    : "bg-cream border-stone/40 text-stone"
                }`}
              >
                {step.number}
              </span>
              <span
                className={`text-[10px] tracking-[0.2em] uppercase ${
                  isCurrent
                    ? "text-navy"
                    : isCompleted
                    ? "text-charcoal/70"
                    : "text-stone"
                }`}
              >
                {step.label}
              </span>
            </div>
          );

          return (
            <li key={step.number} className="flex items-center gap-4 md:gap-8">
              {isClickable ? (
                <Link href={step.path} className="hover:opacity-70 transition-opacity">
                  {labelContent}
                </Link>
              ) : (
                <div>{labelContent}</div>
              )}
              {/* Trait de séparation entre les étapes (sauf après la dernière) */}
              {index < STEPS.length - 1 && (
                <span
                  className={`w-12 md:w-20 h-px transition-colors ${
                    step.number < currentStep ? "bg-navy" : "bg-stone/40"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}