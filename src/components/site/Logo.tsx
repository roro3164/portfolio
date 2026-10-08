import Image from "next/image";
import Link from "next/link";

// Logo officiel Romain DesignCode (vectoriel, sans dépendance de police).
export function Logo({ className = "", hauteur = 30 }: { className?: string; hauteur?: number }) {
  return (
    <Link href="/" aria-label="Romain DesignCode, accueil" className={`inline-flex shrink-0 ${className}`}>
      <Image
        src="/img/logo-romain-designcode.svg"
        alt="Romain DesignCode"
        width={Math.round(hauteur * 3.714)}
        height={hauteur}
        priority
        unoptimized
        style={{ height: hauteur, width: "auto" }}
      />
    </Link>
  );
}
