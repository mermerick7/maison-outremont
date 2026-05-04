import { CartProvider } from "./contexts/CartContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "./contexts/WishlistContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AnalyticsContext from "./components/AnalyticsContext";
import Script from "next/script";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Maison Outremont — Tailoring contemporain entre Paris et Montréal",
  description:
    "Maison de prêt-à-porter masculin haute gamme. Vestiaire intemporel, savoir-faire français, esprit montréalais. Depuis 2010.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TGTMLJTR');`}
        </Script>
      </head>
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TGTMLJTR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AnalyticsContext />
        <CartProvider>
          <CheckoutProvider>
            <WishlistProvider>
              <Header />
              <div className="flex-grow">{children}</div>
              <Footer />
            </WishlistProvider>
          </CheckoutProvider>
        </CartProvider>
      </body>
    </html>
  );
}