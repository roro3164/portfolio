"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "./header.module.scss";
import Navbar, { NavLink } from "./Navbar";
import ButtonNeuromorphic from "./ButtonNeuromorphic";

const Header: React.FC<{ minimal?: boolean }> = ({ minimal = false }) => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop =
        window.scrollY ??
        document.documentElement.scrollTop ??
        document.body.scrollTop ??
        0;
      // Petit seuil pour éviter les clignotements
      setShowSticky(scrollTop > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    if (sectionId === "contact") {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const headerHeight = 120;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: elementPosition, behavior: "smooth" });
  };

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };

  const handleContactClick = () => {
    setTimeout(() => {
      scrollToSection("contact");
    }, 100);
  };

  const toggleMenu = () => setMenuOpen((open) => !open);
  const toggleLangMenu = () => setLangMenuOpen((open) => !open);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const getCurrentFlag = () => {
    const shortLang = i18n.language?.substring(0, 2);
    switch (shortLang) {
      case "fr":
        return "/image/icons/frenchFlag.svg";
      case "es":
        return "/image/icons/spanishFlag.svg";
      case "en":
      default:
        return "/image/icons/englishFlag.svg";
    }
  };

  const links: NavLink[] = [
    { label: t("header.seo"), href: "#seo" },
    { label: t("header.developer"), href: "#developer" },
    { label: t("header.designer"), href: "#designer" },
    { label: t("header.services"), href: "#services" },
    { label: t("header.projects"), href: "#projects" },
    { label: t("header.contact"), href: "#contact" },
  ];

  const logoBlock = (
    <div className="relative h-6 lg:h-8">
      <div className="absolute inset-0 filter blur-[6px] opacity-50">
        <Image
          src="/image/icons/logo.svg"
          alt="Romain DesignCode"
          width={150}
          height={40}
          className="w-auto h-full"
        />
      </div>
      <Image
        src="/image/icons/logo2.svg"
        alt="ROMAIN DEV Logo"
        width={140}
        height={36}
        className="w-auto h-12 lg:h-16 relative"
      />
    </div>
  );

  if (minimal) {
    return (
      <header
        className="relative flex justify-between items-start h-10 lg:h-16 mb-8 lg:mb-14 text-white"
      >
        <Link href="/" className="block">
          {logoBlock}
        </Link>
      </header>
    );
  }

  return (
    <>
      {/* HEADER INITIAL COMME AVANT */}
      <header
        className={`
          relative 
          flex justify-between
          items-start
          h-10 lg:h-16
          mb-8 lg:mb-14
          text-white
          transition-opacity duration-300
          ${showSticky ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        {/* LOGO À GAUCHE */}
        {logoBlock}

        {/* CONTENEUR À DROITE : en colonne */}
        <div className="flex flex-col items-end w-auto gap-2">
          {/* Ligne du haut : Drapeau (et hamburger en mobile) */}
          <div className="flex items-center gap-4">
            {/* Bouton du drapeau */}
            <button
              onClick={toggleLangMenu}
              className="
                relative 
                flex items-center 
                px-2 py-2
                rounded
                bg-white/10 hover:bg-white/20 
                transition-colors
                focus:outline-none
              "
            >
              <Image
                src={getCurrentFlag()}
                alt="Drapeau langue active"
                width={24}
                height={24}
                className="rounded"
              />
            </button>

            {/* Bouton Hamburger (visible seulement en mobile) */}
            <div className="xl:hidden z-50">
              <button
                onClick={toggleMenu}
                className="relative w-8 h-6 flex flex-col justify-center items-center focus:outline-none group"
                aria-label={
                  menuOpen ? t("header.closeMenu") : t("header.openMenu")
                }
              >
                <span
                  className={`absolute block w-full h-[3px] bg-white rounded-full transform transition-all duration-300 ease-in-out group-active:scale-90 ${
                    menuOpen
                      ? "rotate-45 opacity-100"
                      : "rotate-0 translate-y-[-8px] opacity-100"
                  }`}
                />
                <span
                  className={`absolute block w-full h-[3px] bg-white rounded-full transition-all duration-300 ease-in-out group-active:scale-90 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute block w-full h-[3px] bg-white rounded-full transform transition-all duration-300 ease-in-out group-active:scale-90 ${
                    menuOpen
                      ? "-rotate-45 opacity-100"
                      : "rotate-0 translate-y-[8px] opacity-100"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* NAV DESKTOP (cachée en mobile) : en ligne */}
          <nav className="hidden xl:flex xl:gap-14 text-xl font-jakarta">
            <button
              onClick={() => handleNavClick("seo")}
              className={styles.navLink}
            >
              {t("header.seo")}
            </button>
            <button
              onClick={() => handleNavClick("developer")}
              className={styles.navLink}
            >
              {t("header.developer")}
            </button>
            <button
              onClick={() => handleNavClick("designer")}
              className={styles.navLink}
            >
              {t("header.designer")}
            </button>
            <button
              onClick={() => handleNavClick("services")}
              className={styles.navLink}
            >
              {t("header.services")}
            </button>
            <button
              onClick={() => handleNavClick("projects")}
              className={styles.navLink}
            >
              {t("header.projects")}
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className={styles.navLink}
            >
              {t("header.contact")}
            </button>
          </nav>
        </div>
      </header>

      {/* MENU MOBILE (plein écran) */}
      <div
        className={`
          xl:hidden fixed top-0 left-0 w-full h-screen bg-black/90 z-40
          transition-transform duration-500 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          <button
            onClick={() => handleNavClick("seo")}
            className="text-white text-2xl transform transition-transform duration-300 active:scale-95"
          >
            {t("header.seo")}
          </button>
          <button
            onClick={() => handleNavClick("developer")}
            className="text-white text-2xl transform transition-transform duration-300 active:scale-95"
          >
            {t("header.developer")}
          </button>
          <button
            onClick={() => handleNavClick("designer")}
            className="text-white text-2xl transform transition-transform duration-300 active:scale-95"
          >
            {t("header.designer")}
          </button>
          <button
            onClick={() => handleNavClick("services")}
            className="text-white text-2xl transform transition-transform duration-300 active:scale-95"
          >
            {t("header.services")}
          </button>
          <button
            onClick={() => handleNavClick("projects")}
            className="text-white text-2xl transform transition-transform duration-300 active:scale-95"
          >
            {t("header.projects")}
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className="text-white text-2xl transform transition-transform duration-300 active:scale-95"
          >
            {t("header.contact")}
          </button>
        </nav>
      </div>

      {/* OVERLAY & PETIT MENU DE LANGUES */}
      {langMenuOpen && (
        <div
          className="
            fixed inset-0 z-50
            flex justify-end items-start
            pt-14 pr-12   
            bg-black/40
            backdrop-blur-sm
          "
          onClick={() => setLangMenuOpen(false)}
        >
          <div
            className="
              bg-gray-900/90 
              text-white
              rounded
              p-3
              flex flex-col gap-2
              backdrop-blur-sm
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="flex items-center gap-2 hover:bg-[#8b5cf630] px-2 py-1 rounded text-sm"
              onClick={() => changeLanguage("fr")}
            >
              <Image
                src="/image/icons/frenchFlag.svg"
                alt="FR"
                width={20}
                height={20}
                className="rounded"
              />
              FR
            </button>
            <button
              className="flex items-center gap-2 hover:bg-[#8b5cf630] px-2 py-1 rounded text-sm"
              onClick={() => changeLanguage("es")}
            >
              <Image
                src="/image/icons/spanishFlag.svg"
                alt="ES"
                width={20}
                height={20}
                className="rounded"
              />
              ES
            </button>
            <button
              className="flex items-center gap-2 hover:bg-[#8b5cf630] px-2 py-1 rounded text-sm"
              onClick={() => changeLanguage("en")}
            >
              <Image
                src="/image/icons/englishFlag.svg"
                alt="EN"
                width={20}
                height={20}
                className="rounded"
              />
              EN
            </button>
          </div>
        </div>
      )}

      {/* HEADER STICKY (SCROLL) – apparition/disparition simple */}
      {showSticky && (
        <Navbar
          logoHeaderTop="/image/icons/logo2.svg"
          logoHeaderScroll="/image/icons/logo2.svg"
          links={links}
          navbarTheme="dark"
          headerVariant="glass-sticky"
        >
          <div onClick={handleContactClick} className="cursor-pointer">
            <ButtonNeuromorphic text="Ma démo gratuite" size="sm" />
          </div>
        </Navbar>
      )}
    </>
  );
};

export default Header;
