import Link from "next/link";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";

export default function Home() {
  // Sélection : 4 produits mis en avant (les nouveautés en priorité)
  const featuredProducts = [
    ...products.filter((p) => p.is_new),
    ...products.filter((p) => !p.is_new),
  ].slice(0, 4);

  // 3 catégories à mettre en avant avec couleur de fond
  const collections = [
    { label: "Costumes", category: "Costumes", color: "#2A3441" },
    { label: "Manteaux & Vestes", category: "Manteaux & Vestes", color: "#5C4F3D" },
    { label: "Chaussures", category: "Chaussures", color: "#8B5A3C" },
  ];

  return (
    <main>
      {/* HERO — bloc d'origine */}
      <section className="px-6 py-32 md:py-48">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-12">
            <div className="text-xs tracking-[0.4em] text-stone mb-4 uppercase">
              Depuis 2010
            </div>
            <h1 className="font-serif text-6xl md:text-7xl text-navy leading-tight tracking-tight">
              Maison Outremont
            </h1>
            <div className="text-sm tracking-[0.3em] text-stone mt-6 uppercase">
              Paris · Montréal
            </div>
          </div>

          <div className="w-16 h-px bg-tobacco mx-auto my-12"></div>

          <p className="font-serif text-2xl md:text-3xl text-charcoal italic font-light leading-relaxed">
            Le vestiaire intemporel
            <br />
            de l&apos;homme moderne
          </p>

          <p className="text-base text-charcoal/70 mt-8 max-w-md mx-auto leading-relaxed">
            Tailoring contemporain et savoir-faire français. Une maison de
            prêt-à-porter masculin entre tradition et modernité.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
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
      </section>

      {/* BANDE VISUELLE — affiche tailoring */}
      <section className="bg-navy text-cream py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-cream/60 mb-8">
            Collection FW26
          </p>
          <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-10">
            Le tailoring,<br />réinventé.
          </h2>
          <p className="text-cream/80 max-w-2xl mx-auto leading-relaxed mb-12">
            Une nouvelle saison qui réconcilie la rigueur du costume parisien
            avec la liberté du sportswear nord-américain. Pièces à porter, à
            superposer, à vivre.
          </p>
          <Link
            href="/nouveautes"
            className="inline-block text-xs tracking-[0.3em] uppercase border border-cream text-cream py-4 px-10 hover:bg-cream hover:text-navy transition-colors"
          >
            Découvrir la collection
          </Link>
        </div>
      </section>

      {/* SÉLECTION PRODUITS */}
      <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-stone mb-3">
            Notre sélection
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-navy">
            Pièces à découvrir
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featuredProducts.map((p) => (
            <ProductCard key={p.sku} product={p} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/boutique"
            className="inline-block text-xs tracking-[0.3em] uppercase border border-navy text-navy py-4 px-10 hover:bg-navy hover:text-cream transition-colors"
          >
            Voir toute la boutique
          </Link>
        </div>
      </section>

      {/* COLLECTIONS — 3 blocs colorés */}
      <section className="px-6 pb-24 md:pb-32 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-stone mb-3">
            Catégories
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-navy">
            Explorer par collection
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((c) => (
            <Link
              key={c.label}
              href={`/boutique?categorie=${encodeURIComponent(c.category)}`}
              className="group block"
            >
              <div
                className="aspect-[3/4] w-full flex items-end p-8 transition-transform group-hover:scale-[1.01]"
                style={{ backgroundColor: c.color }}
              >
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-cream/60 mb-2">
                    Collection
                  </p>
                  <h3 className="font-serif text-3xl text-cream">
                    {c.label}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SAVOIR-FAIRE — bloc 2 colonnes */}
      <section className="bg-cream-light/40 py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="aspect-[4/5] w-full bg-tobacco/80 flex items-end p-10">
            <p className="text-cream/60 text-xs tracking-[0.3em] uppercase">
              Atelier · Biella
            </p>
          </div>
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-tobacco mb-4">
              Savoir-faire
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-navy mb-8 leading-tight">
              L&apos;exigence du temps long
            </h2>
            <div className="space-y-5 text-charcoal/80 leading-relaxed">
              <p>
                Vingt heures de travail pour un costume. Six mois pour
                développer un drap. Trois générations pour transmettre un
                geste. Notre maison se construit dans la patience.
              </p>
              <p>
                Nous travaillons exclusivement avec des manufactures
                familiales, en France et en Italie, sélectionnées pour leur
                exigence et leur transparence.
              </p>
            </div>
            <Link
              href="/atelier"
              className="inline-block mt-10 text-xs tracking-[0.3em] uppercase border border-navy text-navy py-4 px-10 hover:bg-navy hover:text-cream transition-colors"
            >
              Découvrir l&apos;atelier
            </Link>
          </div>
        </div>
      </section>

      {/* MAGAZINE — aperçu */}
      <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 flex-wrap gap-4">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-stone mb-3">
              Le journal de la maison
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-navy">
              Magazine
            </h2>
          </div>
          <Link
            href="/magazine"
            className="text-xs tracking-[0.3em] uppercase text-navy underline underline-offset-4 hover:text-tobacco transition-colors"
          >
            Tous les articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
          <Link href="/magazine/anatomie-costume-flanelle" className="block group">
            <div className="aspect-[4/3] w-full mb-4" style={{ backgroundColor: "#2A3441" }} />
            <p className="text-xs tracking-[0.2em] uppercase text-tobacco mb-2">Savoir-faire</p>
            <h3 className="font-serif text-xl text-navy mb-2 leading-tight group-hover:text-tobacco transition-colors">
              Anatomie d&apos;un costume en flanelle de laine
            </h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Du choix de la fibre à la dernière piqûre, retour sur les vingt heures de travail nécessaires à la confection d&apos;une pièce d&apos;exception.
            </p>
          </Link>
          <Link href="/magazine/guide-vestiaire-hivernal" className="block group">
            <div className="aspect-[4/3] w-full mb-4" style={{ backgroundColor: "#3D2E26" }} />
            <p className="text-xs tracking-[0.2em] uppercase text-tobacco mb-2">Style</p>
            <h3 className="font-serif text-xl text-navy mb-2 leading-tight group-hover:text-tobacco transition-colors">
              Le vestiaire hivernal essentiel
            </h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Cinq pièces fondamentales pour traverser l&apos;hiver avec allure, du pardessus en cachemire aux derbies en cuir patiné.
            </p>
          </Link>
          <Link href="/magazine/rencontre-tisseur-biella" className="block group">
            <div className="aspect-[4/3] w-full mb-4" style={{ backgroundColor: "#5C4F3D" }} />
            <p className="text-xs tracking-[0.2em] uppercase text-tobacco mb-2">Rencontres</p>
            <h3 className="font-serif text-xl text-navy mb-2 leading-tight group-hover:text-tobacco transition-colors">
              Rencontre avec un tisseur de Biella
            </h3>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Au cœur du Piémont italien, à la rencontre de la sixième génération d&apos;une famille qui tisse les plus belles laines du monde.
            </p>
          </Link>
        </div>
      </section>

      {/* RÉASSURANCE */}
      <section className="border-t border-stone/30 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-navy mb-2">
              Livraison offerte
            </p>
            <p className="text-sm text-charcoal/70">
              Dès 200 € en France, dès 300 € en Europe
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
      </section>
    </main>
  );
}