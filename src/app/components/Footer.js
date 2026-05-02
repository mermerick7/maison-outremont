import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-cream mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Colonne 1 — Marque */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl mb-2">Maison Outremont</h3>
            <p className="text-xs tracking-[0.3em] text-cream/60 uppercase mb-6">
              Paris · Montréal
            </p>
            <p className="text-sm text-cream/70 leading-relaxed">
              Tailoring contemporain et savoir-faire français.
              Une maison de prêt-à-porter masculin entre tradition et modernité.
            </p>
          </div>

          {/* Colonne 2 — Boutique */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase mb-6 text-cream/80">
              Boutique
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/boutique" className="text-cream/70 hover:text-cream transition-colors">
                  Toutes les catégories
                </Link>
              </li>
              <li>
                <Link href="/nouveautes" className="text-cream/70 hover:text-cream transition-colors">
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link href="/boutique/costumes" className="text-cream/70 hover:text-cream transition-colors">
                  Costumes
                </Link>
              </li>
              <li>
                <Link href="/boutique/manteaux" className="text-cream/70 hover:text-cream transition-colors">
                  Manteaux
                </Link>
              </li>
              <li>
                <Link href="/boutique/chaussures" className="text-cream/70 hover:text-cream transition-colors">
                  Chaussures
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 — Service client */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase mb-6 text-cream/80">
              Service client
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="text-cream/70 hover:text-cream transition-colors">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link href="/livraison" className="text-cream/70 hover:text-cream transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link href="/retours" className="text-cream/70 hover:text-cream transition-colors">
                  Retours et échanges
                </Link>
              </li>
              <li>
                <Link href="/guide-tailles" className="text-cream/70 hover:text-cream transition-colors">
                  Guide des tailles
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-cream/70 hover:text-cream transition-colors">
                  Questions fréquentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 — Newsletter */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase mb-6 text-cream/80">
              Lettre confidentielle
            </h4>
            <p className="text-sm text-cream/70 mb-4 leading-relaxed">
              Recevez en avant-première nos nouvelles collections et nos événements privés.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                className="bg-transparent border-b border-cream/30 px-0 py-2 text-sm placeholder:text-cream/40 focus:outline-none focus:border-cream transition-colors"
              />
              <button className="text-xs tracking-[0.3em] uppercase border border-cream/40 py-3 hover:bg-cream hover:text-navy transition-colors">
                S&apos;inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="border-t border-cream/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/50">
            © 2026 Maison Outremont. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs">
            <Link href="/cgv" className="text-cream/50 hover:text-cream transition-colors">
              CGV
            </Link>
            <Link href="/mentions-legales" className="text-cream/50 hover:text-cream transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="text-cream/50 hover:text-cream transition-colors">
              Confidentialité
            </Link>
            <Link href="/cookies" className="text-cream/50 hover:text-cream transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}