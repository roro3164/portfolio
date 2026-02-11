"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-provider";

// --- TYPES ---
export interface NavLink {
  label: string;
  href: string;
  theme?: "dark" | "light";
}

interface NavbarProps {
  // Contenu
  logoLight?: string;
  logoDark?: string;
  logoHeaderTop?: string; // Logo pour header en haut
  logoHeaderScroll?: string; // Logo pour header en scroll (réduit)
  logoText?: string;
  logoSize?: {
    top?: number; // Taille du logo en haut (multiplicateur, défaut: 1.0)
    scroll?: number; // Taille du logo en scroll (multiplicateur, défaut: 1.0)
  };
  logoDisplayMode?: "image" | "image-text"; // Mode d'affichage du logo (deprecated, utiliser logoTopConfig/logoScrollConfig)
  logoTextConfig?: {
    name?: string; // Nom du restaurant (ligne 1)
    subtitle?: string; // Sous-texte (ligne 2)
    nameStyle?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
    };
    subtitleStyle?: {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
    };
  }; // Deprecated, utiliser logoTopConfig/logoScrollConfig
  logoTopConfig?: {
    displayMode?: "image" | "image-text";
    alignment?: "left" | "center" | "right";
    gap?: number; // Espacement entre les éléments (en rem)
    size?: number;
    className?: string;
    textConfig?: {
      name?: string;
      subtitle?: string;
      nameStyle?: {
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
      };
      subtitleStyle?: {
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
      };
    };
  };
  logoScrollConfig?: {
    displayMode?: "image" | "image-text";
    alignment?: "left" | "center" | "right";
    gap?: number; // Espacement entre les éléments (en rem)
    size?: number;
    className?: string;
    textConfig?: {
      name?: string;
      subtitle?: string;
      nameStyle?: {
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
      };
      subtitleStyle?: {
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
      };
    };
  };
  links: readonly NavLink[];
  children?: React.ReactNode;
  servicePages?: { slug: string; label: string }[];
  servicesDropdownLabel?: string;
  /** Position 1-based du dropdown Services (défaut 3 = 3e) */
  servicesDropdownPosition?: number;
  basePath?: string;

  // Style Global
  variant?: "glass" | "simple";
  font?: string;
  weight?: string;

  // Style Specifique Liens
  textColor?: string;
  navbarTheme?: "dark" | "light" | "auto"; // Thème forcé ("auto" = détection automatique)
  headerVariant?: "standard" | "glass-sticky";

  className?: string;
}

// --- NAVBAR COMPONENT ---
export function Navbar({
  logoLight,
  logoDark,
  logoHeaderTop,
  logoHeaderScroll,
  logoText = "Logo",
  logoSize,
  logoDisplayMode = "image",
  logoTextConfig,
  logoTopConfig,
  logoScrollConfig,
  links,
  children,
  servicePages,
  servicesDropdownLabel = "Services",
  servicesDropdownPosition = 3,
  basePath,
  variant = "glass",
  font = "font-sans",
  weight = "font-medium",
  textColor,
  navbarTheme = "auto",
  headerVariant = "standard",
  className,
}: NavbarProps) {
  const { theme, customVariables } = useTheme();
  const isAlwaysGlass = headerVariant === "glass-sticky";
  const [isShrunk, setIsShrunk] = useState(isAlwaysGlass);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const hasServicesDropdown = !!(servicePages && servicePages.length > 0);
  const serviceHrefs = (servicePages || []).map((p) =>
    basePath ? `${basePath.replace(/\/$/, "")}/${p.slug}` : `/${p.slug}`,
  );
  const insertIdx = Math.min(
    Math.max(0, (servicesDropdownPosition ?? 3) - 1),
    links?.length ?? 0,
  );
  const linksBefore = (links || []).slice(0, insertIdx);
  const linksAfter = (links || []).slice(insertIdx);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkListener);
    function checkListener() {
      checkMobile();
    }
    return () => window.removeEventListener("resize", checkListener);
  }, []);

  // ✅ Fallback : utiliser theme.assetVariant si disponible
  const themeBasedFallback: "dark" | "light" =
    theme?.assetVariant === "light" ? "light" : "dark";

  // Si navbarTheme est défini (dark/light), l'utiliser directement, sinon détection auto
  const forcedTheme = navbarTheme !== "auto" ? navbarTheme : null;

  // État initial : forcedTheme > theme.assetVariant > "dark"
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">(
    forcedTheme || themeBasedFallback,
  );

  const pillRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);

  // 1. SCROLL LOGIC (désactivée si headerVariant = "glass-sticky")
  useEffect(() => {
    if (isAlwaysGlass) {
      setIsShrunk(true);
      return;
    }

    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      const scrollTop: number =
        typeof window === "undefined"
          ? 0
          : window.scrollY ??
            document.documentElement.scrollTop ??
            document.body?.scrollTop ??
            0;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsShrunk(scrollTop > 0), 50);
    };

    window.addEventListener("scroll", handleScroll as any, {
      passive: true,
    } as any);
    handleScroll();

    return () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      window.removeEventListener("scroll", handleScroll as any);
    };
  }, [isAlwaysGlass]);

  // 1b. Détection thème par section (Intersection Observer)
  useEffect(() => {
    if (forcedTheme || textColor) {
      setCurrentTheme(forcedTheme ?? themeBasedFallback);
      return;
    }

    const sectionSelectors = links
      .filter((l) => l.href.startsWith("#"))
      .map((l) => ({
        href: l.href,
        theme: (l.theme ?? themeBasedFallback) as "dark" | "light",
      }));
    if (sectionSelectors.length === 0) {
      setCurrentTheme(themeBasedFallback);
      return;
    }

    const observed = new Map<
      Element,
      { href: string; theme: "dark" | "light" }
    >();
    const ROOT_MARGIN_TOP_PX = 100;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const byTop = [...intersecting].sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
        );
        const topmost = byTop[0];
        const meta = observed.get(topmost.target);
        if (meta) requestAnimationFrame(() => setCurrentTheme(meta.theme));
      },
      {
        root: null,
        rootMargin: `-${ROOT_MARGIN_TOP_PX}px 0px 0px 0px`,
        threshold: 0,
      },
    );

    for (const { href, theme } of sectionSelectors) {
      const el = document.querySelector(href);
      if (el) {
        observed.set(el, { href, theme });
        observer.observe(el);
      }
    }

    return () => {
      observed.clear();
      observer.disconnect();
    };
  }, [links, textColor, forcedTheme, themeBasedFallback]);

  // Mettre à jour le fallback si theme.assetVariant change
  useEffect(() => {
    if (!forcedTheme && !textColor && navbarTheme === "auto") {
      setCurrentTheme(themeBasedFallback);
    }
  }, [theme?.assetVariant, forcedTheme, textColor, navbarTheme, themeBasedFallback]);

  // 2. DISABLE SCROLL WHEN MOBILE MENU OPEN
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  // 2b. Close services dropdown on outside click
  useEffect(() => {
    if (!servicesOpen) return;
    const onOutside = (e: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("click", onOutside);
    return () => document.removeEventListener("click", onOutside);
  }, [servicesOpen]);

  // --- STYLE CALCULATIONS ---
  const finalTextColor = "text-white";

  // Logo selon état
  const activeLogoSrc = (() => {
    if (isShrunk && logoHeaderScroll) {
      return logoHeaderScroll;
    }
    if (!isShrunk && logoHeaderTop) {
      return logoHeaderTop;
    }
    if (textColor) {
      return textColor.includes("black")
        ? logoDark || logoLight
        : logoLight || logoDark;
    }
    return currentTheme === "dark"
      ? logoDark || logoLight
      : logoLight || logoDark;
  })();

  const pillColorClass =
    variant === "glass"
      ? currentTheme === "light"
        ? "bg-white/70 backdrop-blur-xl border border-black/10"
        : "bg-black/30 backdrop-blur-xl border border-white/15"
      : currentTheme === "light"
        ? "bg-black/30 backdrop-blur-md"
        : "bg-white/50 backdrop-blur-md";

  const dropdownHeaderStyle =
    currentTheme === "light"
      ? "bg-white/85 backdrop-blur-xl border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
      : "bg-black/50 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.25)]";

  const primaryColor = "#9788fb";

  const currentLogoConfig = isShrunk
    ? logoScrollConfig || { displayMode: logoDisplayMode, textConfig: logoTextConfig }
    : logoTopConfig || { displayMode: logoDisplayMode, textConfig: logoTextConfig };

  const currentDisplayMode =
    currentLogoConfig?.displayMode || logoDisplayMode || "image";
  const currentTextConfig = currentLogoConfig?.textConfig || logoTextConfig;

  const currentLogoScale = isShrunk
    ? isMobile
      ? (currentLogoConfig as any)?.sizeMobile ??
        (currentLogoConfig as any)?.size ??
        logoSize?.scroll ??
        1.0
      : (currentLogoConfig as any)?.sizeDesktop ??
        (currentLogoConfig as any)?.size ??
        logoSize?.scroll ??
        1.0
    : isMobile
      ? (currentLogoConfig as any)?.sizeMobile ??
        (currentLogoConfig as any)?.size ??
        logoSize?.top ??
        1.0
      : (currentLogoConfig as any)?.sizeDesktop ??
        (currentLogoConfig as any)?.size ??
        logoSize?.top ??
        1.0;

  const currentLogoImageWidth = isMobile ? (isShrunk ? 80 : 140) : isShrunk ? 120 : 200;
  const currentLogoImageTextWidth = isMobile ? (isShrunk ? 70 : 90) : isShrunk ? 80 : 120;

  return (
    <>
      <style jsx global>{`
        .variant-glass-active {
          backdrop-filter: blur(18px) saturate(140%);
        }
        .glass-overlay {
          backdrop-filter: blur(20px) saturate(150%);
        }
      `}</style>

      {/* HEADER */}
      <header
        className={cn(
          "z-[60] transition-all duration-300",
          isShrunk
            ? "fixed left-1/2 -translate-x-1/2 w-[80%] top-4"
            : "relative w-full mb-8 lg:mb-14",
          font,
          finalTextColor,
          className,
        )}
      >
        <div
          className={cn(
            "transition-all duration-500 ease-in-out w-full max-w-full relative",
            isShrunk
              ? "flex items-center justify-between pl-4 pr-4 md:px-6 py-1 md:py-2 rounded-full border shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
              : "flex justify-between items-start h-10 lg:h-16",
            variant === "glass" &&
              isShrunk &&
              "variant-glass-active",
            variant === "glass" &&
              isShrunk &&
              (currentTheme === "dark"
                ? "bg-black/20 border-white/10"
                : "bg-white/60 border-black/5"),
            variant === "simple" &&
              isShrunk &&
              "bg-white/95 border-gray-100 dark:bg-gray-900/95 dark:border-gray-800",
            isMobileMenuOpen &&
              isShrunk &&
              "!bg-transparent !border-transparent !shadow-none",
          )}
        >
          {/* LOGO */}
          <div className="flex-shrink-0 relative z-10">
            <Link
              href="/"
              className="block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {currentDisplayMode === "image-text" && currentTextConfig ? (
                <div
                  className={cn(
                    "flex flex-col transition-all duration-300",
                    currentLogoConfig?.alignment === "center"
                      ? "items-center"
                      : currentLogoConfig?.alignment === "right"
                        ? "items-end"
                        : "items-start",
                    currentLogoConfig?.className,
                  )}
                  style={{
                    gap: `${currentLogoConfig?.gap ?? 0.25}rem`,
                  }}
                >
                  {activeLogoSrc && activeLogoSrc.trim() !== "" && (
                    <div
                      className={cn(
                        "relative transition-all duration-300",
                        isShrunk ? "h-8 md:h-12" : "h-12 md:h-20",
                      )}
                      style={{
                        width: `${Math.round(
                          currentLogoImageTextWidth * currentLogoScale,
                        )}px`,
                      }}
                    >
                      <Image
                        src={activeLogoSrc}
                        alt={currentTextConfig.name || logoText || "Logo"}
                        fill
                        className="object-contain"
                        priority
                        fetchPriority="high"
                        quality={70}
                        sizes="(max-width: 768px) 80px, 120px"
                      />
                    </div>
                  )}
                  {currentTextConfig.name && (
                    <div
                      className="transition-all duration-300 leading-tight whitespace-nowrap"
                      style={{
                        color:
                          currentTextConfig.nameStyle?.color ||
                          (textColor ||
                            (currentTheme === "dark" ? "#fff" : "#000")),
                        fontFamily:
                          currentTextConfig.nameStyle?.fontFamily || undefined,
                        fontSize:
                          currentTextConfig.nameStyle?.fontSize ||
                          (isShrunk ? "1rem" : "1.25rem"),
                        fontWeight:
                          currentTextConfig.nameStyle?.fontWeight || "bold",
                        transform: `scale(${currentLogoScale})`,
                        transformOrigin:
                          currentLogoConfig?.alignment === "center"
                            ? "center top"
                            : currentLogoConfig?.alignment === "right"
                              ? "right top"
                              : "left top",
                      }}
                    >
                      {currentTextConfig.name}
                    </div>
                  )}
                  {currentTextConfig.subtitle && (
                    <div
                      className="transition-all duration-300 leading-tight"
                      style={{
                        color:
                          currentTextConfig.subtitleStyle?.color ||
                          (textColor ||
                            (isShrunk ? "#666" : "#ccc")),
                        fontFamily:
                          currentTextConfig.subtitleStyle?.fontFamily ||
                          undefined,
                        fontSize:
                          currentTextConfig.subtitleStyle?.fontSize ||
                          (isShrunk ? "0.75rem" : "0.875rem"),
                        fontWeight:
                          currentTextConfig.subtitleStyle?.fontWeight ||
                          "normal",
                        transform: `scale(${currentLogoScale})`,
                        transformOrigin:
                          currentLogoConfig?.alignment === "center"
                            ? "center top"
                            : "left top",
                      }}
                    >
                      {currentTextConfig.subtitle}
                    </div>
                  )}
                </div>
              ) : activeLogoSrc && activeLogoSrc.trim() !== "" ? (
                <div
                  className={cn(
                    "relative transition-all duration-300",
                    isShrunk ? "h-10 md:h-16" : "h-16 md:h-28",
                    currentLogoConfig?.className,
                  )}
                  style={{
                    width: `${Math.round(
                      currentLogoImageWidth * currentLogoScale,
                    )}px`,
                  }}
                >
                  <Image
                    src={activeLogoSrc}
                    alt={logoText || "Logo"}
                    fill
                    className="object-contain"
                    priority
                    fetchPriority="high"
                    quality={70}
                    sizes="(max-width: 768px) 120px, 342px"
                  />
                </div>
              ) : (
                <span
                  className={cn(
                    "tracking-tight transition-all duration-300",
                    weight,
                    textColor
                      ? `text-xl md:text-3xl ${textColor}`
                      : isShrunk
                        ? "text-xl md:text-3xl text-foreground"
                        : "text-2xl md:text-3xl text-white",
                  )}
                  style={{
                    transform: `scale(${
                      isShrunk ? logoSize?.scroll ?? 1.0 : logoSize?.top ?? 1.0
                    })`,
                    transformOrigin: "left center",
                    display: "inline-block",
                  }}
                >
                  {logoText}
                </span>
              )}
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:block relative">
            <ul
              ref={navListRef}
              className={cn(
                "flex items-center font-jakarta relative z-10",
                isShrunk ? "gap-2 text-lg" : "gap-14 text-xl",
                weight,
              )}
            >
              {linksBefore.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-2 transition-all duration-300 relative z-10 text-white",
                    )}
                    style={{ transition: "color 0.3s ease" }}
                    onMouseEnter={(e) => {
                      if (!isShrunk) return;
                      const target = e.currentTarget as HTMLElement;
                      target.style.setProperty("color", primaryColor, "important");
                      target.style.textShadow =
                        "0 0 15px #8a2be2, 0 0 30px #9400d3, 0 0 45px #6a5acd, 0 0 60px #4b0082";
                    }}
                    onMouseLeave={(e) => {
                      if (!isShrunk) return;
                      (e.currentTarget as HTMLElement).style.removeProperty("color");
                      (e.currentTarget as HTMLElement).style.textShadow = "";
                    }}
                  >
                    {(link as any).labelConfig?.content ?? link.label}
                  </Link>
                </li>
              ))}
              {hasServicesDropdown && (
                <li className="relative">
                  <div ref={servicesRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setServicesOpen((o) => !o)}
                      className={cn(
                        "block px-4 py-2 transition-all duration-300 relative z-10 text-left w-full text-white",
                        servicesOpen && "opacity-90",
                      )}
                      style={{ transition: "color 0.3s ease" }}
                      onMouseEnter={(e) => {
                        if (!isShrunk) return;
                        const target = e.currentTarget as HTMLElement;
                        target.style.setProperty("color", primaryColor, "important");
                        target.style.textShadow =
                          "0 0 15px #8a2be2, 0 0 30px #9400d3, 0 0 45px #6a5acd, 0 0 60px #4b0082";
                      }}
                      onMouseLeave={(e) => {
                        if (!isShrunk) return;
                        e.currentTarget.style.removeProperty("color");
                        e.currentTarget.style.textShadow = "";
                      }}
                    >
                      {servicesDropdownLabel} ▾
                    </button>
                    {servicesOpen && (
                      <div
                        className={cn(
                          "absolute top-full left-0 mt-5 py-2 min-w-[220px] rounded-xl z-50",
                          dropdownHeaderStyle,
                        )}
                        role="listbox"
                      >
                        {(servicePages || []).map((p, j) => (
                          <Link
                            key={j}
                            href={serviceHrefs[j]}
                            onClick={() => {
                              setServicesOpen(false);
                            }}
                            className={cn(
                              "block px-4 py-2.5 transition-colors text-left text-sm",
                              currentTheme === "dark"
                                ? "text-white hover:bg-white/10"
                                : "text-black hover:bg-black/5",
                            )}
                          >
                            {p.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              )}
              {linksAfter.map((link, i) => (
                <li key={`after-${i}`}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-2 transition-all duration-300 relative z-10 text-white",
                    )}
                    style={{ transition: "color 0.3s ease" }}
                    onMouseEnter={(e) => {
                      if (!isShrunk) return;
                      const target = e.currentTarget as HTMLElement;
                      target.style.setProperty("color", primaryColor, "important");
                      target.style.textShadow =
                        "0 0 15px #8a2be2, 0 0 30px #9400d3, 0 0 45px #6a5acd, 0 0 60px #4b0082";
                    }}
                    onMouseLeave={(e) => {
                      if (!isShrunk) return;
                      (e.currentTarget as HTMLElement).style.removeProperty("color");
                      (e.currentTarget as HTMLElement).style.textShadow = "";
                    }}
                  >
                    {(link as any).labelConfig?.content ?? link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ACTIONS & TOGGLE */}
          <div className="flex items-center gap-2 md:gap-4 relative z-[70]">
            {isShrunk && children && (
              <div className="hidden md:block">{children}</div>
            )}

            <button
              onClick={() => {
                if (!isMobileMenuOpen) setServicesMobileOpen(false);
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="lg:hidden p-2 focus:outline-none"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <div className="relative w-6 h-5">
                <span
                  className={cn(
                    "absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ease-in-out",
                    isMobileMenuOpen ? "top-2.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-2.5 w-full h-0.5 bg-current transition-all duration-200 ease-in-out",
                    isMobileMenuOpen ? "opacity-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ease-in-out",
                    isMobileMenuOpen ? "top-2.5 -rotate-45" : "top-5",
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={cn(
          "fixed inset-0 z-[50] flex flex-col items-center justify-center transition-all duration-500 glass-overlay",
          currentTheme === "dark" ? "bg-black/80" : "bg-white/80",
          isMobileMenuOpen
            ? "opacity-100 visible backdrop-blur-xl"
            : "opacity-0 invisible backdrop-blur-none pointer-events-none",
        )}
      >
        <nav className={cn("flex flex-col items-center gap-8 text-center", font)}>
          {linksBefore.map((link, i) => (
            <Link
              key={`mb-${i}`}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                (currentTheme === "dark" ? "text-white" : "text-black") +
                  " text-4xl md:text-5xl tracking-tight transition-all duration-300 transform",
                weight === "font-medium" ? "font-bold" : weight,
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0",
                "hover:scale-105",
                currentTheme === "dark"
                  ? "hover:text-gray-200"
                  : "hover:text-gray-700",
              )}
              style={{ transitionDelay: `${i * 50}ms` } as React.CSSProperties}
            >
              {(link as any).labelConfig?.content ?? link.label}
            </Link>
          ))}
          {hasServicesDropdown && (
            <div
              className={cn(
                "flex flex-col items-center",
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0",
              )}
              style={{
                transitionDelay: `${linksBefore.length * 50}ms`,
              } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={() => setServicesMobileOpen((o) => !o)}
                className={cn(
                  (currentTheme === "dark" ? "text-white" : "text-black") +
                    " text-4xl md:text-5xl tracking-tight transition-all duration-300 transform",
                  weight === "font-medium" ? "font-bold" : weight,
                  "hover:scale-105 cursor-pointer inline-flex items-center justify-center gap-2",
                  currentTheme === "dark"
                    ? "hover:text-gray-200"
                    : "hover:text-gray-700",
                )}
              >
                {servicesDropdownLabel}
                <span
                  className={cn(
                    "inline-block text-2xl transition-transform duration-300",
                    servicesMobileOpen && "rotate-180",
                  )}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-all duration-300 ease-in-out",
                  servicesMobileOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0 flex flex-col items-center gap-6 pt-6">
                  {(servicePages || []).map((p, j) => (
                    <Link
                      key={j}
                      href={serviceHrefs[j]}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        (currentTheme === "dark" ? "text-white" : "text-black") +
                          " text-2xl md:text-3xl tracking-tight transition-all duration-300 transform",
                        weight === "font-medium" ? "font-semibold" : weight,
                        "hover:scale-105",
                        currentTheme === "dark"
                          ? "hover:text-gray-200"
                          : "hover:text-gray-700",
                      )}
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          {linksAfter.map((link, i) => (
            <Link
              key={`ma-${i}`}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                (currentTheme === "dark" ? "text-white" : "text-black") +
                  " text-4xl md:text-5xl tracking-tight transition-all duration-300 transform",
                weight === "font-medium" ? "font-bold" : weight,
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0",
                "hover:scale-105",
                currentTheme === "dark"
                  ? "hover:text-gray-200"
                  : "hover:text-gray-700",
              )}
              style={{
                transitionDelay: `${
                  (linksBefore.length + (hasServicesDropdown ? 1 : 0) + i) * 50
                }ms`,
              } as React.CSSProperties}
            >
              {(link as any).labelConfig?.content ?? link.label}
            </Link>
          ))}

          {isShrunk && children && (
            <div className="mt-8 lg:hidden animate-in fade-in zoom-in duration-500 delay-300">
              {children}
            </div>
          )}
        </nav>
      </div>
    </>
  );
}

export default Navbar;

