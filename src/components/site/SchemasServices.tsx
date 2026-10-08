"use client";

import Image from "next/image";
import { CreditCard, Mail, MapPin, MousePointer2, Navigation, Phone, Search, ShoppingBag, Star } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

// Mini-interfaces animées des 3 services, avec de vrais éléments (marques
// fictives « Terre & Sel » et « Atelier Morel ») : chaque site se construit
// élément par élément, puis l'action se joue (achat, demande de devis, montée
// dans Google). La séquence ne tourne que lorsque le schéma est visible.

/** Avance d'une étape après chaque durée ; à la fin, pause, tout s'efface, et on recommence. */
function useSequence(durees: number[], pause = 2800) {
  const ref = useRef<HTMLDivElement>(null);
  const n = durees.length;
  const [etape, setEtape] = useState(n);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    let visible = false;
    const cycle = () => {
      let i = 0;
      setEtape(0);
      const suivant = () => {
        if (!visible) return;
        if (i < n) {
          t = setTimeout(() => {
            i += 1;
            setEtape(i);
            suivant();
          }, durees[i]);
        } else {
          t = setTimeout(() => {
            setEtape(-1);
            t = setTimeout(cycle, 700);
          }, pause);
        }
      };
      suivant();
    };
    const obs = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      clearTimeout(t);
      if (visible) cycle();
    });
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** attributs d'un élément qui apparaît à l'étape i */
  const a = (i: number) => ({ "data-on": etape >= i ? "" : undefined, "data-sort": etape === -1 ? "" : undefined });
  return { ref, etape, a };
}

/** Curseur qui se déplace d'un point à l'autre ; `clic` le fait enfoncer. */
function Curseur({ x, y, visible, clic }: { x: number; y: number; visible: boolean; clic: boolean }) {
  return (
    <span className="sx-curseur" data-visible={visible || undefined} data-clic={clic || undefined} style={{ left: x, top: y }}>
      <MousePointer2 className="h-4 w-4" />
    </span>
  );
}

function Etoiles() {
  return (
    <span className="inline-flex" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-[7px] w-[7px] fill-[#fbbc04] text-[#fbbc04]" />
      ))}
    </span>
  );
}

/* ---------- E-commerce : la fiche se construit, ajout au panier, paiement ---------- */

const ECOM = [300, 350, 280, 250, 250, 250, 650, 650, 450, 650, 650, 400];

export function SchemaEcommerce() {
  const { ref, etape, a } = useSequence(ECOM);
  const pos = etape >= 10 ? { x: 250, y: 142 } : etape >= 7 ? { x: 130, y: 144 } : { x: 290, y: 220 };
  return (
    <div ref={ref} className="schema schema-x" aria-hidden="true">
      <div className="sx-fiche sx" {...a(1)}>
        <div className="sx-image sx-reveal" {...a(2)}>
          <Image src="/demo-cta/bol.webp" alt="" fill sizes="180px" className="object-cover" />
          <span className="sx-tag">Fait main</span>
        </div>
        <div className="sx" {...a(3)}>
          <p className="mt-1.5 text-[7px] font-semibold uppercase tracking-[0.16em] text-[#9b8a74]">Terre &amp; Sel</p>
          <p className="font-serif text-[13px] leading-tight text-[#2b2118]">Bol Sable</p>
        </div>
        <span className="sx mt-0.5 flex items-center gap-1 text-[7.5px] text-[#7a6a58]" {...a(4)}>
          <Etoiles /> 4,9 · 24 avis
        </span>
        <span className="sx mt-1.5 flex items-center gap-1" {...a(5)}>
          <i className="sx-teinte bg-[#e7d6bb] ring-1 ring-[#2b2118]" />
          <i className="sx-teinte bg-[#6f6a66]" />
          <i className="sx-teinte bg-[#b35a33]" />
          <span className="ml-1 text-[7px] text-[#7a6a58]">Sable</span>
        </span>
        <div className="sx mt-1.5 flex items-center justify-between" {...a(6)}>
          <span className="text-[13px] font-bold text-[#2b2118]">38 €</span>
          <span className="sx-btn" data-clic={etape === 8 || undefined}>
            <ShoppingBag className="h-3 w-3" /> Ajouter
          </span>
        </div>
      </div>

      <div className="sx-panier-icone sx" {...a(1)}>
        <ShoppingBag className="h-4 w-4" />
        <span className="sx-badge" data-on={etape >= 8 ? "" : undefined}>
          1
        </span>
      </div>
      <div className="sx-panier sx" {...a(9)}>
        <p className="text-[8px] font-bold text-[#2b2118]">Votre panier (1)</p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded">
            <Image src="/demo-cta/bol.webp" alt="" fill sizes="24px" className="object-cover" />
          </span>
          <span className="flex-1 text-[7.5px] font-semibold leading-tight text-[#2b2118]">
            Bol Sable
            <span className="block font-normal text-[#9b8a74]">Qté 1</span>
          </span>
          <span className="text-[8px] font-bold text-[#2b2118]">38 €</span>
        </div>
        <div className="mt-1.5 flex justify-between border-t border-[#ece3d5] pt-1.5 text-[7.5px] text-[#7a6a58]">
          <span>Livraison</span>
          <span className="font-semibold text-[#3a8a4f]">Offerte</span>
        </div>
        <span className="sx-btn sx-btn-plein mt-1.5" data-clic={etape === 11 || undefined}>
          <CreditCard className="h-3 w-3" /> Payer 38 €
        </span>
      </div>

      <Curseur x={pos.x} y={pos.y} visible={etape >= 7 && etape <= 11} clic={etape === 8 || etape === 11} />
      <div className="schema-toast sx-toast sx" {...a(11)} style={{ left: "50%", bottom: -14, marginLeft: -86 }}>
        <CreditCard className="h-3.5 w-3.5" /> Commande payée · 38 €
      </div>
      <div className="schema-toast sx-toast sx" {...a(12)} style={{ right: -6, top: 166 }}>
        Stock mis à jour
      </div>
    </div>
  );
}

/* ---------- Vitrine : le site se construit, demande de devis, appel ---------- */

const VITRINE = [300, 350, 280, 250, 250, 250, 650, 600, 450, 500, 500, 600, 450, 700];

export function SchemaVitrine() {
  const { ref, etape, a } = useSequence(VITRINE);
  const pos = etape >= 11 ? { x: 250, y: 140 } : etape >= 7 ? { x: 46, y: 126 } : { x: 290, y: 220 };
  return (
    <div ref={ref} className="schema schema-x" aria-hidden="true">
      <div className="sx-page sx" {...a(1)}>
        <div className="flex items-center justify-between px-2.5 py-1.5">
          <span className="font-serif text-[10px] text-[#2b2118]">Atelier Morel</span>
          <span className="flex gap-2 text-[6.5px] text-[#7a6a58]">
            <span>Réalisations</span>
            <span>Avis</span>
            <span>Contact</span>
          </span>
        </div>
        <div className="sx-image sx-reveal !h-[50px] !rounded-none" {...a(2)}>
          <Image src="/demo-services/menuiserie.webp" alt="" fill sizes="220px" className="object-cover" />
        </div>
        <div className="px-2.5 pb-2.5 pt-1.5">
          <p className="sx font-serif text-[11px] leading-[1.15] text-[#2b2118]" {...a(3)}>
            Menuisier sur-mesure à Montpellier
          </p>
          <p className="sx mt-0.5 text-[6.8px] text-[#7a6a58]" {...a(4)}>
            Cuisines, dressings et escaliers en bois massif.
          </p>
          <span className="sx mt-1.5 flex gap-1" {...a(5)}>
            <span className="sx-btn sx-btn-vert" data-clic={etape === 8 || undefined}>
              Demander un devis
            </span>
            <span className="sx-btn sx-btn-clair">Nos réalisations</span>
          </span>
          <span className="sx mt-1.5 flex items-center gap-1 text-[6.8px] text-[#7a6a58]" {...a(6)}>
            <Etoiles /> 4,9 · 87 avis Google
          </span>
        </div>
      </div>

      <div className="sx-form sx" {...a(8)}>
        <p className="text-[8px] font-bold text-[#2b2118]">Demande de devis</p>
        <span className="sx-champ">
          <span className="text-[#9b8a74]">Nom</span>
          <span className="sx-saisie" data-on={etape >= 9 ? "" : undefined}>
            Mme Martin
          </span>
        </span>
        <span className="sx-champ">
          <span className="text-[#9b8a74]">Projet</span>
          <span className="sx-saisie" data-on={etape >= 10 ? "" : undefined}>
            Cuisine en chêne
          </span>
        </span>
        <span className="sx-btn sx-btn-vert mt-1.5 w-full justify-center" data-clic={etape === 12 || undefined}>
          Envoyer
        </span>
      </div>

      <Curseur x={pos.x} y={pos.y} visible={etape >= 7 && etape <= 12} clic={etape === 8 || etape === 12} />
      <div className="schema-toast sx-toast sx" {...a(12)} style={{ right: -10, bottom: -12 }}>
        <Mail className="h-3.5 w-3.5" />
        <span className="leading-tight">
          Nouvelle demande de devis
          <span className="block text-[10px] font-normal text-white/60">Cuisine en chêne · Mme Martin</span>
        </span>
      </div>
      <div className="schema-toast sx-toast sx" {...a(13)} style={{ left: -8, top: -14 }}>
        <Phone className="h-3.5 w-3.5" /> Appel entrant
      </div>
    </div>
  );
}

/* ---------- Référencement : recherche, carte, optimisation, montée en 1re place ---------- */

const SEO = [300, 1100, 350, 300, 250, 250, 450, 350, 350, 700, 700];

export function SchemaReferencement() {
  const { ref, etape, a } = useSequence(SEO);
  const premier = etape >= 10;
  const top = (r: number): CSSProperties => ({ top: r * 46 });
  return (
    <div ref={ref} className="schema schema-x" aria-hidden="true">
      <div className="sx-recherche sx" {...a(1)}>
        <span className="sx-g">G</span>
        <span className="sx-frappe" data-on={etape >= 2 ? "" : undefined} data-sort={etape === -1 ? "" : undefined}>
          menuisier Montpellier
        </span>
        <Search className="ml-auto h-3.5 w-3.5 shrink-0 text-white/60" />
      </div>

      <div className="sx-carte sx" {...a(3)}>
        <span className="sx-route sx-route-1" />
        <span className="sx-route sx-route-2" />
        <span className="sx-pin" style={{ left: "26%", top: "30%" }} />
        <span className="sx-pin" style={{ left: "64%", top: "52%" }} />
        <span className="sx-pin sx-pin-moi" data-top={premier || undefined} style={{ left: "40%", top: "72%" }}>
          <MapPin className="h-3 w-3" />
        </span>
      </div>

      <div className="sx-resultats">
        <div className="sx-res sx" {...a(4)} style={top(premier ? 1 : 0)}>
          <span className="h-7 w-7 shrink-0 rounded-md bg-white/10" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate">Autre menuisier</span>
            <span className="flex items-center gap-1 text-[9.5px] opacity-80">
              4,3 <Etoiles /> (21)
            </span>
          </span>
        </div>
        <div className="sx-res sx" {...a(5)} style={top(premier ? 2 : 1)}>
          <span className="h-7 w-7 shrink-0 rounded-md bg-white/10" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate">Autre menuisier</span>
            <span className="flex items-center gap-1 text-[9.5px] opacity-80">
              4,1 <Etoiles /> (12)
            </span>
          </span>
        </div>
        <div className="sx-res sx-res-moi sx" data-top={premier || undefined} {...a(6)} style={top(premier ? 0 : 2)}>
          <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md">
            <Image src="/demo-services/cuisine.webp" alt="" fill sizes="28px" className="object-cover" />
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate font-semibold">Atelier Morel</span>
            <span className="flex items-center gap-1 text-[9.5px] opacity-80">
              4,9 <Etoiles /> (87)
            </span>
          </span>
          <span className="sx-optims">
            <span className="sx-optim sx" {...a(7)}>+ Photos</span>
            <span className="sx-optim sx" {...a(8)}>+ Avis</span>
            <span className="sx-optim sx" {...a(9)}>+ Posts</span>
          </span>
        </div>
      </div>

      <div className="schema-toast sx-toast sx" {...a(11)} style={{ left: -6, bottom: -12 }}>
        <Navigation className="h-3.5 w-3.5" /> Itinéraire demandé
      </div>
    </div>
  );
}
