import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/boutique/${product.sku}`}
      className="group block"
    >
      {/* Bloc visuel — couleur du produit en aplat */}
      <div
        className="relative w-full aspect-[4/5] overflow-hidden bg-cream-light flex items-end justify-start p-6 transition-all duration-500 group-hover:opacity-90"
        style={{ backgroundColor: product.color_hex }}
      >
        {/* Badge nouveauté */}
        {product.is_new && (
          <span className="absolute top-4 right-4 text-[10px] tracking-[0.3em] uppercase bg-cream/90 text-navy px-3 py-1.5">
            Nouveauté
          </span>
        )}

        {/* SKU en filigrane */}
        <span
          className="text-[10px] tracking-[0.2em] uppercase opacity-50"
          style={{
            color: isLightColor(product.color_hex) ? "#2C2826" : "#F5F1EB",
          }}
        >
          {product.sku}
        </span>
      </div>

      {/* Métadonnées sous l'image */}
      <div className="mt-4 px-1">
        <p className="text-[10px] tracking-[0.3em] text-stone uppercase mb-1">
          {product.category_l2_label}
        </p>
        <h3 className="font-serif text-xl text-navy mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="text-xs text-charcoal/60 mb-2">
          {product.color} · {product.material_primary}
        </p>
        <p className="text-sm text-charcoal font-medium">
          {product.price_eur.toLocaleString("fr-FR")} €
        </p>
      </div>
    </Link>
  );
}

// Helper : déterminer si une couleur est claire ou foncée
// pour adapter la couleur du texte
function isLightColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}