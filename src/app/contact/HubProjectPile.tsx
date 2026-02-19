"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

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

function PlaceholderSlide({ metier, isActive }: { metier: string; isActive: boolean }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/20 min-h-[200px] sm:min-h-[260px]">
      <span className="text-white/60 font-jakarta text-sm">Bientôt</span>
      <span
        className="text-white font-jakarta font-semibold text-lg mt-2"
        style={{ opacity: isActive ? 1 : 0.5, transition: "opacity 0.3s" }}
      >
        {metier}
      </span>
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

  const handleSwipeEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > 50 && sites.length > 1) {
      if (distance > 0) nextSlide();
      else previousSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const showControls = sites.length > 1;
  const currentSite = sites[activeIndex];

  const metierLabel = !currentSite?.isPlaceholder && currentSite?.metier && (
    <p
      className="text-white font-jakarta font-semibold text-center mb-2"
      style={{ fontSize: "28px", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
    >
      {currentSite.metier}
    </p>
  );

  const carouselBlock = (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{ aspectRatio: "16/10", maxHeight: columnMode ? 280 : 320 }}
      {...(columnMode && {
        onTouchStart: (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX),
        onTouchMove: (e: React.TouchEvent) => setTouchEnd(e.touches[0].clientX),
        onTouchEnd: handleSwipeEnd,
      })}
    >
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{
          width: `${sites.length * 100}%`,
          transform: `translateX(-${(activeIndex / sites.length) * 100}%)`,
        }}
      >
        {sites.map((site, index) => (
          <div
            key={site.title}
            className="flex-shrink-0 w-full h-full flex items-center justify-center p-2 sm:p-4 cursor-pointer"
            style={{ width: `${100 / sites.length}%` }}
            onClick={() => handleCardClick(index)}
          >
            {site.isPlaceholder ? (
              <PlaceholderSlide metier={site.metier} isActive={index === activeIndex} />
            ) : (
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ transform: site.imageScale ? `scale(${site.imageScale})` : undefined }}
              >
                <Image
                  src={site.imageProject}
                  alt={site.title}
                  width={600}
                  height={400}
                  className="object-contain w-full h-full"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const dotsBlock = showControls && (
    <div className="flex justify-center gap-2 py-3">
      {sites.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleDotClick(index);
          }}
          className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
            index === activeIndex ? "bg-purple-500 scale-125" : "bg-white/40 hover:bg-white/60"
          }`}
          aria-label={`Slide ${index + 1}`}
        />
      ))}
    </div>
  );

  const arrowsBlock = showControls && !columnMode && (
    <div className="flex items-center justify-center gap-4 w-full py-2">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          previousSlide();
        }}
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
        aria-label="Précédent"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"
        aria-label="Suivant"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );

  const titleBlock = !columnMode && (
    <div className="w-full flex flex-col items-center justify-center px-4 min-w-0 pt-2">
      <h4 className="text-white font-jakarta font-bold text-2xl sm:text-3xl text-center tracking-tight">
        {sectorTitle}
      </h4>
      <p className="text-white/80 font-jakarta text-sm sm:text-base mt-1 text-center">
        ({metiers.join(", ")})
      </p>
    </div>
  );

  const swipeHintBlock = columnMode && showControls && (
    <p className="text-white/50 font-jakarta text-xs text-center flex items-center justify-center gap-1.5 w-full py-1">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-70 shrink-0">
        <path d="M4 12h16M8 8l-4 4 4 4M20 8l-4 4 4 4" />
      </svg>
      Swipez pour faire défiler
    </p>
  );

  return (
    <div className={`flex flex-col items-center w-full max-w-[400px] xl1200:max-w-none ${columnMode ? "mx-auto" : ""}`}>
      {columnMode ? (
        <div className="flex flex-col items-center w-full">
          {metierLabel}
          {carouselBlock}
          {dotsBlock}
          {swipeHintBlock}
        </div>
      ) : (
        <>
          {metierLabel}
          {carouselBlock}
          {arrowsBlock}
          {titleBlock}
          {dotsBlock}
        </>
      )}
    </div>
  );
}
