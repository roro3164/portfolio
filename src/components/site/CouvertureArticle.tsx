"use client";

import Image from "next/image";
import { ArrowRight, Check, MapPin, Mail, RefreshCw, ShoppingBag, Sparkles, Star } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

// Couverture d'article faite de vrais éléments d'interface (devis, fiche Google,
// redirections, réponse d'IA…), dessinée à 360 px de large puis mise à l'échelle.

const LARGEUR = 360;

function Etoiles() {
  return (
    <span className="inline-flex">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-[8px] w-[8px] fill-[#fbbc04] text-[#fbbc04]" />
      ))}
    </span>
  );
}

const SCENES: Record<string, () => ReactNode> = {
  "prix-creation-site-internet": () => (
    <div className="cv-carte left-[70px] top-[18px] w-[220px]">
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9b8a74]">Devis · Site vitrine</p>
      {["Design sur-mesure", "5 pages et leurs textes", "Formulaire de contact", "Référencement de base"].map((l) => (
        <p key={l} className="mt-1.5 flex items-center justify-between border-b border-[#efe7da] pb-1.5 text-[10.5px] text-[#2b2118]">
          {l}
          <Check className="h-3 w-3 text-[#2f8f4e]" strokeWidth={3} />
        </p>
      ))}
      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#2b2118]">Total : sur devis</span>
        <span className="cv-btn bg-[#2f8f4e]">Accepter</span>
      </div>
    </div>
  ),
  "shopify-ou-woocommerce": () => (
    <>
      <div className="cv-carte left-[30px] top-[44px] w-[120px] text-center">
        <span className="mx-auto grid h-9 w-9 place-items-center rounded-xl bg-[#5e8e3e] text-white">
          <ShoppingBag className="h-4 w-4" />
        </span>
        <p className="mt-2 text-[12px] font-bold text-[#2b2118]">Shopify</p>
        <p className="text-[9px] text-[#7a6a58]">Hébergé, tout compris</p>
      </div>
      <span className="cv-vs left-[163px] top-[80px]">VS</span>
      <div className="cv-carte left-[210px] top-[44px] w-[120px] text-center">
        <span className="mx-auto grid h-9 w-9 place-items-center rounded-xl bg-[#7f54b3] text-[13px] font-black text-white">W</span>
        <p className="mt-2 text-[12px] font-bold text-[#2b2118]">WooCommerce</p>
        <p className="text-[9px] text-[#7a6a58]">Sur WordPress</p>
      </div>
    </>
  ),
  "apparaitre-premier-google-maps": () => (
    <>
      <div className="cv-plan" />
      <span className="cv-pin left-[60px] top-[60px]" />
      <span className="cv-pin left-[290px] top-[140px]" />
      <span className="cv-pin cv-pin-moi left-[180px] top-[118px]">
        <MapPin className="h-3.5 w-3.5" />
      </span>
      <div className="cv-carte left-[92px] top-[22px] flex w-[190px] items-center gap-2 !py-2">
        <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md">
          <Image src="/demo-services/cuisine.webp" alt="" fill sizes="32px" className="object-cover" />
        </span>
        <span className="flex-1 leading-tight">
          <span className="block text-[11px] font-bold text-[#2b2118]">Atelier Morel</span>
          <span className="flex items-center gap-1 text-[9px] text-[#7a6a58]">
            4,9 <Etoiles /> (87) · Ouvert
          </span>
        </span>
        <span className="cv-btn bg-[#4285f4]">1er</span>
      </div>
    </>
  ),
  "refonte-site-sans-perdre-referencement": () => (
    <div className="absolute left-[34px] right-[34px] top-[40px] space-y-2.5">
      {[
        ["/produits.php?id=12", "/boutique/bol-sable"],
        ["/page-contact.html", "/contact"],
      ].map(([a, b]) => (
        <div key={a} className="flex items-center gap-2">
          <span className="cv-url opacity-60 line-through decoration-white/40">{a}</span>
          <span className="cv-301">
            301 <ArrowRight className="h-3 w-3" />
          </span>
          <span className="cv-url">{b}</span>
        </div>
      ))}
      <span className="cv-puce mx-auto mt-3 flex w-fit items-center gap-1.5">
        <Check className="h-3 w-3" strokeWidth={3} /> Positions Google conservées
      </span>
    </div>
  ),
  "gros-catalogue-e-commerce": () => (
    <>
      <div className="absolute inset-[14px] overflow-hidden rounded-xl border border-white/10">
        <Image src="/realisations/lumi-nice-catalogue.webp" alt="" fill sizes="420px" className="object-cover object-[50%_70%]" />
      </div>
      <span className="cv-puce absolute left-[26px] top-[26px] !bg-[#8b5cf6]">13 500+ produits en ligne</span>
      <span className="cv-puce absolute bottom-[26px] right-[26px] flex items-center gap-1.5">
        <RefreshCw className="h-3 w-3" /> Stock synchronisé il y a 1 h
      </span>
    </>
  ),
  "site-vitrine-qui-convertit": () => (
    <>
      <div className="cv-carte left-[40px] top-[16px] w-[200px] overflow-hidden !p-0">
        <p className="px-2.5 py-1.5 font-serif text-[10px] text-[#2b2118]">Atelier Morel</p>
        <div className="relative h-[54px]">
          <Image src="/demo-services/menuiserie.webp" alt="" fill sizes="200px" className="object-cover" />
        </div>
        <div className="p-2.5">
          <p className="font-serif text-[11.5px] leading-tight text-[#2b2118]">Menuisier sur-mesure à Montpellier</p>
          <span className="cv-btn mt-2 inline-block bg-[#2f8f4e] shadow-[0_0_14px_rgba(47,143,78,0.8)]">Demander un devis</span>
        </div>
      </div>
      <div className="cv-toast right-[18px] top-[118px]">
        <Mail className="h-3.5 w-3.5" /> Nouvelle demande de devis
      </div>
    </>
  ),
  "referencement-ia-geo": () => (
    <div className="absolute left-[30px] right-[30px] top-[24px] space-y-2.5">
      <p className="ml-auto w-fit rounded-2xl rounded-br-md bg-white/10 px-3 py-2 text-[11px] text-white ring-1 ring-white/15">
        Quel menuisier sur-mesure à Montpellier ?
      </p>
      <div className="flex gap-2">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] text-white">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <p className="rounded-2xl rounded-tl-md bg-white px-3 py-2 text-[11px] leading-snug text-[#2b2118]">
          Je vous recommande <b>Atelier Morel</b>, noté 4,9 sur Google pour ses cuisines en bois massif.
          <span className="mt-1 block text-[9px] text-[#4285f4]">Sources : site web et fiche Google</span>
        </p>
      </div>
    </div>
  ),
};

export function CouvertureArticle({ slug, couleur, className = "" }: { slug: string; couleur: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => el.style.setProperty("--k", String(e.contentRect.width / LARGEUR)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const Scene = SCENES[slug];
  return (
    <div ref={ref} data-couleur={couleur} className={`couverture ${className}`} aria-hidden="true">
      <div className="couverture-zoom">{Scene ? <Scene /> : null}</div>
    </div>
  );
}
