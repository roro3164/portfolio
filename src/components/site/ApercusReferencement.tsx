"use client";

import Image from "next/image";
import { Globe, MapPin, MousePointer2, Phone, Search, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useSequence } from "./SchemasServices";

// Aperçus animés des trois référencements (marque fictive « Atelier Morel ») :
// la fiche monte en tête de la carte, la recherche se tape et le résultat est
// cliqué, la question est posée à l'IA qui répond en citant l'atelier. Chaque
// scène tourne en boucle, seulement lorsqu'elle est visible.

function Etoiles() {
  return (
    <span className="inline-flex">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-[9px] w-[9px] fill-[#fbbc04] text-[#fbbc04]" />
      ))}
    </span>
  );
}

type Etat = "vide" | "frappe" | "plein";

/** Texte qui s'écrit lettre par lettre (ou mot par mot) pendant l'état « frappe ». */
function FrappeInterne({ texte, etat, pas, mots }: { texte: string; etat: Etat; pas: number; mots: boolean }) {
  const unites = mots ? texte.split(" ") : Array.from(texte);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (etat !== "frappe") return;
    const t = setInterval(() => setN((k) => (k >= unites.length ? k : k + 1)), pas);
    return () => clearInterval(t);
  }, [etat, pas, unites.length]);
  const k = etat === "plein" ? unites.length : etat === "vide" ? 0 : n;
  return <>{unites.slice(0, k).join(mots ? " " : "")}</>;
}

export function Frappe(props: { texte: string; etat: Etat; pas?: number; mots?: boolean }) {
  // remonté à chaque nouvelle frappe pour repartir de zéro
  return <FrappeInterne key={props.etat === "frappe" ? "f" : "x"} pas={40} mots={false} {...props} />;
}

export const etatDe = (etape: number, debut: number): Etat => (etape < debut ? "vide" : etape === debut ? "frappe" : "plein");

export function ApercuLocal() {
  const { ref, etape, a } = useSequence([500, 450, 500, 1000, 600, 700], 2800);
  const enTete = etape >= 4;
  return (
    <div ref={ref} className="ref-apercu">
      <div className="ref-carte-plan">
        <span className="ref-pin ref-tombe" style={{ left: "22%", top: "40%" }} {...a(1)} />
        <span className="ref-pin ref-tombe" style={{ left: "70%", top: "30%" }} {...a(1)} />
        <span className={`ref-pin ref-pin-moi ref-tombe ${etape >= 5 ? "ref-pin-actif" : ""}`} style={{ left: "48%", top: "58%" }} {...a(2)}>
          <MapPin className="h-3 w-3" />
        </span>
        <span className="ref-appel ts-el" {...a(6)}>
          <Phone className="h-2.5 w-2.5" /> Appel depuis Maps
        </span>
      </div>
      <div className="ref-lignes" data-en-tete={enTete || undefined}>
        <div className="ref-rang ref-rang-moi">
          <div className="ref-ligne ref-ligne-moi ts-el" {...a(3)}>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[12.5px] font-semibold">Atelier Morel</span>
              <span className="flex items-center gap-1 text-[10.5px] opacity-80">
                4,9 <Etoiles /> (87) · Menuisier
              </span>
            </span>
            <span className={`ref-badge ${etape >= 5 ? "ref-badge-premier" : ""}`}>{etape >= 5 ? "1er" : "Ouvert"}</span>
          </div>
        </div>
        <div className="ref-rang ref-rang-autre">
          <div className="ref-ligne ts-el" {...a(3)}>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[12.5px] font-semibold">Autre menuisier</span>
              <span className="flex items-center gap-1 text-[10.5px] opacity-80">
                4,3 <Etoiles /> (21) · Menuisier
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const REQUETE = "cuisine sur-mesure chêne montpellier";

export function ApercuNaturel() {
  const { ref, etape, a } = useSequence([400, 1700, 450, 450, 800, 500], 2800);
  return (
    <div ref={ref} className="ref-apercu relative">
      <div className="ref-recherche">
        <Search className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">
          <Frappe texte={REQUETE} etat={etatDe(etape, 1)} />
          {etape === 1 && <span className="ref-caret" />}
        </span>
      </div>
      <div className="ref-resultat ts-el" {...a(3)}>
        <p className="flex items-center gap-1.5 text-[10.5px] text-[#4d5156]">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-[#e8eaed]">
            <Globe className="h-2.5 w-2.5" />
          </span>
          atelier-morel · Cuisines
        </p>
        <p className={`ref-titre-lien mt-1 text-[13px] leading-snug text-[#1a0dab] ${etape >= 6 ? "ref-titre-clic" : ""}`}>
          Cuisine sur-mesure en chêne massif à Montpellier
        </p>
        <p className="mt-1 text-[10.5px] leading-snug text-[#4d5156]">Cuisines dessinées et fabriquées dans notre atelier. Devis gratuit, pose comprise…</p>
      </div>
      <div className="ref-resultat ts-el" {...a(4)}>
        <div className="opacity-45">
          <span className="block h-2 w-1/3 rounded bg-[#dadce0]" />
          <span className="mt-2 block h-2.5 w-4/5 rounded bg-[#c6d2f5]" />
          <span className="mt-2 block h-2 w-3/4 rounded bg-[#e8eaed]" />
        </div>
      </div>
      <span
        className="sx-curseur ref-curseur"
        data-visible={(etape >= 5 && etape <= 6) || undefined}
        data-clic={etape === 6 || undefined}
        style={{ left: etape >= 5 ? "38%" : "70%", top: etape >= 5 ? "47%" : "95%" }}
      >
        <MousePointer2 className="h-4 w-4" />
      </span>
      <span className="ref-devis ts-el" {...a(6)}>
        Nouvelle demande de devis
      </span>
    </div>
  );
}

const QUESTION = "Quel menuisier pour une cuisine sur-mesure à Montpellier ?";
const REPONSE_DEBUT = "Je vous recommande";
const REPONSE_FIN = ": noté 4,9 sur Google, spécialisé dans les cuisines en bois massif.";

export function ApercuIA() {
  const { ref, etape, a } = useSequence([300, 1500, 1100, 300, 1300, 500], 3000);
  return (
    <div ref={ref} className="ref-apercu min-h-[168px]">
      <p className="ref-bulle ts-el ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[#ececf1] px-3 py-2 text-[11.5px] text-[#202123]" {...a(1)}>
        <Frappe texte={QUESTION} etat={etatDe(etape, 1)} pas={22} />
      </p>
      <div className="mt-2.5 flex gap-2">
        <span className={`ref-ia-logo ts-el ${etape === 2 ? "ref-ia-reflechit" : ""}`} {...a(2)}>
          <Sparkles className="h-3 w-3" />
        </span>
        <div className="min-h-[64px] text-[11.5px] leading-snug text-[#202123]">
          {etape === 2 && (
            <span className="ref-points" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          )}
          {etape >= 3 && (
            <>
              <Frappe texte={REPONSE_DEBUT} etat={etatDe(etape, 3)} mots pas={90} />{" "}
              {etape >= 4 && <b className={etape >= 6 ? "ref-cite" : ""}>Atelier Morel</b>}{" "}
              {etape >= 4 && <Frappe texte={REPONSE_FIN} etat={etatDe(etape, 4)} mots pas={90} />}
            </>
          )}
          <span className="ts-el mt-1.5 flex items-center gap-1.5" {...a(5)}>
            <span className="relative h-4 w-4 overflow-hidden rounded-full">
              <Image src="/demo-services/cuisine.webp" alt="" fill sizes="16px" className="object-cover" />
            </span>
            <span className="rounded-full bg-[#ececf1] px-2 py-0.5 text-[9.5px] text-[#555]">Sources : site, fiche Google, avis</span>
          </span>
        </div>
      </div>
    </div>
  );
}
