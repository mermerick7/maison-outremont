"use client";

import { useState } from "react";
import Link from "next/link";

export default function ComptePage() {
  const [mode, setMode] = useState("login"); // "login" | "signup"

  const handleSubmit = (e) => {
    e.preventDefault();
    // Démo portfolio — pas d'authentification réelle
  };

  return (
    <main className="max-w-md mx-auto px-6 py-16 md:py-24">
      <nav className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-12 flex items-center gap-2 flex-wrap justify-center">
        <Link href="/" className="hover:text-navy transition-colors">Accueil</Link>
        <span>/</span>
        <span className="text-navy">{mode === "login" ? "Connexion" : "Créer un compte"}</span>
      </nav>

      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.4em] uppercase text-stone mb-4">Espace personnel</p>
        <h1 className="font-serif text-4xl md:text-5xl text-navy">
          {mode === "login" ? "Connexion" : "Créer un compte"}
        </h1>
      </div>

      {/* Onglets */}
      <div className="grid grid-cols-2 mb-10 border border-stone/40">
        <button
          onClick={() => setMode("login")}
          className={`py-3 text-xs tracking-[0.3em] uppercase transition-colors ${
            mode === "login"
              ? "bg-navy text-cream"
              : "text-charcoal/70 hover:text-navy"
          }`}
        >
          Connexion
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`py-3 text-xs tracking-[0.3em] uppercase transition-colors ${
            mode === "signup"
              ? "bg-navy text-cream"
              : "text-charcoal/70 hover:text-navy"
          }`}
        >
          Créer un compte
        </button>
      </div>

      {/* Bandeau démo */}
      <div className="mb-8 p-4 border border-tobacco bg-tobacco/5">
        <p className="text-xs italic text-tobacco leading-relaxed">
          Démo portfolio — la création de compte et la connexion ne sont pas
          fonctionnelles. Aucune donnée ne sera enregistrée.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === "signup" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-navy mb-2">
                Prénom
              </label>
              <input
                type="text"
                disabled
                className="w-full border border-stone/40 px-4 py-3 text-sm bg-stone/10 text-charcoal/40 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-navy mb-2">
                Nom
              </label>
              <input
                type="text"
                disabled
                className="w-full border border-stone/40 px-4 py-3 text-sm bg-stone/10 text-charcoal/40 cursor-not-allowed"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-navy mb-2">
            Adresse e-mail
          </label>
          <input
            type="email"
            disabled
            placeholder="vous@exemple.com"
            className="w-full border border-stone/40 px-4 py-3 text-sm bg-stone/10 text-charcoal/40 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-xs tracking-[0.2em] uppercase text-navy mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            disabled
            placeholder="••••••••"
            className="w-full border border-stone/40 px-4 py-3 text-sm bg-stone/10 text-charcoal/40 cursor-not-allowed"
          />
        </div>

        {mode === "signup" && (
          <div>
            <label className="flex items-start gap-3 text-xs text-charcoal/60 leading-relaxed">
              <input type="checkbox" disabled className="mt-1 cursor-not-allowed" />
              <span>
                Je souhaite recevoir les actualités et offres exclusives de Maison Outremont par e-mail.
              </span>
            </label>
          </div>
        )}

        {mode === "login" && (
          <div className="text-right">
            <button
              type="button"
              disabled
              className="text-xs tracking-[0.2em] uppercase text-charcoal/40 underline underline-offset-4 cursor-not-allowed"
            >
              Mot de passe oublié ?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled
          className="w-full py-4 text-xs tracking-[0.3em] uppercase bg-stone/40 text-cream cursor-not-allowed"
        >
          {mode === "login" ? "Se connecter" : "Créer mon compte"}
        </button>
      </form>

      <div className="mt-12 pt-8 border-t border-stone/30 text-center">
        <p className="text-xs text-charcoal/60 leading-relaxed">
          Vous pouvez parcourir la boutique et passer commande sans créer de compte.
        </p>
        <Link
          href="/boutique"
          className="inline-block mt-4 text-xs tracking-[0.3em] uppercase text-navy underline underline-offset-4 hover:text-tobacco transition-colors"
        >
          Découvrir la boutique
        </Link>
      </div>
    </main>
  );
}