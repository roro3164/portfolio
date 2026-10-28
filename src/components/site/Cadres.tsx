import Image from "next/image";
import { Clip } from "./Clip";

export function Navigateur({
  src,
  alt,
  url,
  clip,
  priority = false,
  sizes = "(min-width: 1024px) 720px, 100vw",
  className = "",
}: {
  src: string;
  alt: string;
  url: string;
  /** Clip vidéo joué à la place de l'image (src sert alors d'affiche). */
  clip?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={`browser ${className}`}>
      <div className="browser-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="browser-url">{url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
      </div>
      {clip ? (
        <Clip src={clip} poster={src} label={alt} />
      ) : (
        <Image src={src} alt={alt} width={1440} height={900} sizes={sizes} priority={priority} className="block h-auto w-full" />
      )}
    </div>
  );
}

export function Telephone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`phone ${className}`}>
      <div>
        <Image src={src} alt={alt} width={390} height={844} sizes="200px" className="block h-auto w-full" />
      </div>
    </div>
  );
}
