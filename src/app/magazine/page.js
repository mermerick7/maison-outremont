"use client";

import Link from "next/link";

const ARTICLES = [
  {
    slug: "anatomie-costume-flanelle",
    category: "Savoir-faire",
    title: "Anatomie d'un costume en flanelle de laine",
    excerpt: "Du choix de la fibre à la dernière piqûre, retour sur les vingt heures de travail nécessaires à la confection d'une pièce d'exception.",
    date: "28 avril 2026",
    readTime: "6 min",
    color: "#2A3441",
  },
  {
    slug: "guide-vestiaire-hivernal",
    category: "Style",
    title: "Le vestiaire hivernal essentiel",
    excerpt: "Cinq pièces fondamentales pour traverser l'hiver avec allure, du pardessus en cachemire aux derbies en cuir patiné.",
    date: "15 avril 2026",
    readTime: "8 min",
    color: "#3D2E26",
  },
  {
    slug: "rencontre-tisseur-biella",
    category: "Rencontres",
    title: "Rencontre avec un tisseur de Biella",
    excerpt: "Au cœur du Piémont italien, à la rencontre de la sixième génération d'une famille qui tisse les plus belles laines du monde.",
    date: "2 avril 2026",
    readTime: "10 min",
    color: "#5C4F3D",
  },
  {
    slug: "art-cravate-soie",
    category: "Style",
    title: "L'art de la cravate en soie",
    excerpt: "Choisir, nouer, entretenir : tout ce qu'il faut savoir sur l'accessoire le plus distingué du vestiaire masculin.",
    date: "20 mars 2026",
    readTime: "5 min",
    color: "#8B5A3C",
  },
];

export default function MagazinePage() {
  const featured = ARTICLES[0];
  const others = ARTICLES.slice(1);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <nav className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-12 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-navy transition-colors">Accueil</Link>
        <span>/</span>
        <span className="text-navy">Magazine</span>
      </nav>

      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] uppercase text-stone mb-4">Le journal de la maison</p>
        <h1 className="font-serif text-5xl md:text-6xl text-navy mb-6">Magazine</h1>
        <p className="text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
          Récits, rencontres et savoir-faire. L&apos;univers Maison Outremont raconté à travers ses artisans et ses inspirations.
        </p>
      </div>

      {/* Article mis en avant */}
      <Link href={`/magazine/${featured.slug}`} className="block group mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div
            className="aspect-[4/3] w-full"
            style={{ backgroundColor: featured.color }}
          />
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.3em] uppercase text-tobacco mb-4">
              {featured.category} · À la une
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-navy mb-6 leading-tight group-hover:text-tobacco transition-colors">
              {featured.title}
            </h2>
            <p className="text-charcoal/70 leading-relaxed mb-6">
              {featured.excerpt}
            </p>
            <p className="text-xs tracking-[0.2em] uppercase text-charcoal/50">
              {featured.date} · {featured.readTime} de lecture
            </p>
          </div>
        </div>
      </Link>

      {/* Autres articles */}
      <div className="border-t border-stone/30 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
          {others.map((article) => (
            <Link
              key={article.slug}
              href={`/magazine/${article.slug}`}
              className="block group"
            >
              <div
                className="aspect-[4/3] w-full mb-4"
                style={{ backgroundColor: article.color }}
              />
              <p className="text-xs tracking-[0.2em] uppercase text-tobacco mb-2">
                {article.category}
              </p>
              <h3 className="font-serif text-xl text-navy mb-2 leading-tight group-hover:text-tobacco transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed mb-3">
                {article.excerpt}
              </p>
              <p className="text-xs tracking-[0.2em] uppercase text-charcoal/50">
                {article.date} · {article.readTime}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}