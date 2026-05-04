// src/app/lib/analytics.js
// Helper centralisé pour tous les pushs dataLayer.
// Chaque fonction encapsule une intention business, pas une logique technique.

const BRAND = "Maison Outremont";
const CURRENCY = "EUR";

// ============================================================
// Utilitaire bas niveau : push sécurisé dans le dataLayer
// ============================================================
function safePush(payload) {
  if (typeof window === "undefined") return; // garde-fou SSR
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

// ============================================================
// Mapping produit → format GA4 enhanced ecommerce
// On centralise ici le mapping pour ne pas le dupliquer.
// ============================================================
function mapProductToGA4Item(product, options = {}) {
  const { quantity = 1, size = null } = options;

  return {
    item_id: product.sku,
    item_name: product.name,
    item_brand: BRAND,
    item_category: product.category_l1_label,
    item_category2: product.category_l2_label,
    price: product.price_eur,
    quantity: quantity,
    // Variant uniquement si une taille a été sélectionnée
    ...(size && { item_variant: size }),
    // Champs custom (alimenteront les dimensions custom GA4)
    item_collection_season: product.season_collection,
    item_material_primary: product.material_primary,
    item_country_of_origin: product.country_of_origin,
    item_color: product.color,
  };
}

// ============================================================
// Variables persistantes — poussées sur chaque page
// ============================================================
export function pushPageContext({ pageType, userId = null, userLoggedIn = false, userSegment = null, userCountry = null }) {
  safePush({
    user_id: userId,
    user_logged_in: userLoggedIn,
    user_segment: userSegment,
    user_country: userCountry,
    page_type: pageType,
    currency: CURRENCY,
  });
}

// ============================================================
// Events e-commerce
// ============================================================
export function trackViewItem(product) {
  if (!product) return;

  safePush({ ecommerce: null }); // reset obligatoire
  safePush({
    event: "view_item",
    ecommerce: {
      currency: CURRENCY,
      value: product.price_eur,
      items: [mapProductToGA4Item(product)],
    },
  });
}

export function trackAddToCart(product, { size, quantity = 1 } = {}) {
  if (!product) return;

  safePush({ ecommerce: null });
  safePush({
    event: "add_to_cart",
    ecommerce: {
      currency: CURRENCY,
      value: product.price_eur * quantity,
      items: [mapProductToGA4Item(product, { quantity, size })],
    },
  });
}