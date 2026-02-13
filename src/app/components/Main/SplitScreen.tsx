"use client";

import { useState } from "react";

import LeftComponent from "./LeftComponent";
import RightComponent from "./RightComponent";


const SplitScreen: React.FC = () => {
  const [activeZone, setActiveZone] = useState<"left" | "right" | null>(null);

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