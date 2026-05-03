import { CartProvider } from "./contexts/CartContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        <CartProvider>
  <CheckoutProvider>
    <Header />
    <div className="flex-grow">{children}</div>
    <Footer />
  </CheckoutProvider>
</CartProvider>   
      </body>
    </html>
  );
}