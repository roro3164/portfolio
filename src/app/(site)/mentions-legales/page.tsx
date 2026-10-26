import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site romaindesigncode.fr : éditeur, hébergeur et propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <section className="wrap max-w-3xl py-16 lg:py-24">
      <h1 className="h2">Mentions légales</h1>
      <div className="prose-rdc mt-10">
        <h2>Éditeur du site</h2>
        <p>
          {SITE.nom}, entreprise individuelle (micro-entreprise) de {SITE.fondateur}
          <br />
          SIREN : {SITE.siren} · SIRET : {SITE.siret}
          <br />
          TVA non applicable, article 293 B du CGI
          <br />
          Siège : {SITE.ville}, France
          <br />
          Contact : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <br />
          Directeur de la publication : {SITE.fondateur}
        </p>
        <h2>Hébergement</h2>
        <p>Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com</p>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, le code, le design et les visuels de ce site appartiennent à {SITE.nom}, sauf mention contraire. Les
          captures des sites clients, leurs noms et logos restent la propriété de leurs titulaires.
          Toute reproduction sans autorisation écrite est interdite.
        </p>
        <h2>Responsabilité</h2>
        <p>
          Les informations de ce site sont données à titre indicatif et peuvent être modifiées à tout moment. Les liens vers
          des sites tiers n&apos;engagent pas la responsabilité de {SITE.nom}.
        </p>
      </div>
    </section>
  );
}
