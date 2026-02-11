"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";


const SplitScreen: React.FC = () => {
  const { t } = useTranslation("page");
  const [activeZone, setActiveZone] = useState<"left" | "right" | null>(null);

  const scrollToOffers = () => {
    const el = document.getElementById("services");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full md:h-[620px]"
    style={{
      maskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
      perspective: '1200px',
    }}>

      {/* Conteneur invisible pour conserver la hauteur */}
      <div className="invisible">
        <LeftComponent />
      </div>

      {/* Section gauche en fond */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <div className="relative">
          <LeftComponent />
        </div>
      </div>

      {/* Section droite avec clip-path */}
      <div
        className="absolute inset-0 bg-[#0F0E12] transition-all duration-700"
        style={{
          clipPath:
            activeZone === "left"
              ? "inset(0 0 0 100%)"
              : activeZone === "right"
              ? "inset(0 0 0 0)"
              : "inset(0 0 0 50%)",
          zIndex: activeZone === "right" ? 5 : 2,
        }}
      >
        <RightComponent />
      </div>

      {/* Barre verticale (effet laser) */}
      <div
        className="absolute top-0 bottom-0 transition-all mt-5 duration-700 h-[calc(100%-20px)] md:h-[530px]"
        style={{
          left:
            activeZone === "left"
              ? "100%"
              : activeZone === "right"
              ? "0"
              : "50%",
          transform: "translateX(-50%)",
          zIndex: 6,
          width: "2px",
          backgroundColor: "#6a5acd",
          boxShadow: `
            0 0 10px #4b0082,
            0 0 20px #1e90ff,
            0 0 30px #6a5acd,
            0 0 40px #4b0082,
            0 0 50px #1e90ff,
            0 0 70px #6a5acd
          `,
        }}
      >
        <div
          className="absolute w-full"
          style={{
            height: "25%",
            background:
              "linear-gradient(180deg, transparent, #6a5acd, #ffffff, #6a5acd, transparent)",
            boxShadow: "0 0 20px #bc13fe",
            animation: "laserMove 4s linear infinite",
            opacity: 0.8,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes laserMove {
          0% {
            top: 0;
          }
          50% {
            top: 75%;
          }
          100% {
            top: 0;
          }
        }
      `}</style>
      <style jsx global>{`
        .sticker-coin {
          transform-style: preserve-3d;
        }
        .sticker-coin:hover {
          animation: coinSpin 3.5s ease-in-out infinite;
        }
        @keyframes coinSpin {
          0%    { transform: rotateY(0deg); }
          22%   { transform: rotateY(180deg); }
          50%   { transform: rotateY(180deg); }
          72%   { transform: rotateY(0deg); }
          100%  { transform: rotateY(0deg); }
        }
      `}</style>

      {/* Pastille circulaire promo - au-dessus du hover gauche */}
      <motion.div
        className="absolute right-[2%] top-[2%] -translate-y-1/2 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: [1, 1.06, 1],
        }}
        transition={{
          opacity: { duration: 0.5, ease: "easeOut" },
          scale: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <motion.div
          role="button"
          tabIndex={0}
          onClick={scrollToOffers}
          onKeyDown={(e) => e.key === "Enter" && scrollToOffers()}
          className="sticker-coin w-36 h-36 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center text-white font-jakarta font-extrabold shadow-[0_0_30px_rgba(106,90,205,0.4)] cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #6a5acd 50%, #8b5cf6 100%)",
            border: "4px solid rgba(255,255,255,0.5)",
          }}
        >
        <div className="-rotate-6 flex flex-col items-center justify-center">
          <span className="text-sm sm:text-base uppercase tracking-wide font-extrabold">{t("hero.sticker.des")}</span>
          <span className="text-3xl sm:text-4xl font-extrabold">599€</span>
          <span className="text-sm sm:text-base uppercase tracking-wide font-extrabold">{t("hero.sticker.offreLimitee")}</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wide font-semibold text-white/95">{t("hero.sticker.voirOffre")}</span>
        </div>
        </motion.div>
      </motion.div>

      {/* Zones de hover gauche/droite */}
      <div
        className="absolute top-0 bottom-0 w-1/2 left-0 cursor-pointer"
        style={{ zIndex: 7 }}
        onMouseEnter={() => setActiveZone("left")}
        onMouseLeave={() => setActiveZone(null)}
      />
      <div
        className="absolute top-0 bottom-0 w-1/2 right-0 cursor-pointer"
        style={{ zIndex: 7 }}
        onMouseEnter={() => setActiveZone("right")}
        onMouseLeave={() => setActiveZone(null)}
      />
    </div>
  );
};

export default SplitScreen;