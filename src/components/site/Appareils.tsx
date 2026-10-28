import Image from "next/image";
import type { ReactNode } from "react";

// Mockups : MacBook en photo (captures incrustées, générées hors ligne dans /public/mockups),
// iPhone et iPad en CSS — les mêmes appareils que l'aperçu du constructeur Primaps
// (titane brossé + île dynamique, iPad 1024 × 768 à liseré alu), avec la capture
// d'écran brute posée dedans (/public/realisations).

export function Iphone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`ap-iphone ${className}`}>
      <span className="ap-bouton ap-bouton-action" aria-hidden="true" />
      <span className="ap-bouton ap-bouton-vol1" aria-hidden="true" />
      <span className="ap-bouton ap-bouton-vol2" aria-hidden="true" />
      <span className="ap-bouton ap-bouton-power" aria-hidden="true" />
      <div className="ap-iphone-titane">
        <div className="ap-iphone-bezel">
          <div className="ap-iphone-ecran">
            {children}
            <span className="ap-ile" aria-hidden="true">
              <i />
            </span>
            <span className="ap-reflet" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Ipad({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`ap-ipad ${className}`}>
      <span className="ap-bouton-haut ap-bouton-haut-1" aria-hidden="true" />
      <span className="ap-bouton-haut ap-bouton-haut-2" aria-hidden="true" />
      <div className="ap-ipad-alu">
        <div className="ap-ipad-bezel">
          <div className="ap-ipad-ecran">
            {children}
            <span className="ap-reflet" aria-hidden="true" />
          </div>
          <span className="ap-camera" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/** MacBook en CSS (écran 16:10, encoche, socle alu) : pour un clip vidéo, que les mockups en photo ne peuvent pas porter. */
export function Macbook({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`ap-mac ${className}`}>
      <div className="ap-mac-capot">
        <div className="ap-mac-ecran">
          {children}
          <span className="ap-reflet" aria-hidden="true" />
        </div>
        <span className="ap-mac-encoche" aria-hidden="true" />
      </div>
      <div className="ap-mac-socle" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}

const TAILLES: Record<string, [number, number]> = {
  "macbook-34": [1864, 1228], // MacBook de 3/4
  "macbook-face": [1446, 1228], // MacBook de face
};

/** `iphone` : capture mobile brute (390 × 844) ; `ipad` : capture 4:3 (1024 × 768). */
export type Appareil = { src: string; forme: keyof typeof TAILLES | "iphone" | "ipad"; alt: string };

export function Mockup({ a, sizes, priority = false, className = "" }: { a: Appareil; sizes: string; priority?: boolean; className?: string }) {
  if (a.forme === "iphone")
    return (
      <Iphone className={className}>
        <div className="relative aspect-[390/844]">
          <Image src={a.src} alt={a.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        </div>
      </Iphone>
    );
  if (a.forme === "ipad")
    return (
      <Ipad className={className}>
        <Image src={a.src} alt={a.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </Ipad>
    );
  const [w, h] = TAILLES[a.forme];
  return (
    <Image
      src={a.src}
      alt={a.alt}
      width={w}
      height={h}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)] ${className}`}
    />
  );
}

/** Ordinateur + téléphone superposés, le téléphone à droite (ou à gauche). */
export function DuoAppareils({
  ordinateur,
  telephone,
  priority = false,
  telephoneAGauche = false,
  sizes = "(min-width: 1024px) 640px, 92vw",
}: {
  ordinateur: Appareil;
  telephone?: Appareil;
  priority?: boolean;
  telephoneAGauche?: boolean;
  sizes?: string;
}) {
  return (
    <div className="relative">
      <div className="absolute inset-x-[2%] bottom-[-4%] top-[8%] -z-10 bg-[radial-gradient(closest-side,rgba(var(--l1),0.32),transparent)]" aria-hidden="true" />
      <div className={telephoneAGauche ? "ml-[8%]" : "mr-[8%]"}>
        <Mockup a={ordinateur} sizes={sizes} priority={priority} />
      </div>
      {telephone && (
        <div className={`absolute bottom-[-6%] ${telephoneAGauche ? "left-0" : "right-0"} w-[21%]`}>
          <Mockup a={telephone} sizes="(min-width: 1024px) 200px, 30vw" priority={priority} />
        </div>
      )}
    </div>
  );
}
