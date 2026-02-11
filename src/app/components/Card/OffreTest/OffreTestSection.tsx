"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Calendar, MapPin, Globe, FileText, Check } from "lucide-react";
import styles from "../ServiceCard/ServiceCard.module.scss";
import { CircleListItem } from "../ServiceCard/CircleListItem";
import VioletHover from "../hover/VioletHover";
import ButtonNeuromorphic from "../../Header/ButtonNeuromorphic";

const accentColors: Record<"green" | "blue" | "violet" | "gold", string> = {
  green: "#22c55e",
  blue: "#3b82f6",
  violet: "#8b5cf6",
  gold: "#d4af37",
};

function PackCard({
  color,
  title,
  badge,
  intro,
  children,
  frameBlack = false,
}: {
  color: "green" | "blue" | "violet" | "gold";
  title: string;
  badge?: string;
  intro: string;
  children: React.ReactNode;
  frameBlack?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45 }}
      className="w-full sm:max-w-xl xl:max-w-none xl:w-1/3 flex flex-col h-auto xl:h-[660px] transition-transform duration-300 hover:scale-[1.01]"
    >
      <VioletHover color={color} className="h-full flex flex-col min-h-0">
        <div className={`bg-[#100E12] rounded-2xl h-full min-h-0 flex flex-col relative overflow-hidden flex-1 ${frameBlack ? "border-2 border-black" : ""}`}>
          {/* Glow dans le coin */}
          <div
            className="absolute top-0 left-0 w-32 h-32 pointer-events-none opacity-80"
            style={{
              background: `radial-gradient(circle at 0 0, ${accentColors[color]}50 0%, ${accentColors[color]}20 40%, transparent 70%)`,
              filter: "blur(24px)",
            }}
          />
          {/* Titre + contenu : un seul bloc avec le même fond (glassCard) */}
          <div className={`relative rounded-2xl flex-1 flex flex-col min-h-0 p-4 pt-4 ${styles.glassCard}`}>
            {badge && (
              <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/15 text-white backdrop-blur-sm border border-white/20">
                {badge}
              </span>
            )}
            <div className="flex-1 min-h-0 mt-2 px-4 pb-4 pt-2 rounded-b-2xl text-white flex flex-col">
              <div
                className="mx-auto text-center text-white text-base sm:text-lg font-jakarta font-semibold py-1.5 px-6 w-full rounded-xl mb-2"
                style={{
                  background: `linear-gradient(135deg, ${accentColors[color]}99 0%, ${accentColors[color]}55 100%)`,
                  border: `1px solid ${accentColors[color]}80`,
                }}
              >
                <h3>{title}</h3>
              </div>
              <p className="text-center text-white/95 italic text-xs sm:text-sm leading-snug mb-2">
                {intro}
              </p>
              <div className="flex flex-col gap-1 text-sm leading-snug">{children}</div>
            </div>
          </div>
        </div>
      </VioletHover>
    </motion.div>
  );
}

function PricePill({
  price,
  suffix,
}: {
  price: string;
  suffix: string;
}) {
  return (
    <span className="inline-flex items-baseline font-sans">
      <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
        {price}
      </span>
      {suffix ? (
        <span className="ml-0.5 text-sm font-normal text-white/45 align-baseline">
          {suffix}
        </span>
      ) : null}
    </span>
  );
}

function TarifsCard({
  color: _color,
  offreDuMoment,
  children,
}: {
  color: "green" | "blue" | "violet" | "gold";
  offreDuMoment: string;
  ou?: string;
  children: React.ReactNode;
}) {
  const arr = React.Children.toArray(children);
  return (
    <div
      className={`rounded-xl px-2 sm:px-4 py-3 flex flex-col gap-3 ${styles.internBox}`}
    >
      <div className="flex items-center justify-center gap-1 sm:gap-2">
        <span className="text-base sm:text-xl" aria-hidden>🔥</span>
        <span className="text-sm sm:text-lg font-bold text-white tracking-wide font-jakarta">{offreDuMoment}</span>
        <span className="text-base sm:text-xl" aria-hidden>🔥</span>
      </div>
      <div className="flex flex-row flex-nowrap gap-2 sm:gap-6 items-stretch justify-center min-w-0 overflow-x-auto">
        <div className="flex-1 min-w-0 flex-shrink flex justify-center">{arr[0]}</div>
      </div>
    </div>
  );
}

function PrestationsCard({
  title,
  subtitle,
  children,
  boxed = false,
  color,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  boxed?: boolean;
  color: "green" | "blue" | "violet" | "gold";
}) {
  return (
    <div
      className={`rounded-xl px-3 py-2 flex flex-col gap-1.5 ${boxed ? styles.internBox : ""}`}
    >
      <div className="flex flex-wrap items-center gap-2 mb-0.5">
        <div
          className="rounded-full inline-flex w-fit px-3 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          style={{
            background: `linear-gradient(135deg, ${accentColors[color]}99 0%, ${accentColors[color]}55 100%)`,
            border: `1px solid ${accentColors[color]}80`,
          }}
        >
          <p className="text-white font-jakarta font-semibold text-[10px] sm:text-xs uppercase tracking-wider">
            {title}
          </p>
        </div>
        {subtitle && (
          <p className="text-white/80 font-jakarta text-[10px] sm:text-xs italic">
            {subtitle}
          </p>
        )}
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

export function OffreTestSection() {
  const { t } = useTranslation("page");
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="offre-test" className="scroll-mt-4 text-white min-w-0 overflow-x-hidden">
      <div className="mx-auto flex flex-col gap-y-12 lg:gap-y-16 min-w-0 w-full">
        <motion.div
          initial={{ x: 24, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center flex flex-col gap-y-3"
        >
          <h2 className="transition-heading text-3xl font-bold font-jakarta">
            {t("offers.title")}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 font-semibold max-w-2xl mx-auto">
            {t("offers.subtitle")}
          </p>
          <p className="text-lg sm:text-xl text-white font-bold max-w-2xl mx-auto">
            {t("offers.promo")}
          </p>
        </motion.div>

        <div className="flex flex-col xl:flex-row items-center xl:items-stretch justify-center gap-8 xl:gap-6">
          <PackCard
            color="green"
            title={t("offers.packStarter.title")}
            intro={t("offers.packStarter.intro")}
          >
            <TarifsCard color="green" offreDuMoment={t("offers.offreDuMoment")}>
              <div className="flex flex-col items-center text-center">
                <p className="text-[11px] font-semibold text-white/60 uppercase tracking-widest font-jakarta mb-1">
                  {t("offers.tarifs.paiementUnique")}
                </p>
                <PricePill price="599€" suffix="" />
                <p className="text-xs text-white/70 font-jakarta mt-1">
                  {t("offers.tarifs.proprieteImmediate")}
                </p>
              </div>
            </TarifsCard>
            <PrestationsCard title={t("offers.packStarter.sitePro.title")} subtitle={t("offers.packStarter.sitePro.subtitle")} color="green">
              {(t("offers.packStarter.sitePro.items", { returnObjects: true }) as string[]).map((text, i) => (
                <CircleListItem key={i} color="green" text={text} dotOnly className="min-w-2 h-2" spacing="mr-2" textClassName="text-xs sm:text-sm" />
              ))}
            </PrestationsCard>
            <PrestationsCard title={t("offers.packStarter.visibiliteGoogle.title")} color="green">
              {(t("offers.packStarter.visibiliteGoogle.items", { returnObjects: true }) as string[]).map((text, i) => (
                <CircleListItem key={i} color="green" text={text} dotOnly className="min-w-2 h-2" spacing="mr-2" textClassName="text-xs sm:text-sm" />
              ))}
            </PrestationsCard>
          </PackCard>

          <PackCard
            color="blue"
            title={t("offers.packVisibilite.title")}
            intro={t("offers.packVisibilite.intro")}
          >
            <TarifsCard color="blue" offreDuMoment={t("offers.offreDuMoment")}>
              <div className="flex flex-col items-center text-center">
                <p className="text-[11px] font-semibold text-white/60 uppercase tracking-widest font-jakarta mb-1">
                  {t("offers.tarifs.paiementUnique")}
                </p>
                <PricePill price="999€" suffix="" />
                <p className="text-xs text-white/70 font-jakarta mt-1">
                  {t("offers.tarifs.proprieteImmediate")}
                </p>
              </div>
            </TarifsCard>
            <PrestationsCard title={t("offers.packVisibilite.sitePro.title")} subtitle={t("offers.packVisibilite.sitePro.subtitle")} color="blue">
              {(t("offers.packVisibilite.sitePro.items", { returnObjects: true }) as string[]).map((text, i) => (
                <CircleListItem key={i} color="blue" text={text} dotOnly className="min-w-2 h-2" spacing="mr-2" textClassName="text-xs sm:text-sm" />
              ))}
            </PrestationsCard>
            <PrestationsCard title={t("offers.packVisibilite.visibiliteGoogle.title")} color="blue">
              {(t("offers.packVisibilite.visibiliteGoogle.items", { returnObjects: true }) as string[]).map((text, i) => (
                <CircleListItem key={i} color="blue" text={text} dotOnly className="min-w-2 h-2" spacing="mr-2" textClassName="text-xs sm:text-sm" />
              ))}
            </PrestationsCard>
          </PackCard>

          <PackCard
            color="gold"
            title={t("offers.packEcommerce.title")}
            intro={t("offers.packEcommerce.intro")}
            frameBlack
          >
            <div className={`rounded-xl px-2 sm:px-4 py-3 flex flex-col justify-center items-center min-h-[140px] ${styles.internBox}`}>
              <p className="text-center text-white font-jakarta font-semibold text-base sm:text-lg">
                {t("offers.packEcommerce.uniquementDevis")}
              </p>
            </div>
            <PrestationsCard title={t("offers.packEcommerce.boutique.title")} color="gold">
              {(t("offers.packEcommerce.boutique.items", { returnObjects: true }) as string[]).map((text, i) => (
                <CircleListItem key={i} color="gold" text={text} dotOnly className="min-w-2 h-2" spacing="mr-2" textClassName="text-xs sm:text-sm" />
              ))}
            </PrestationsCard>
            <PrestationsCard title={t("offers.packEcommerce.optionsMetier.title")} color="gold">
              {(t("offers.packEcommerce.optionsMetier.items", { returnObjects: true }) as string[]).map((text, i) => (
                <CircleListItem key={i} color="gold" text={text} dotOnly className="min-w-2 h-2" spacing="mr-2" textClassName="text-xs sm:text-sm" />
              ))}
            </PrestationsCard>
          </PackCard>
        </div>

        <p className="text-xl sm:text-2xl text-white/95 font-normal italic text-center">
          {t("offers.description")}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="w-full self-start"
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: accentColors.violet }}
              aria-hidden
            />
            <h3 className="text-white font-jakarta font-bold text-sm sm:text-base uppercase tracking-wider text-white/90">
              {t("offers.options.title")}
            </h3>
          </div>
          <p className="text-white/70 font-jakarta text-xs sm:text-sm leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: t("offers.options.description", { interpolation: { escapeValue: false } }) }} />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: Calendar, labelKey: 0 },
              { icon: MapPin, labelKey: 1 },
              { icon: Globe, labelKey: 2 },
              { icon: FileText, labelKey: 3 },
              { icon: MapPin, labelKey: 4 },
              { icon: FileText, labelKey: 5 },
            ].map(({ icon: Icon, labelKey }, i) => {
              const optionsItems = t("offers.options.items", { returnObjects: true }) as string[];
              const label = optionsItems[labelKey];
              return (
                <div
                  key={i}
                  className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                  style={{
                    background: `linear-gradient(135deg, ${accentColors.violet}99 0%, ${accentColors.violet}55 100%)`,
                    border: `1px solid ${accentColors.violet}80`,
                  }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0 text-white" strokeWidth={2} />
                  <span className="font-jakarta text-xs sm:text-sm font-medium text-white">{label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full self-start"
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: accentColors.violet }}
              aria-hidden
            />
            <h3 className="text-white font-jakarta font-bold text-sm sm:text-base uppercase tracking-wider text-white/90">
              {t("offers.gestionMensuelle.title")}{" "}
              <span className="normal-case italic font-normal text-white/80">{t("offers.gestionMensuelle.optionPrice")}</span>
            </h3>
          </div>
          <p className="text-white/70 font-jakarta text-xs sm:text-sm leading-relaxed mb-4">
            {t("offers.gestionMensuelle.description")}
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-y-1.5 sm:gap-x-6">
            {(t("offers.gestionMensuelle.items", { returnObjects: true }) as string[]).map((label, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 flex-shrink-0" style={{ color: accentColors.violet }} strokeWidth={2.5} />
                <span className="font-jakarta text-xs sm:text-sm text-white">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bloc abonnement flexible — largeur contrainte pour que le texte s’habille sur mobile */}
        <div
          className="box-border py-6 sm:py-8"
          style={{ width: "100%", maxWidth: "100%", paddingLeft: "1rem", paddingRight: "1rem" }}
        >
          <div className="mx-auto" style={{ maxWidth: "min(1000px, 100%)" }}>
            <h3
              className="text-center text-white font-jakarta font-bold text-lg sm:text-2xl lg:text-3xl leading-snug mb-6"
              style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
            >
              {t("offers.gestionMensuelle.flexibleIntro")}
            </h3>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <p
                className="text-center text-white font-jakarta text-lg sm:text-xl font-semibold"
                style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
              >
                {t("offers.gestionMensuelle.flexibleCta")}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full">
                <div
                  className="flex flex-col items-center justify-center rounded-xl px-4 py-4 flex-1 min-w-0"
                  style={{
                    background: `linear-gradient(135deg, ${accentColors.green}55 0%, ${accentColors.green}35 100%)`,
                    border: `1px solid ${accentColors.green}80`,
                  }}
                >
                  <p className="text-white font-jakarta font-semibold text-sm sm:text-base mb-2">
                    {t("offers.gestionMensuelle.aboStarter")}
                  </p>
                  <PricePill price="149€" suffix="/mois" />
                  <p className="text-xs text-white/70 font-jakarta mt-1">{t("offers.tarifs.sansEngagement")}</p>
                </div>
                <div
                  className="flex flex-col items-center justify-center rounded-xl px-4 py-4 flex-1 min-w-0"
                  style={{
                    background: `linear-gradient(135deg, ${accentColors.blue}55 0%, ${accentColors.blue}35 100%)`,
                    border: `1px solid ${accentColors.blue}80`,
                  }}
                >
                  <p className="text-white font-jakarta font-semibold text-sm sm:text-base mb-2">
                    {t("offers.gestionMensuelle.aboVisibilite")}
                  </p>
                  <PricePill price="199€" suffix="/mois" />
                  <p className="text-xs text-white/70 font-jakarta mt-1">{t("offers.tarifs.sansEngagement")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center pt-1"
        >
          <p className="text-lg sm:text-2xl lg:text-3xl font-bold leading-snug mb-8 font-jakarta">
            {t("offers.cta.title")}
          </p>
          <div onClick={() => scrollToSection("contact")} className="flex justify-center cursor-pointer">
            <ButtonNeuromorphic
              text={t("offers.cta.button")}
              size="md"
              fontSize={22}
              borderRadius={12}
              className="min-w-[280px] justify-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
