import Image from "next/image";

export function Navigateur({
  src,
  alt,
  url,
  priority = false,
  sizes = "(min-width: 1024px) 720px, 100vw",
  className = "",
}: {
  src: string;
  alt: string;
  url: string;
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
      <Image src={src} alt={alt} width={1440} height={900} sizes={sizes} priority={priority} className="block h-auto w-full" />
    </div>
  );
}
