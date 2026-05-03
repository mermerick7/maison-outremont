"use client";

import Link from "next/link";

export default function AtelierPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      <nav className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-12 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-navy transition-colors">Accueil</Link>
        <span>/</span>
        <span className="text-navy">L&apos;Atelier</span>
      </nav>

      {/* Hero */}
      <div className="text-center mb-20">
        <p className="text-xs tracking-[0.4em] uppercase text-stone mb-4">Notre maison</p>
        <h1 className="font-serif text-5xl md:text-6xl text-navy mb-8 leading-tight">
          L&apos;Atelier
        </h1>
        <p className="font-serif text-2xl md:text-3xl text-charcoal/80 italic max-w-3xl mx-auto leading-relaxed">
          « Habiller l&apos;homme contemporain, entre Paris et Montréal, avec la patience d&apos;un artisan et la précision d&apos;un architecte. »
        </p>
      </div>

      {/* Grand bloc visuel décoratif */}
      <div className="mb-20 aspect-[16/9] w-full bg-navy flex items-center justify-center">
        <p className="font-serif text-cream/40 text-sm tracking-[0.4em] uppercase">
          Atelier · Paris 8e
        </p>
      </div>

      {/* Section : Notre histoire */}
      <section className="mb-20 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-tobacco mb-6">Depuis 2010</p>
        <h2 className="font-serif text-3xl md:text-4xl text-navy mb-8">Notre histoire</h2>
        <div className="space-y-6 text-charcoal/80 leading-relaxed">
          <p>
            Maison Outremont est née en 2010 d&apos;une conviction simple : l&apos;homme moderne mérite un vestiaire pensé dans la durée, conçu avec le respect du geste artisanal et la rigueur du tailoring contemporain.
          </p>
          <p>
            Installés au cœur du 8e arrondissement parisien, nous travaillons en étroite collaboration avec des manufactures françaises et italiennes sélectionnées pour leur exigence. Chaque pièce est pensée comme un investissement : matières nobles, construction soignée, lignes intemporelles.
          </p>
          <p>
            Depuis 2022, notre adresse montréalaise prolonge cette philosophie sur le continent américain, où nous réinventons le vestiaire masculin pour les climats du Nord et l&apos;élégance discrète qui caractérise nos clients.
          </p>
        </div>
      </section>

      {/* Trois piliers */}
      <section className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-tobacco mb-4">01</p>
          <h3 className="font-serif text-2xl text-navy mb-4">Matières</h3>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            Laines mérinos d&apos;Australie, cachemires d&apos;Écosse, lins d&apos;Irlande, cotons d&apos;Égypte. Nous sourcons les meilleures fibres auprès de filatures dont nous connaissons chaque étape de production.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-tobacco mb-4">02</p>
          <h3 className="font-serif text-2xl text-navy mb-4">Façon</h3>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            Nos costumes sont réalisés en demi-mesure dans des ateliers à taille humaine, en France et au Portugal. Une vingtaine d&apos;heures de travail par pièce, toutes à la main pour les finitions.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-tobacco mb-4">03</p>
          <h3 className="font-serif text-2xl text-navy mb-4">Durabilité</h3>
          <p className="text-sm text-charcoal/70 leading-relaxed">
            Service de retouches à vie sur toutes nos pièces. Programme de reprise et de revalorisation pour les pièces que vous ne portez plus. La pérennité comme principe.
          </p>
        </div>
      </section>

      {/* Adresses */}
      <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-stone/30 pt-16">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-tobacco mb-4">Paris</p>
          <h3 className="font-serif text-2xl text-navy mb-4">Showroom 8e</h3>
          <p className="text-sm text-charcoal/70 leading-relaxed mb-4">
            42 rue de Penthièvre<br />
            75008 Paris<br />
            France
          </p>
          <p className="text-xs text-charcoal/60 italic">
            Sur rendez-vous · Du mardi au samedi, 10h - 19h
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-tobacco mb-4">Montréal</p>
          <h3 className="font-serif text-2xl text-navy mb-4">Boutique Outremont</h3>
          <p className="text-sm text-charcoal/70 leading-relaxed mb-4">
            1284 avenue Bernard<br />
            Montréal, QC H2V 1V9<br />
            Canada
          </p>
          <p className="text-xs text-charcoal/60 italic">
            Du mardi au samedi, 11h - 18h
          </p>
        </div>
      </section>

      {/* CTA final */}
      <div className="text-center border-t border-stone/30 pt-16">
        <h2 className="font-serif text-3xl md:text-4xl text-navy mb-6">
          Découvrir nos collections
        </h2>
        <Link
          href="/boutique"
          className="inline-block text-xs tracking-[0.3em] uppercase bg-navy text-cream py-4 px-10 hover:bg-navy-dark transition-colors"
        >
          Voir la boutique
        </Link>
      </div>
    </main>
  );
}