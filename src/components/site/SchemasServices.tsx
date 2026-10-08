import Image from "next/image";
import { CreditCard, Mail, MousePointer2, Phone, Search, ShoppingBag, Star } from "lucide-react";

// Mini-interfaces animées qui racontent chaque service (CSS seul, boucle de 6 s),
// avec de vrais éléments : marques fictives « Terre & Sel » (céramique, même
// univers que la démo de l'appel final) et « Atelier Morel » (menuisier).

function Etoiles({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-[7px] w-[7px] fill-[#fbbc04] text-[#fbbc04]" />
      ))}
    </span>
  );
}

export function SchemaEcommerce() {
  return (
    <div className="schema schema-ecom" aria-hidden="true">
      <div className="schema-fiche">
        <div className="schema-fiche-image">
          <Image src="/demo-cta/bol.webp" alt="" fill sizes="180px" className="object-cover" />
          <span className="schema-fiche-tag">Fait main</span>
        </div>
        <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#9b8a74]">Terre &amp; Sel</p>
        <p className="mt-0.5 font-serif text-[13px] leading-tight text-[#2b2118]">Bol Sable</p>
        <span className="mt-1 flex items-center gap-1 text-[8px] text-[#7a6a58]">
          <Etoiles /> 24 avis
        </span>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#2b2118]">38 €</span>
          <span className="schema-bouton">
            <ShoppingBag className="h-3 w-3" /> Ajouter
          </span>
        </div>
      </div>
      <div className="schema-panier">
        <ShoppingBag className="h-4 w-4" />
        <span className="schema-panier-badge">1</span>
      </div>
      <div className="schema-toast schema-ecom-toast">
        <CreditCard className="h-3.5 w-3.5" /> Commande payée · 38 €
      </div>
    </div>
  );
}

export function SchemaVitrine() {
  return (
    <div className="schema schema-vitrine" aria-hidden="true">
      <div className="schema-page">
        <div className="flex items-center justify-between px-2.5 py-1.5">
          <span className="font-serif text-[10px] text-[#2b2118]">Atelier Morel</span>
          <span className="flex gap-2 text-[6.5px] text-[#7a6a58]">
            <span>Réalisations</span>
            <span>Contact</span>
          </span>
        </div>
        <div className="relative h-[54px] overflow-hidden">
          <Image src="/demo-services/menuiserie.webp" alt="" fill sizes="220px" className="object-cover" />
        </div>
        <div className="px-2.5 pb-2.5 pt-2">
          <p className="font-serif text-[11.5px] leading-[1.15] text-[#2b2118]">Menuisier sur-mesure à Montpellier</p>
          <p className="mt-1 text-[7px] text-[#7a6a58]">Cuisines, dressings et escaliers en bois massif.</p>
          <span className="schema-cta mt-2">Demander un devis</span>
        </div>
        <MousePointer2 className="schema-curseur h-4 w-4" />
      </div>
      <div className="schema-toast schema-vitrine-toast">
        <Mail className="h-3.5 w-3.5" />
        <span className="leading-tight">
          Nouvelle demande de devis
          <span className="block text-[10px] font-normal text-white/60">Cuisine en chêne sur-mesure</span>
        </span>
      </div>
      <div className="schema-toast schema-vitrine-toast-2">
        <Phone className="h-3.5 w-3.5" /> Appel entrant
      </div>
    </div>
  );
}

export function SchemaReferencement() {
  return (
    <div className="schema schema-seo" aria-hidden="true">
      <div className="schema-recherche">
        <Search className="h-3.5 w-3.5 shrink-0 text-white/60" />
        <span className="schema-recherche-texte">menuisier Montpellier</span>
      </div>
      <div className="schema-resultats">
        <div className="schema-res schema-res-moi">
          <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-md">
            <Image src="/demo-services/cuisine.webp" alt="" fill sizes="28px" className="object-cover" />
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate font-semibold">Atelier Morel</span>
            <span className="flex items-center gap-1 text-[10px] opacity-80">
              4,9 <Etoiles /> (87) · Menuisier
            </span>
          </span>
          <span className="schema-res-badge">Ouvert</span>
        </div>
        <div className="schema-res schema-res-a">
          <span className="h-7 w-7 shrink-0 rounded-md bg-white/10" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate">Autre menuisier</span>
            <span className="flex items-center gap-1 text-[10px] opacity-80">
              4,3 <Etoiles /> (21)
            </span>
          </span>
        </div>
        <div className="schema-res schema-res-b">
          <span className="h-7 w-7 shrink-0 rounded-md bg-white/10" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate">Autre menuisier</span>
            <span className="flex items-center gap-1 text-[10px] opacity-80">
              4,1 <Etoiles /> (12)
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
