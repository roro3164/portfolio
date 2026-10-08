import Image from "next/image";

// Mockups photo (MacBook ou iPad + iPhone) avec les vraies captures incrustées.
// Les images sont générées hors ligne dans /public/mockups (perspective exacte de l'écran).

const TAILLES: Record<string, [number, number]> = {
  "macbook-34": [1864, 1228], // MacBook de 3/4
  "macbook-face": [1446, 1228], // MacBook de face
  "iphone-face": [888, 1760], // iPhone de face
  "ipad-paysage": [2200, 1596], // iPad en paysage, de face
};

export type Appareil = { src: string; forme: keyof typeof TAILLES; alt: string };

export function Mockup({ a, sizes, priority = false, className = "" }: { a: Appareil; sizes: string; priority?: boolean; className?: string }) {
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
      <div className="absolute inset-x-[10%] bottom-[6%] top-[20%] -z-10 rounded-full bg-[rgba(var(--l1),0.35)] blur-[70px]" aria-hidden="true" />
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
