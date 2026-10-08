import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { entreprise, graphe, personne, siteWeb } from "@/lib/schema";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Aller au contenu
      </a>
      <JsonLd data={graphe(entreprise, personne, siteWeb)} />
      <Header />
      <main id="contenu">{children}</main>
      <Footer />
    </>
  );
}
