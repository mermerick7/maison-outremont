// src/app/components/AnalyticsContext.js
// Composant invisible : pousse les variables persistantes du dataLayer
// à chaque changement de page. Importé dans le layout racine.

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pushPageContext } from "../lib/analytics";
import { usePageType } from "../lib/usePageType";

export default function AnalyticsContext() {
  const pathname = usePathname();
  const pageType = usePageType();

  useEffect(() => {
    pushPageContext({
      pageType: pageType,
      // En Option A on laisse les autres champs à leurs valeurs par défaut (null/false)
    });
  }, [pathname, pageType]);

  return null; // ce composant ne rend rien à l'écran
}