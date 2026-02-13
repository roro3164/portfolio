"use client";
import Image from "next/image";
import Link from "next/link";
import SplitScreen from "./SplitScreen";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "../Header/Header";
import { CircleListItem } from "../Card/ServiceCard/CircleListItem";
import BgGradient from "./BgGradient";
import ButtonNeuromorphic from "../Header/ButtonNeuromorphic";

interface HeroProps {
  showHeader?: boolean;
  showButtons?: boolean;
  /** Header réduit au logo seul (ex. page contact) */
  headerMinimal?: boolean;
  /** Afficher la pastille offre dans le SplitScreen (false sur page contact) */
  showSticker?: boolean;
  /** Réduit la hauteur du hero (ex. page contact) */
  compact?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  showHeader = true,
  showButtons = true,
  headerMinimal = false,
  showSticker,
  compact = false,
}) => {
  const { t } = useTranslation();

  // Fonction de scroll (contact centré)
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (sectionId === "contact") {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        const headerHeight = 120;
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: elementPosition, behavior: "smooth" });
      }
    }
  };

  const handleContactClick = () => {
    setTimeout(() => {
      scrollToSection("contact");
    }, 100);
  };

  // Page contact : logo en haut à gauche (order fixe). Page accueil : order responsive (image puis texte en mobile).
  const textColumnOrder = showHeader ? "order-2 lg:order-1" : "order-1";
  const splitScreenOrder = showHeader ? "order-1 lg:order-2" : "order-2";
  const textColumnAlign = showHeader ? "justify-start lg:justify-center" : "pt-0 justify-start";

  return (
    <div className={`flex flex-col ${compact ? "min-h-[420px] lg:h-[55vh]" : "min-h-[700px] lg:h-[84vh]"}`}>
      {showHeader && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Header minimal={headerMinimal} />
        </motion.div>
      )}

      <div className="relative flex-1 flex flex-col lg:flex-row">
        {/* BgGradient responsive avec props */}
        <div className="hidden lg:block">
          <BgGradient
            className="absolute bottom-20 left-0 w-1/3 h-1/3"
            color="purple"
            blur="blur-[250px]"
          />
        </div>

        {/* Colonne texte : logo (si pas de header) + titre + liste + description + boutons (si page accueil) */}
        <motion.div
          className={`w-full lg:w-1/3 flex flex-col gap-2 sm:gap-4 lg:gap-8 lg:p-0 lg:pb-16 lg:mt-0 ${compact ? "items-start text-left mb-0" : "items-center lg:items-start text-center lg:text-left mb-20 lg:mb-0"} ${textColumnOrder} ${textColumnAlign}`}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {!showHeader && (
            <Link href="/" className="mb-12 lg:mb-20 w-full flex justify-center lg:justify-start">
              <div className="relative h-6 lg:h-8">
                <div className="absolute inset-0 filter blur-[6px] opacity-50">
                  <Image
                    src="/image/icons/logo.svg"
                    alt=""
                    width={150}
                    height={40}
                    className="w-auto h-full"
                  />
                </div>
                <Image
                  src="/image/icons/logo2.svg"
                  alt="Romain DesignCode – Accueil"
                  width={140}
                  height={36}
                  className="w-auto h-12 lg:h-16 relative"
                />
              </div>
            </Link>
          )}
          <h1 className="text-[22px] sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
            {t("hero.title")}
          </h1>

          <section className="flex flex-row flex-wrap items-start lg:flex-col gap-2 text-xs sm:text-xl">
            <CircleListItem
              className="min-w-4 h-4 sm:min-w-5 sm:h-5"
              text={t("hero.services.developer")}
              textClassName="text-xs sm:text-base font-medium"
              spacing="mr-1 sm:mr-3"
              useLucideCheck
            />
            <CircleListItem
              className="min-w-4 h-4 sm:min-w-5 sm:h-5"
              text={t("hero.services.positionnement")}
              textClassName="text-xs sm:text-base font-medium"
              spacing="mr-1 sm:mr-3"
              useLucideCheck
            />
            <CircleListItem
              className="min-w-4 h-4 sm:min-w-5 sm:h-5"
              text={t("hero.services.seo")}
              textClassName="text-xs sm:text-base font-medium"
              spacing="mr-1 sm:mr-3"
              useLucideCheck
            />
            <CircleListItem
              className="min-w-4 h-4 sm:min-w-5 sm:h-5"
              text={t("hero.services.sansEngagement")}
              textClassName="text-xs sm:text-base font-medium"
              spacing="mr-1 sm:mr-3"
              useLucideCheck
            />
          </section>

          <p className="text-base sm:text-xl text-gray-300">
            {t("hero.description")}
          </p>

          {showButtons && (
            <div className="flex flex-col gap-2 sm:gap-4 lg:gap-6 w-full items-center lg:items-start">
              <div className="text-[#9788fb] font-bold tracking-wide text-base sm:text-xl">
                Demander sa démo gratuite
              </div>

              <div className="w-full max-w-[400px] lg:max-w-[500px] relative z-30 flex flex-col sm:flex-row gap-3">
                <div
                  onClick={handleContactClick}
                  className="flex-1 cursor-pointer"
                >
                  <ButtonNeuromorphic
                    text="Ma démo gratuite"
                    size="md"
                    fontSize={22}
                    borderRadius={12}
                    className="w-full justify-center"
                  />
                </div>

              </div>
            </div>
          )}
        </motion.div>

        {/* SplitScreen : sticker offre uniquement sur la page accueil */}
        <div className={`w-full lg:w-2/3 flex-1 ${splitScreenOrder}`}>
          <SplitScreen showSticker={showSticker ?? showHeader} />
        </div>
      </div>
    </div>
  );
};