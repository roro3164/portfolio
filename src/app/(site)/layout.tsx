import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { entreprise, graphe, personne, siteWeb } from "@/lib/schema";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fond-site" aria-hidden="true">
        <span className="fond-nappe fond-nappe-1" />
        <span className="fond-nappe fond-nappe-2" />
        <span className="fond-nappe fond-nappe-3" />
        <span className="fond-nappe fond-nappe-4" />
      </div>
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
