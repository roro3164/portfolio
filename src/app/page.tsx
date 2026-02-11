"use client";

import { motion } from "framer-motion";
import { FormCard } from "./components/Card/Form/FormContact";
import { Footer } from "./components/Footer/Footer";
import IntenseCursorLight from "./components/IntenseCursorLight";
import CarouselCard from "./components/Card/Carousel/CarouselCard";
import NormalCard from "./components/Card/NormalCard/NormalCard";
import "../../i18n";
import { useTranslation } from "react-i18next";
import { Project } from "./components/Card/Carousel/types";
import { OffreTestSection } from "./components/Card/OffreTest/OffreTestSection";
import { Hero } from "./components/Main/Hero";


export default function Page() {
  const { t } = useTranslation(["page", "dataProjects"]);

  const projects = t("projects", {
    ns: "dataProjects",
    returnObjects: true,
  }) as Project[];

  return (
    <div>
      <div className="home">
        <Hero />

        <section className="sectionCard flex flex-col gap-y-10 lg:gap-y-20">
          <IntenseCursorLight />
          <section className="skillCards flex flex-col gap-y-10 lg:gap-y-44">
            <section id="seo" className="z-10 scroll-mt-4">
              <NormalCard
                title={t("seo.title")}
                internContent={t("seo.content")
                  .split("\n\n")
                  .map((p: string, i: number) => (
                    <div key={i} className="mb-4">
                      {p}
                    </div>
                  ))}
                imageSrc="/image/pictures/expert.png"
                imagePositionMobile={{ top: "7%", left: "50%" }}
                imageSizeDesktop={{ width: "520px", height: "1000px" }}
                imageSizeMobile={{ width: "260px", height: "260px" }}
                imagePositionDesktop={{ top: "40%", left: "8%" }}
                boxPaddings={{
                  mobile: { top: "360px" },
                  tablet: { top: "400px" },
                  desktop: { content: "720px" },
                }}
              />
            </section>

            {/* Section DEVELOPER */}
            <section id="developer" className="z-10 scroll-mt-4">
              <NormalCard
                isLaptop={true}
                title={t("developer.title")}
                internContent={t("developer.content")
                  .split("\n\n")
                  .map((p: string, i: number) => (
                    <div key={i} className="mb-4">
                      {p}
                    </div>
                  ))}
                imageSrc="/image/pictures/laptop.png"
                imageAlign="right"
                imagePositionMobile={{ top: "0%", left: "50%" }}
                imageSizeDesktop={{ width: "1000px", height: "1000px" }}
                imagePositionDesktop={{ top: "100%", right: "-10%" }}
                boxPaddings={{
                  mobile: { top: "160px" },
                  tablet: { top: "410px" },
                  desktop: { content: "720px" },
                }}
              />
            </section>

            {/* Section DESIGNER */}
            <section id="designer" className="lg:mb-32 scroll-mt-4">
              <NormalCard
                title={t("designer.title")}
                imageAlign="left"
                internContent={t("designer.content")
                  .split("\n\n")
                  .map((p: string, i: number) => (
                    <div key={i} className="mb-4">
                      {p}
                    </div>
                  ))}
                imageSrc="/image/pictures/chevalet.webp"
                hasEaselAnimation={true}
                imageSizeMobile={{ width: "480px", height: "480px" }}
                imageSizeDesktop={{ width: "720px", height: "720px" }}
                imagePositionDesktop={{ top: "40%", right: "" }}
                boxPaddings={{
                  mobile: { top: "500px" },
                  tablet: { top: "500px" },
                  desktop: { content: "450px" },
                }}
              />
            </section>
          </section>

          {/* Section OFFRE */}
          <section id="services" className="scroll-mt-4">
            <OffreTestSection />
          </section>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="transition-heading italic">
              {t("transition.projects")}
            </h4>
          </motion.div>
          
          {/* Section PROJECTS */}
          <section id="projects" className="scroll-mt-4">
            <CarouselCard projects={projects} />
          </section>

          {/* Section CONTACT */}
          <section id="contact" className="scroll-mt-4">
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="transition-heading italic text-center mb-8">
                {t("transition.contact")}
              </h4>
            </motion.div>

            <FormCard />
          </section>
        </section>

        <Footer />
      </div>
    </div>
  );
}