"use client";
import SplitScreen from "./SplitScreen";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "../Header/Header";
import { CircleListItem } from "../Card/ServiceCard/CircleListItem";
import BgGradient from "./BgGradient";
import ButtonNeuromorphic from "../Header/ButtonNeuromorphic";

export const Hero: React.FC = () => {
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

  return (
    <div className="min-h-[700px] lg:h-[84vh] flex flex-col">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Header />
      </motion.div>

      <div className="relative flex-1 flex flex-col lg:flex-row">
        {/* BgGradient responsive avec props */}
        <div className="hidden lg:block">
  <BgGradient 
    className="absolute bottom-20 left-0 w-1/3 h-1/3"
    color="purple"
    blur="blur-[250px]"
  />
</div>

        {/* Contenu texte centré et responsive */}
        <motion.div
          className="w-full lg:w-1/3 flex flex-col justify-start lg:justify-center items-center lg:items-start text-center lg:text-left gap-2 sm:gap-4 lg:gap-8  lg:p-0 lg:pb-16 order-2 lg:order-1  mb-20 lg:mb-0 lg:mt-0"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-[22px] sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
            {t("hero.title")}
          </h1>

          <section className="flex flex-row items-start lg:flex-col gap-2 text-xs sm:text-xl">
            <CircleListItem
              className="min-w-6 h-6 sm:min-w-8 sm:h-8"
              text={t("hero.services.developer")}
              textClassName="text-xs sm:text-lg font-medium"
              spacing="mr-1 sm:mr-3"
            />
            <CircleListItem
              className="min-w-6 h-6 sm:min-w-8 sm:h-8"
              text={t("hero.services.positionnement")}
              textClassName="text-xs sm:text-lg font-medium"
              spacing="mr-1 sm:mr-3"
            />
            <CircleListItem
              className="min-w-6 h-6 sm:min-w-8 sm:h-8"
              text={t("hero.services.seo")}
              textClassName="text-xs sm:text-lg font-medium"
              spacing="mr-1 sm:mr-3"
            />
          </section>

          <p className="text-base sm:text-xl text-gray-300">
            {t("hero.description")}
          </p>

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
        </motion.div>

        {/* SplitScreen */}
        <div className="w-full lg:w-2/3 flex-1 order-1 lg:order-2">
          <SplitScreen />
        </div>
      </div>
    </div>
  );
};