import Image from "next/image";

// Logos clients en blanc, en défilement continu (s'arrête au survol).
const LOGOS: { src: string; nom: string; w: number; h: number }[] = [
  { src: "/logos/lumi-nice.webp", nom: "LumiNice", w: 164, h: 160 },
  { src: "/logos/maison-ribier.webp", nom: "Maison Ribier", w: 322, h: 160 },
  { src: "/logos/bistrot-des-musees.webp", nom: "Bistrot des Musées", w: 206, h: 160 },
  { src: "/logos/bistrot-fernand.svg", nom: "Bistrot Fernand", w: 1683, h: 1178 },
  { src: "/logos/nina-bonita.webp", nom: "Niña Bonita", w: 132, h: 160 },
  { src: "/logos/banana-growth.webp", nom: "Banana Growth Agency", w: 481, h: 160 },
  { src: "/logos/instant-coiffure.webp", nom: "L'Instant Coiffure", w: 264, h: 160 },
  { src: "/logos/barber-shop.webp", nom: "Barber Shop", w: 206, h: 160 },
  { src: "/logos/fuji-sushis.webp", nom: "Fuji Sushis", w: 153, h: 160 },
  { src: "/logos/eclat-gourmand.webp", nom: "Éclat Gourmand", w: 207, h: 160 },
];

function Rangee({ cachee = false }: { cachee?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20" aria-hidden={cachee || undefined}>
      {LOGOS.map((l) => {
        const large = l.w / l.h > 1.9;
        return (
          <li key={l.nom} className="shrink-0">
            <Image
              src={l.src}
              alt={cachee ? "" : l.nom}
              width={l.w}
              height={l.h}
              sizes="160px"
              className={`logo-client w-auto ${large ? "h-10 md:h-12" : "h-12 md:h-16"}`}
            />
          </li>
        );
      })}
    </ul>
  );
}

export function BandeLogos() {
  return (
    <section aria-label="Ils m'ont fait confiance" className="bande-logos border-y border-[var(--line)] py-10">
      <p className="wrap mb-8 text-center text-[13.5px] font-semibold text-[var(--faint)]">Ils m&apos;ont fait confiance</p>
      <div className="bande-logos-masque overflow-hidden">
        <div className="defile flex w-max">
          <Rangee />
          <Rangee cachee />
        </div>
      </div>
    </section>
  );
}
