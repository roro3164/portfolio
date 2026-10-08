import Image from "next/image";

// « De la maquette au site » : la même page, à gauche en maquette fil de fer,
// à droite le site livré, séparées par un trait laser qui balaie l'écran.
export function MaquetteSplit({ src, alt, url }: { src: string; alt: string; url: string }) {
  return (
    <div className="browser maquette-split">
      <div className="browser-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="browser-url">{url}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 620px, 92vw" className="object-cover object-top" />
        <div className="maquette-filaire absolute inset-0" aria-hidden="true">
          <div className="flex items-center justify-between px-[5%] pt-[4%]">
            <span className="h-[5%] w-[16%] rounded-md border border-current p-[2.2%]" />
            <span className="flex gap-[6%]" style={{ width: "42%" }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="h-[3px] flex-1 rounded bg-current opacity-60" />
              ))}
            </span>
            <span className="h-[16px] w-[12%] rounded-full border border-current" />
          </div>
          <div className="mt-[9%] px-[8%]">
            <span className="block h-[14px] w-[58%] rounded bg-current opacity-80" />
            <span className="mt-[2.5%] block h-[14px] w-[44%] rounded bg-current opacity-80" />
            <span className="mt-[4%] block h-[6px] w-[50%] rounded bg-current opacity-40" />
            <span className="mt-[1.6%] block h-[6px] w-[40%] rounded bg-current opacity-40" />
            <div className="mt-[5%] flex gap-3">
              <span className="h-[22px] w-[22%] rounded-full bg-current opacity-70" />
              <span className="h-[22px] w-[18%] rounded-full border border-current" />
            </div>
          </div>
          <div className="absolute bottom-[6%] left-[8%] right-[8%] grid grid-cols-3 gap-[3%]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="maquette-image aspect-[4/3] rounded-md border border-current" />
            ))}
          </div>
          <span className="maquette-cote absolute left-[8%] top-[22%] text-[10px] font-semibold tracking-wide">H1 · 56 px</span>
        </div>
        <span className="maquette-laser" aria-hidden="true" />
        <span className="maquette-etiquette left-3" aria-hidden="true">Maquette</span>
        <span className="maquette-etiquette right-3" aria-hidden="true">Site livré</span>
      </div>
    </div>
  );
}
