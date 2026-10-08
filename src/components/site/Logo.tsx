import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Romain DesignCode, accueil" className={`inline-flex flex-col leading-[0.95] ${className}`}>
      <span className="text-[15px] font-semibold tracking-[0.18em]">ROMAIN</span>
      <span className="text-[15px] font-semibold tracking-[0.18em]">
        <span style={{ color: "var(--violet-2)" }}>DESIGN</span>CODE
      </span>
    </Link>
  );
}
