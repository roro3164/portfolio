import { ServiceCard } from "./ServiceCard";
import { ServicePack } from "./ServicePack";
import "../../../../../i18n";
import { useTranslation } from "react-i18next"; 
import ContactButton from "../../Main/ContactButton";
import { motion } from "framer-motion";

export const ServicesSection = () => {
  const { t } = useTranslation("page");
  
  // Fonction de scroll (même que Header et Hero)
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleContactClick = () => {
    setTimeout(() => {
      scrollToSection('contact');
    }, 100);
  };
  
  // Récupérer les tableaux explicitement et s'assurer qu'ils sont bien typés
  const businessItems = t("services.business.items", { returnObjects: true }) as string[];
  const proItems = t("services.pro.items", { returnObjects: true }) as string[];
  const strategieItems = t("services.stratégie.items", { returnObjects: true }) as string[];
  
  return (
    <section id="services" className="text-white">
    
      <div className="mx-auto flex flex-col gap-y-16"> 
      <motion.div  
      initial={{ x: 30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
        <div className="text-center flex flex-col gap-y-6">
          <h3 className="transition-heading text-3xl font-bold ">{t("services.intro")}</h3>
          <p className="text-xl lg:text-2xl font-bold">{t("services.subtitle")}</p>
          <p className=" italic text-xl lg:text-3xl font-bold ">{t("services.promo")}</p>
        </div>
        </motion.div>
        
        <div className="flex justify-around items-center flex-col gap-10 xl:flex-row">
        <ServiceCard
            title={t("services.stratégie.title")}
            description={t("services.stratégie.description")}
            listItems={strategieItems}
            color="green"
          />
          
          <ServiceCard
            title={t("services.pro.title")}
            description={t("services.pro.description")}
            listItems={proItems}
            color="blue"
          />
          
         
          
           <ServiceCard
            title={t("services.business.title")}
            description={t("services.business.description")}
            listItems={businessItems}
            color=""
          />
        </div>

        <ServicePack
          title={t("services.pack.title")}
          description={t("services.pack.description")}
          proCard={{
            title: t("services.pro.title"),
            description: t("services.pro.description"),
            prefix: t("services.pro.prefix"),
            listItems: proItems
          }}
          strategieCard={{
            title: t("services.stratégie.title"),
            description: t("services.stratégie.description"),
            prefix: t("services.stratégie.prefix"),
            listItems: strategieItems
          }}
          businessCard={{
            title: t("services.business.title"),
            description: t("services.business.description"),
            prefix: t("services.business.prefix"),
            listItems: businessItems
          }}
        />
        
        <div className="">
          <h3 className="text-center text-2xl font-bold mb-6">{t("services.cta.title")}</h3>
          <div onClick={handleContactClick} className="w-full flex justify-center">
            <ContactButton 
               title="hero.cta.button"
               icon = "/image/icons/gift.svg"
               iconWidth={28}
               className="mx-auto :w-auto min-w-[280px] px-6 text-xl lg:text-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};