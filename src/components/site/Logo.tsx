import Image from "next/image";
import Link from "next/link";

// Logo officiel Romain DesignCode (vectoriel, sans dépendance de police).
export function Logo({ className = "", hauteur = 30, href = "/" }: { className?: string; hauteur?: number; href?: string }) {
  return (
    <Link href={href} aria-label={href === "/" ? "Romain DesignCode, accueil" : "Haut de page"} className={`inline-flex shrink-0 ${className}`}>
      <Image
        src="/img/logo-romain-designcode.svg"
        alt="Romain DesignCode"
        width={Math.round(hauteur * 3.714)}
        height={hauteur}
        priority
        unoptimized
        className="logo-sombre"
        style={{ height: hauteur, width: "auto" }}
      />
      {/* version texte foncé pour le thème clair */}
      <Image
        src="/img/logo-romain-designcode-clair.svg"
        alt=""
        width={Math.round(hauteur * 3.714)}
        height={hauteur}
        unoptimized
        className="logo-clair"
        style={{ height: hauteur, width: "auto" }}
      />
    </Link>
  );
}
