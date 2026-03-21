'use client';

export default function PromoBar() {
  const content = (
    <>
      <span>🔥</span>
      <span className="font-bold">
        Offre Limitée : Site pro sur-mesure dès 399€
      </span>
      <span className="hidden sm:inline">
        {" "}
        • Positionnement Google • Gestion Fiche Google • Démo Gratuite
      </span>
      <span className="hidden lg:inline">
        {" "}
        • Sans Engagement • Option mensuelle à 149€/mois
      </span>
      <span className="hidden sm:inline">🔥</span>
    </>
  );

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white overflow-hidden">
      <style jsx>{`
        .promo-track {
          display: inline-flex;
          white-space: nowrap;
          animation: promo-marquee 25s linear infinite;
        }
        @keyframes promo-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="py-2.5">
        <div className="promo-track">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-semibold px-4"
            >
              {content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
