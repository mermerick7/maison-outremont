"use client";

import { use } from "react";
import Link from "next/link";

const ARTICLES = {
  "anatomie-costume-flanelle": {
    category: "Savoir-faire",
    title: "Anatomie d'un costume en flanelle de laine",
    subtitle: "Du choix de la fibre à la dernière piqûre, retour sur les vingt heures de travail nécessaires à la confection d'une pièce d'exception.",
    date: "28 avril 2026",
    readTime: "6 min",
    author: "Mérick Z.",
    color: "#2A3441",
    content: [
      { type: "p", text: "Un costume en flanelle bien construit est l'aboutissement d'une chaîne de gestes précis, hérités de plusieurs siècles de tailoring européen. Chez Maison Outremont, chaque pièce passe entre les mains d'une dizaine d'artisans avant d'arriver dans nos showrooms." },
      { type: "h2", text: "La fibre, point de départ" },
      { type: "p", text: "Tout commence par la laine. Nous travaillons exclusivement avec des fibres mérinos longues, sélectionnées pour leur finesse et leur résistance. Notre principal partenaire, une filature familiale italienne basée à Biella, nous fournit des draps de flanelle d'une densité de 340 grammes au mètre carré, idéale pour la mi-saison." },
      { type: "p", text: "Cette flanelle est tissée selon une armure spécifique qui lui donne ce toucher pelucheux caractéristique, sans pour autant compromettre la tenue de la pièce dans le temps. Une bonne flanelle se patine, ne se fatigue pas." },
      { type: "h2", text: "Le patronage, science exacte" },
      { type: "p", text: "Avant la coupe, le patronage. Nos coupeurs travaillent à partir de mensurations précises et d'une grille de coupe affinée pendant plus de dix ans. La veste se construit sur cinq points-clés : carrure, poitrine, taille, hanche, et ouverture du col. Chaque ajustement à l'un de ces points retentit sur les autres : tout l'art consiste à équilibrer." },
      { type: "h2", text: "Le montage, vingt heures de travail" },
      { type: "p", text: "Le montage d'une veste de costume représente à lui seul une douzaine d'heures. La toile interne, faite de crin de cheval et de coton, est piquée à la main contre le tissu extérieur. C'est ce qu'on appelle une construction \"cousue main\" ou \"full canvas\", par opposition aux constructions thermocollées que l'on trouve dans le prêt-à-porter de masse." },
      { type: "p", text: "Cette technique, plus longue et plus coûteuse, donne à la veste sa structure et sa tenue dans le temps. Une veste full canvas ne se déforme pas après les premiers passages au pressing." },
      { type: "h2", text: "Les finitions" },
      { type: "p", text: "Boutonnières à la main, doublure piquée, ourlets invisibles : les finitions distinguent un costume artisanal d'un costume industriel. Ces gestes ne se voient pas immédiatement, mais ils se sentent à l'enfilage et se révèlent dans le temps. Une boutonnière faite à la main résiste à des décennies de portée." },
      { type: "p", text: "Vingt heures de travail, donc, pour une pièce qui vous accompagnera vingt ans si vous en prenez soin. C'est ce que nous appelons, chez Maison Outremont, le calcul du temps long." },
    ],
  },
  "guide-vestiaire-hivernal": {
    category: "Style",
    title: "Le vestiaire hivernal essentiel",
    subtitle: "Cinq pièces fondamentales pour traverser l'hiver avec allure.",
    date: "15 avril 2026",
    readTime: "8 min",
    author: "Mérick Z.",
    color: "#3D2E26",
    content: [
      { type: "p", text: "Un vestiaire hivernal bien pensé tient en quelques pièces. Pas besoin d'accumuler : la qualité prime sur la quantité, et chaque élément doit pouvoir se combiner avec les autres." },
      { type: "h2", text: "Le pardessus en laine" },
      { type: "p", text: "Pièce centrale du vestiaire d'hiver, le pardessus en laine ou en cachemire enveloppe sans alourdir. Privilégiez un coloris neutre — anthracite, marine, camel — qui se mariera avec tous vos costumes et vos chinos." },
      { type: "h2", text: "Le pull en cachemire" },
      { type: "p", text: "Un cachemire fin de qualité se porte sous une chemise comme sur un t-shirt. Investissez dans deux ou trois couleurs intemporelles : marine, beige, gris perle." },
      { type: "h2", text: "Les derbies en cuir" },
      { type: "p", text: "Plus polyvalents que les richelieus, plus habillés que les sneakers, les derbies en cuir patiné se portent du costume au denim. Un cuir noir ou marron foncé pour commencer." },
      { type: "h2", text: "Le pantalon en flanelle" },
      { type: "p", text: "Plus chaud qu'un chino, plus décontracté qu'un pantalon de costume, le pantalon en flanelle est l'allié des entre-deux saisons. Coupe droite, pince ou sans pince selon vos préférences." },
      { type: "h2", text: "L'écharpe en cachemire" },
      { type: "p", text: "Un grand classique. Choisissez une teinte qui contraste subtilement avec votre pardessus, dans une matière noble qui durera des décennies." },
    ],
  },
  "rencontre-tisseur-biella": {
    category: "Rencontres",
    title: "Rencontre avec un tisseur de Biella",
    subtitle: "Au cœur du Piémont italien, à la rencontre d'une famille qui tisse les plus belles laines du monde.",
    date: "2 avril 2026",
    readTime: "10 min",
    author: "Mérick Z.",
    color: "#5C4F3D",
    content: [
      { type: "p", text: "Biella, dans le Piémont italien, est à la laine ce que Bordeaux est au vin : une appellation, presque une religion. Depuis le Moyen Âge, on y tisse les plus belles draperies d'Europe." },
      { type: "p", text: "Nous y avons rencontré la famille Pellerei, sixième génération de tisserands, qui fournit les plus grandes maisons de tailoring depuis 1872." },
      { type: "h2", text: "Une histoire de famille" },
      { type: "p", text: "« Mon arrière-grand-père a fondé la filature en 1872, raconte Carlo Pellerei. À l'époque, on travaillait pour les tailleurs de Milan et de Turin. Aujourd'hui, on exporte dans le monde entier, mais l'esprit reste le même : faire le plus beau tissu possible. »" },
      { type: "h2", text: "Le geste artisanal" },
      { type: "p", text: "Dans l'atelier, le bruit des métiers à tisser est presque hypnotique. Chaque drap passe une vingtaine d'étapes avant d'être expédié : sélection de la fibre, filature, tissage, foulonnage, séchage, contrôle qualité." },
      { type: "p", text: "« On ne peut pas faire un beau tissu sans temps, explique Carlo. Il faut respecter la fibre. La précipitation, c'est la mort de la qualité. »" },
    ],
  },
  "art-cravate-soie": {
    category: "Style",
    title: "L'art de la cravate en soie",
    subtitle: "Choisir, nouer, entretenir.",
    date: "20 mars 2026",
    readTime: "5 min",
    author: "Mérick Z.",
    color: "#8B5A3C",
    content: [
      { type: "p", text: "La cravate en soie est l'accessoire le plus distingué du vestiaire masculin. Bien choisie, bien nouée, bien entretenue, elle traverse les années sans prendre une ride." },
      { type: "h2", text: "Choisir" },
      { type: "p", text: "Une bonne cravate en soie pèse entre 60 et 80 grammes. Elle est doublée d'une étamine de laine qui lui donne du tombé. Évitez les cravates trop fines, qui marquent un manque de qualité." },
      { type: "h2", text: "Nouer" },
      { type: "p", text: "Le nœud Windsor est trop volumineux pour la plupart des cols. Le simple ou le demi-Windsor suffisent largement. L'essentiel : une fossette nette sous le nœud, signe d'une cravate bien posée." },
      { type: "h2", text: "Entretenir" },
      { type: "p", text: "Ne jamais nettoyer une cravate à sec : les solvants détruisent la soie. En cas de tache, tamponner immédiatement avec un chiffon humide. Et toujours dénouer entièrement la cravate après usage : c'est ce qui lui permet de durer." },
    ],
  },
};

export default function ArticlePage({ params }) {
  const { slug } = use(params);
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <main className="px-6 py-32 max-w-2xl mx-auto text-center">
        <h1 className="font-serif text-4xl text-navy mb-4">Article introuvable</h1>
        <p className="text-charcoal/70 mb-8">
          L&apos;article que vous recherchez n&apos;existe pas.
        </p>
        <Link
          href="/magazine"
          className="inline-block text-xs tracking-[0.3em] uppercase border border-navy py-3 px-8 hover:bg-navy hover:text-cream transition-colors"
        >
          Retour au magazine
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <nav className="text-xs tracking-[0.2em] uppercase text-charcoal/50 mb-12 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-navy transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/magazine" className="hover:text-navy transition-colors">Magazine</Link>
        <span>/</span>
        <span className="text-navy">{article.category}</span>
      </nav>

      <article>
        <header className="mb-12 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-tobacco mb-6">
            {article.category}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="font-serif text-xl text-charcoal/70 italic mb-8 leading-relaxed">
            {article.subtitle}
          </p>
          <p className="text-xs tracking-[0.2em] uppercase text-charcoal/50">
            Par {article.author} · {article.date} · {article.readTime} de lecture
          </p>
        </header>

        <div
          className="aspect-[16/9] w-full mb-12"
          style={{ backgroundColor: article.color }}
        />

        <div className="space-y-6">
          {article.content.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="font-serif text-2xl md:text-3xl text-navy mt-12 mb-2"
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <p
                key={i}
                className="text-base text-charcoal/80 leading-relaxed"
              >
                {block.text}
              </p>
            );
          })}
        </div>
      </article>

      <div className="border-t border-stone/30 mt-20 pt-12 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-stone mb-6">
          Continuer la lecture
        </p>
        <Link
          href="/magazine"
          className="inline-block text-xs tracking-[0.3em] uppercase border border-navy text-navy py-4 px-10 hover:bg-navy hover:text-cream transition-colors"
        >
          Retour au magazine
        </Link>
      </div>
    </main>
  );
}