import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
import "./site.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Création de site e-commerce et vitrine à Montpellier | Romain DesignCode",
    template: "%s | Romain DesignCode",
  },
  description:
    "Romain DesignCode crée des sites e-commerce Shopify et des sites vitrine sur-mesure à Montpellier : design, développement et référencement Google. Devis gratuit.",
  applicationName: SITE.nom,
  authors: [{ name: SITE.fondateur, url: `${SITE.url}/a-propos` }],
  creator: SITE.fondateur,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE.url,
    siteName: SITE.nom,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

export const viewport: Viewport = {
  themeColor: "#0e0d13",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5CPH4SSX');`,
          }}
        />
        {/* Suivi des scans QR de prospection : establishment_name → GA4 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=new URLSearchParams(location.search);var n=p.get('establishment_name');if(n){window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'qr_scan_landing',establishment_name:n});}})();`,
          }}
        />
      </head>
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5CPH4SSX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
