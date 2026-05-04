# Plan de mesure — Maison Outremont

**Document de référence | Version 1.0 | Auteur : Mérick**

> Ce document formalise la stratégie de mesure analytique du site Maison Outremont. Il sert de contrat entre la vision business et l'implémentation technique (dataLayer → GTM → GA4 → BigQuery → Power BI).

---

## 1. Contexte et périmètre

### 1.1 Le site

Maison Outremont est un site e-commerce de mode masculine premium, fondé en 2010, distribuant des pièces de vestiaire haut de gamme dans une fourchette de prix de 80€ à 2 500€.

| Caractéristique | Valeur |
|---|---|
| Année de fondation | 2010 |
| Marchés couverts | France (2010), Benelux (2014), reste UE (2017), UK (2019), Amérique du Nord (2022) |
| Volume estimé 2026 | ~1 050 000 sessions / an |
| Panier moyen | ~280€ |
| Catalogue | ~1 200 SKU actifs, ~3 500 archivés |
| Positionnement | Tailoring contemporain, savoir-faire français, esprit montréalais |

### 1.2 Périmètre du plan de mesure (V1)

Ce document couvre l'instrumentation analytique du **site web grand public** uniquement. Sont **exclus du scope V1** :

- Heatmaps et session replay (Hotjar, Microsoft Clarity)
- Analyse SEO technique avancée (Search Console, crawls)
- Performance technique frontend (temps de chargement, erreurs JS)
- Analyse de sentiment et NPS
- Tracking des reviews et User-Generated Content
- Marketing attribution multi-touch poussée (modèles Markov, Shapley)

Ces éléments pourront faire l'objet de plans de mesure complémentaires en V2.

### 1.3 Stack technique

| Couche | Outil |
|---|---|
| Frontend | Next.js 14 (App Router) + React |
| Tracking | dataLayer custom + GTM (web container) |
| Collecte | Google Analytics 4 |
| Data warehouse | BigQuery (export GA4 natif) |
| Visualisation | Power BI Desktop |

---

## 2. Stratégie business

### 2.1 Priorité business N°1 (12 prochains mois)

**Optimisation du taux de conversion (axe Conversion)**, avec un parti-pris de **diagnostic complet du funnel** avant priorisation des chantiers d'optimisation.

Justification : avant d'investir des ressources sur un chantier d'optimisation spécifique (ex. réduction des frais de livraison, refonte du checkout, simplification de la sélection de taille), il est nécessaire de **mesurer objectivement** où se situent les frictions principales du parcours d'achat. Le plan de mesure doit donc fournir un diagnostic chiffré à chaque étape du tunnel.

### 2.2 Sous-objectifs analytiques

Pour piloter l'axe conversion, le plan de mesure doit permettre de répondre à trois questions critiques :

1. **Où dans le funnel perd-on le plus d'utilisateurs ?** (mesure du drop-off à chaque étape)
2. **Quels segments / personas / canaux convertissent le mieux ou le moins ?** (segmentation des taux de conversion)
3. **Quelles catégories produit ont le meilleur ratio vue → achat ?** (priorisation par catégorie)

---

## 3. Personas et segments

Le plan de mesure s'appuie sur deux dimensions complémentaires : des **personas qualitatifs** (utiles pour le storytelling business) et des **segments comportementaux quantitatifs** (utilisables comme dimensions GA4).

### 3.1 Personas qualitatifs (4)

#### Persona 1 — Le Jeune Professionnel Aspirationnel

| Attribut | Description |
|---|---|
| Profil | 26-34 ans, premier "vrai" salaire, premier achat haut de gamme |
| Comportement attendu | Sessions longues, hésitation, beaucoup de view_item, panier qui se construit lentement, besoin de réassurance |
| Pièces achetées | Pièces accessibles (chemises, chinos, polos), 150-400€ en moyenne |
| Enjeu conversion | Friction sur le prix, comparaison avec concurrents, abandon fréquent |

#### Persona 2 — Le Cadre Établi

| Attribut | Description |
|---|---|
| Profil | 35-50 ans, salaire confortable, achète régulièrement |
| Comportement attendu | Sessions ciblées, panier moyen élevé (300-500€), achats à la collection |
| Pièces achetées | Costumes, manteaux, pièces structurantes |
| Enjeu conversion | Décide vite, peu d'abandon, besoin d'efficacité dans le checkout |

#### Persona 3 — Le VIP / Connaisseur

| Attribut | Description |
|---|---|
| Profil | 40-60 ans, gros pouvoir d'achat, recherche savoir-faire et exclusivité |
| Comportement attendu | Achats peu fréquents, panier très élevé (800-2000€+), fidélité forte |
| Pièces achetées | Manteaux cachemire, costumes confection italienne, pièces capsules |
| Enjeu conversion | Très peu d'abandon, mais SAV impeccable requis |

#### Persona 4 — Le Curieux / Déclencheur Cadeau

| Attribut | Description |
|---|---|
| Profil | Visiteurs ponctuels, souvent femmes achetant pour un homme, ou recherche cadeau |
| Comportement attendu | Sessions courtes, navigation par catégorie accessible, peu de retour |
| Pièces achetées | Accessoires (cravates, ceintures), polos, t-shirts, sous-vêtements |
| Enjeu conversion | Forte saisonnalité (Noël, Saint-Valentin, Fête des Pères), conversion rapide ou nulle |

### 3.2 Segments comportementaux mesurables (4)

Les segments sont calculables de façon déterministe à partir de l'historique transactionnel.

| Segment | Critère mesurable |
|---|---|
| **Newcomer** | 0 commande effectuée + < 3 sessions cumulées |
| **Casual** | 1-2 commandes effectuées sur 12 derniers mois |
| **Loyalist** | 3-5 commandes sur 12 mois OU 2+ commandes/an depuis 2 ans |
| **VIP** | 6+ commandes sur 12 mois OU LTV cumulée > 2 500€ |

**Note** : ces seuils sont des hypothèses initiales sectorielles. Une revue trimestrielle est prévue pour les ajuster en fonction de la distribution réelle des données collectées.

### 3.3 Cartographie attendue persona × segment

| Persona | Segment dominant attendu | Segments minoritaires attendus |
|---|---|---|
| Jeune Professionnel Aspirationnel | Newcomer → Casual | Rares en Loyalist, jamais VIP |
| Cadre Établi | Casual → Loyalist | Quelques VIP avec le temps |
| VIP / Connaisseur | VIP | Quelques Loyalist en transition |
| Curieux / Cadeau | Newcomer | Rares en Casual (achat ponctuel) |

L'**écart entre la distribution attendue et la distribution observée** constituera lui-même un insight analytique :

- Beaucoup de Jeunes Pro qui deviennent VIP → effet de fidélisation fort, pricing premium accepté
- Peu de Cadres Établis qui deviennent Loyalist → problème de rétention sur cette tranche
- Curieux/Cadeau qui ne reviennent jamais → opportunité de programme post-achat ciblé

---

## 4. KPIs principaux (de pilotage)

Les 5 KPIs principaux constituent la **page de synthèse** du dashboard Power BI (vue de direction). Ils sont peu nombreux, lisibles, et observés par le management.

### KPI 1 — Taux de conversion global

| Attribut | Valeur |
|---|---|
| Définition | `purchase_count / sessions_count` |
| Granularité | Daily, weekly, monthly |
| Dimensions de découpage | Channel, device, country, user_segment, persona |
| Justification | KPI maître de l'axe conversion |

### KPI 2 — Drop-off rates par étape du funnel

| Attribut | Valeur |
|---|---|
| Définition | `count(étape_N+1) / count(étape_N)` pour chaque transition du funnel |
| Granularité | Weekly typiquement |
| Dimensions | Segment, device, category |
| Justification | Permet d'identifier l'étape la plus problématique du funnel |

### KPI 3 — Panier moyen (AOV)

| Attribut | Valeur |
|---|---|
| Définition | `sum(revenue) / count(orders)` |
| Granularité | Daily, weekly, monthly |
| Dimensions | Channel, segment, persona, category mix |
| Justification | Croisement conversion × valeur (un mauvais taux à 2000€ peut être plus rentable qu'un bon à 80€) |

### KPI 4 — Taux d'abandon de panier

| Attribut | Valeur |
|---|---|
| Définition | `1 - (count(distinct_users_purchase) / count(distinct_users_add_to_cart))` |
| Granularité | Weekly |
| Dimensions | Segment, device, persona |
| Justification | KPI sectoriel de référence en e-commerce |

### KPI 5 — Time to convert

| Attribut | Valeur |
|---|---|
| Définition | Temps médian entre première session et premier achat (cohorte d'acquisition) |
| Granularité | Par cohorte mensuelle |
| Dimensions | Channel, persona |
| Justification | Comprendre le cycle d'achat par persona — un Cadre Établi ne convertit pas comme un Jeune Pro |

---

## 5. KPIs secondaires (de diagnostic)

Les KPIs secondaires permettent de **creuser** les variations observées sur les KPIs principaux. Ils sont organisés en six familles analytiques.

### Famille A — Diagnostic du funnel

- Taux view_item_list → view_item (qualité des pages catégorie)
- Taux view_item → add_to_cart (qualité des fiches produit)
- Taux add_to_cart → begin_checkout (friction au passage en checkout)
- Taux begin_checkout → add_shipping_info (friction étape livraison)
- Taux add_shipping_info → add_payment_info (friction étape paiement)
- Taux add_payment_info → purchase (friction confirmation finale)

### Famille B — Comportement et engagement

- Pages par session
- Engagement rate (% sessions engagées)
- Bounce rate
- Search usage rate (% sessions avec event search)
- Wishlist usage rate (% sessions avec event wishlist_add)
- Stock alert signups (proxy de demande > offre)

### Famille C — Catalogue et catégories

- CTR par produit listé (clic / impression dans une liste)
- Conversion rate par produit (purchases / view_item)
- Vue → vente par catégorie L1 et L2
- Top 20 produits par CA, marge, vue

### Famille D — Acquisition et canal

- Sessions par canal (Direct, Organic Search, Paid Search, Social, Email, Referral)
- Taux de conversion par canal
- CA par canal
- Coût d'acquisition par canal (V2, lorsque les données coûts seront disponibles)
- Ratio nouveaux vs returning par canal

### Famille E — Géographie et device

- Distribution sessions par pays
- Taux de conversion par pays (détection de marchés sous-performants)
- Distribution device (mobile, tablet, desktop)
- Taux de conversion par device

### Famille F — Segments et personas

- Distribution sessions par segment
- Taux de conversion par segment
- AOV par segment
- Repeat rate par segment

---

## 6. Gouvernance et conventions

### 6.1 Gouvernance

| Attribut | Valeur |
|---|---|
| Propriétaire | Mérick (data analyst / implémenteur) |
| Cadence de revue | Trimestrielle |
| Source de vérité | `docs/measurement-plan.md` versionné dans le repo GitHub |
| Outils | GA4 + GTM + BigQuery + Power BI |

### 6.2 Conventions de nommage

| Élément | Convention |
|---|---|
| Events GA4 | `snake_case` (ex. `view_item`, `add_to_cart`) |
| Dimensions custom event-scope produit | Préfixe `item_` (ex. `item_collection_season`) |
| Dimensions custom user-scope | Préfixe `user_` (ex. `user_segment`) |
| Variables GTM | Préfixe par type : `const -`, `dlv -`, `cookie -` |
| Tags GTM | Préfixe par destination : `GA4 -`, `Meta -`, etc. |

---

## 7. Couches suivantes du plan de mesure

Ce document constitue la **Couche 1** du plan de mesure (cadrage business). Les couches suivantes seront produites dans des sessions dédiées :

- **Couche 2** — Framework AARRR adapté à Maison Outremont
- **Couche 3** — Liste exhaustive des questions analytiques (15-20 questions)
- **Couche 4** — Mapping question → métrique → events → paramètres → dimensions
- **Couche 5** — Plan de taguage technique (revue critique des events)
- **Couche 6** — Dimensions et métriques personnalisées GA4 (justification individuelle)
- **Couche 7** — Conversions, audiences GA4, et stratégie de gouvernance avancée

---

*Document de travail — Maison Outremont — 2026*
