"use client";

import React, { useState, useEffect } from "react";
import { ProjectCard } from "../components/Card/Carousel/ProjectCard";
import styles from "../components/Card/Carousel/Carousel.module.scss";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    setMatches(m.matches);
    const handler = () => setMatches(m.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

interface SiteData {
  imageProject: string;
  logoProject: string;
  title: string;
  url?: string;
  imageScale?: number;
  metier?: string;
}

interface HubProjectPileProps {
  sites: (SiteData & { isPlaceholder?: boolean; metier: string })[];
  sectorTitle: string;
  metiers: string[];
  columnMode?: boolean;
}

function PlaceholderCard({ title, metier, isActive }: { title: string; metier: string; isActive: boolean }) {
  return (
    <div className={`${styles.glassCardProject} ${styles.hubCard}`}>
      <div className={styles.imageContainer}>
        <span className="text-white/60 font-jakarta text-sm">Bientôt</span>
      </div>
      <div className={`${styles.boxBottomCard} flex items-center justify-center`}>
        <span 
          className="text-white font-jakarta font-semibold text-lg sm:text-xl text-center"
          style={{ 
            opacity: isActive ? 1 : 0,
            transition: 'opacity 0.7s ease-in-out',
            textShadow: '0 1px 2px black, 0 0 4px black'
          }}
        >
          {metier}
        </span>
      </div>
    </div>
  );
}

export function HubProjectPile({
  sites,
  sectorTitle,
  metiers,
  columnMode = false,
}: HubProjectPileProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const getCardStyle = (index: number) => {
    const diff = (index - activeIndex + sites.length) % sites.length;
    const isActive = diff === 0;

    const transform = isActive
      ? "translate(-45%, -2%) rotate(-12deg) scale(0.95)"
      : `translate(calc(-50% + ${diff * 12}px), -${diff}px)`;

    return {
      position: "absolute" as const,
      left: "50%",
      top: "-30%",
      transform,
      zIndex: sites.length - diff,
      opacity: isActive ? 1 : 0.35,
      transition: "all 0.5s ease-in-out",
      cursor: isActive ? "pointer" : "default",
    };
  };

  const handleCardClick = (index: number) => {
    const site = sites[index];
    if (index === activeIndex && site.url) {
      window.open(site.url, "_blank", "noopener,noreferrer");
    } else if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % sites.length);
  };

  const previousSlide = () => {
    setActiveIndex((prev) => (prev - 1 + sites.length) % sites.length);
  };

  const handleDotClick = (index: number) => {
    if (index !== activeIndex) setActiveIndex(index);
  };

  const handleCardSwipeEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > 50 && sites.length > 1) {
      if (distance > 0) {
        setActiveIndex((prev) => (prev + 1) % sites.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + sites.length) % sites.length);
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const showControls = !columnMode && sites.length > 1;

  const cardsBlock = (
    <div className={`relative w-full flex justify-center overflow-visible pt-4 ${isDesktop ? "h-80" : "h-[240px]"}`}>
      <div
        className={`absolute left-1/2 -translate-x-1/2 overflow-visible ${isDesktop ? "w-[320px] h-80" : "w-[220px] h-[240px]"}`}
        {...(columnMode && {
          onTouchStart: (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX),
          onTouchMove: (e: React.TouchEvent) => setTouchEnd(e.touches[0].clientX),
          onTouchEnd: handleCardSwipeEnd,
        })}
      >
        {sites.map((site, index) => (
          <div
            key={site.title}
            style={getCardStyle(index)}
            onClick={() => handleCardClick(index)}
            className={index === activeIndex ? "hub-pile-active-card" : ""}
          >
            {site.isPlaceholder ? (
              <PlaceholderCard title={site.title} metier={site.metier} isActive={index === activeIndex} />
            ) : (
              <ProjectCard
                imageProject={site.imageProject}
                logoProject={site.logoProject}
                imageOpacity={index === activeIndex ? 1 : 0.4}
                className={styles.hubCard}
                imageScale={site.imageScale}
                metier={site.metier}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const dotsBlock = columnMode && sites.length > 1 && (
    <p className="text-white/70 font-jakarta font-bold text-sm py-1">
      {activeIndex + 1}/{sites.length}
    </p>
  );

  const swipeHintBlock = columnMode && sites.length > 1 && (
    <p className="text-white/50 font-jakarta text-xs text-center flex items-center justify-center gap-1.5 w-full">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70 shrink-0">
        <path d="M4 12h16M8 8l-4 4 4 4M20 8l-4 4 4 4" />
      </svg>
      Swipez pour faire défiler
    </p>
  );

  const titleBlock = (
    <div className="w-full flex flex-col items-center justify-center px-4 min-w-0">
      <h4 className="text-white font-jakarta font-bold text-xl sm:text-2xl text-center tracking-tight">
        {sectorTitle}
      </h4>
      <p className="text-white/80 font-jakarta text-sm sm:text-base mt-1.5 text-center">
        ({metiers.join(", ")})
      </p>
    </div>
  );

  const controlsBlock = showControls && (
    <div className="flex items-center justify-center gap-4 sm:gap-6 w-full py-3">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          previousSlide();
        }}
        className="hub-pile-nav-arrow flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
        aria-label="Carte précédente"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      {sites.length > 1 && (
        <div className="flex gap-4">
          {sites.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                index === activeIndex ? "bg-purple-500/60 scale-125" : "bg-gray-500"
              }`}
              aria-label={`Site ${index + 1}`}
            />
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="hub-pile-nav-arrow flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
        aria-label="Carte suivante"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className={`flex flex-col items-center w-full max-w-[340px] xl1200:max-w-none ${columnMode ? "relative mx-auto" : ""}`}>
      {columnMode ? (
        <div className="relative flex flex-col justify-start gap-2 w-full items-center">
          <div className="flex flex-col items-center justify-center w-full">{cardsBlock}</div>
          <div className="flex flex-col items-center -mt-2">
            {dotsBlock}
            {swipeHintBlock}
          </div>
        </div>
      ) : (
        <>
          {cardsBlock}
          <div className="-mt-10 xl1200:mt-5 mb-3">{titleBlock}</div>
          {controlsBlock}
        </>
      )}
      <style jsx>{`
        @media (min-width: 1200px) {
          .hub-pile-active-card:hover {
            animation: hubPileBounce 4s infinite ease-in-out;
          }
        }
        @media (max-width: 1199px) {
          .hub-pile-active-card:hover {
            animation: hubPileBounceMobile 4s infinite ease-in-out;
          }
        }
        .hub-pile-active-card > div {
          position: relative;
          overflow: hidden;
        }
        .hub-pile-active-card > div::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transform: skewX(-15deg);
          animation: hubPileShine 2.5s infinite;
          z-index: 2;
          border-radius: inherit;
        }
        @keyframes hubPileBounce {
          0%, 100% { transform: translate(-45%, -2%) rotate(-12deg) scale(0.95) translateZ(0); }
          50% { transform: translate(-45%, -2%) rotate(-12deg) scale(1.1) translateZ(50px); }
        }
        @keyframes hubPileBounceMobile {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes hubPileShine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .hub-pile-nav-arrow:hover {
          transform: scale(1.1);
        }
        .hub-pile-dot {
          background: #333;
        }
        .hub-pile-dot-active {
          background: rgba(139, 92, 246, 0.5);
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
}
