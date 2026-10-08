import { CreditCard, Mail, MapPin, MousePointer2, Phone, Search, ShoppingBag, Star } from "lucide-react";

// Mini-interfaces animées qui racontent chaque service (CSS seul, boucle de 6 s).

export function SchemaEcommerce() {
  return (
    <div className="schema schema-ecom" aria-hidden="true">
      <div className="schema-fiche">
        <div className="schema-fiche-image" />
        <div className="mt-3 h-2 w-3/4 rounded bg-white/70" />
        <div className="mt-1.5 h-2 w-1/2 rounded bg-white/30" />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[13px] font-bold text-white">283 €</span>
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
        <CreditCard className="h-3.5 w-3.5" /> Commande payée ✓
      </div>
    </div>
  );
}

export function SchemaVitrine() {
  return (
    <div className="schema schema-vitrine" aria-hidden="true">
      <div className="schema-page">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        </div>
        <div className="mt-3 h-2.5 w-2/3 rounded bg-white/75" />
        <div className="mt-1.5 h-2.5 w-1/2 rounded bg-white/75" />
        <div className="mt-2.5 h-1.5 w-5/6 rounded bg-white/25" />
        <div className="mt-1 h-1.5 w-3/5 rounded bg-white/25" />
        <span className="schema-cta mt-3.5">Demander un devis</span>
        <MousePointer2 className="schema-curseur h-4 w-4" />
      </div>
      <div className="schema-toast schema-vitrine-toast">
        <Mail className="h-3.5 w-3.5" /> Nouvelle demande de devis
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
        <span className="schema-recherche-texte">votre métier + Montpellier</span>
      </div>
      <div className="schema-resultats">
        <div className="schema-res schema-res-moi">
          <MapPin className="h-3.5 w-3.5" />
          <span className="flex-1 truncate">Votre entreprise</span>
          <Star className="h-3 w-3 fill-[#fbbc04] text-[#fbbc04]" /> 4,9
        </div>
        <div className="schema-res schema-res-a">
          <MapPin className="h-3.5 w-3.5" />
          <span className="flex-1 truncate">Concurrent A</span>
          <Star className="h-3 w-3 fill-[#fbbc04] text-[#fbbc04]" /> 4,3
        </div>
        <div className="schema-res schema-res-b">
          <MapPin className="h-3.5 w-3.5" />
          <span className="flex-1 truncate">Concurrent B</span>
          <Star className="h-3 w-3 fill-[#fbbc04] text-[#fbbc04]" /> 4,1
        </div>
      </div>
    </div>
  );
}
