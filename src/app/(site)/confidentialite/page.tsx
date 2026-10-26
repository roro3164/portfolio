import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment romaindesigncode.fr traite les données envoyées par le formulaire de devis et les statistiques de visite.",
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  return (
    <section className="wrap max-w-3xl py-16 lg:py-24">
      <h1 className="h2">Politique de confidentialité</h1>
      <div className="prose-rdc mt-10">
        <p>
          Le responsable du traitement est {SITE.fondateur} ({SITE.nom}, SIRET {SITE.siret}), joignable à{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <h2>Formulaire de devis</h2>
        <p>
          Les informations que vous envoyez (nom, entreprise, e-mail, téléphone, message) servent uniquement à répondre à
          votre demande et, si nous travaillons ensemble, à établir le devis et la facture. Elles ne sont ni vendues ni
          cédées. Elles sont conservées trois ans après notre dernier échange, puis supprimées.
        </p>
        <h2>Statistiques de visite</h2>
        <p>
          Le site utilise Google Tag Manager et Google Analytics pour mesurer sa fréquentation (pages vues, provenance des
          visites). Ces outils peuvent déposer des cookies.
        </p>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en écrivant à{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Vous pouvez aussi adresser une réclamation à la CNIL (cnil.fr).
        </p>
      </div>
    </section>
  );
}
