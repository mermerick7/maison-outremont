import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-stone/30 bg-cream sticky top-0 z-50 backdrop-blur-sm bg-cream/95">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between gap-8">
          {/* Logo gauche */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="font-serif text-xl text-navy tracking-wide leading-none">
              MAISON OUTREMONT
            </span>
            <span className="text-[10px] tracking-[0.3em] text-stone uppercase mt-1">
              Paris · Montréal
            </span>
          </Link>

          {/* Navigation centrale */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="/boutique"
              className="text-sm tracking-wide text-charcoal hover:text-navy transition-colors uppercase"
            >
              Boutique
            </Link>
            <Link
              href="/nouveautes"
              className="text-sm tracking-wide text-charcoal hover:text-navy transition-colors uppercase"
            >
              Nouveautés
            </Link>
            <Link
              href="/magazine"
              className="text-sm tracking-wide text-charcoal hover:text-navy transition-colors uppercase"
            >
              Magazine
            </Link>
            <Link
              href="/atelier"
              className="text-sm tracking-wide text-charcoal hover:text-navy transition-colors uppercase"
            >
              L&apos;Atelier
            </Link>
          </nav>

          {/* Icônes droite */}
          <div className="flex items-center gap-5 text-charcoal">
            <button
              aria-label="Recherche"
              className="hover:text-navy transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            <Link
              href="/compte"
              aria-label="Mon compte"
              className="hover:text-navy transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            <Link
              href="/wishlist"
              aria-label="Liste de souhaits"
              className="hover:text-navy transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
              </svg>
            </Link>

            <Link
              href="/panier"
              aria-label="Panier"
              className="hover:text-navy transition-colors relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}