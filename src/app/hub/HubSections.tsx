"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mail, TrendingUp, ClipboardList, PlayCircle } from "lucide-react";
import { HUB_CONTACT, whatsappNumber } from "./hubConfig";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className={className} fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const SECTIONS: { title: string; message: string; icon: React.ElementType }[] = [
  { title: "J'ai mon test, je veux améliorer ma visibilité Google", message: "Bonjour Romain, j'ai fait le test. On peut analyser mes résultats ?", icon: TrendingUp },
  { title: "Je veux mon test visibilité gratuit", message: "Bonjour, je voudrais mon audit de visibilité gratuit pour mon commerce.", icon: ClipboardList },
  { title: "Je veux ma démo de site gratuite", message: "Bonjour Romain, je veux voir la démo de site gratuite de mon futur site.", icon: PlayCircle },
];

const whatsAppUrl = (message?: string) => {
  const base = `https://wa.me/${whatsappNumber}`;
  if (message) return `${base}?text=${encodeURIComponent(message)}`;
  return base;
};

// Couleurs fixes par type de contact : verre (vitré) un peu moins transparent
const BUTTON_COLORS = {
  sms: { bg: "linear-gradient(135deg, #3b82f688 0%, #3b82f666 100%)", border: "#3b82f680" },
  whatsapp: { bg: "linear-gradient(135deg, #25D36688 0%, #25D36666 100%)", border: "#25D36680" },
  email: { bg: "linear-gradient(135deg, #dc262688 0%, #dc262666 100%)", border: "#dc262680" },
};

function ContactOption({
  href,
  label,
  icon: Icon,
  styleGlass,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  styleGlass: { bg: string; border: string };
}) {
  const content = (
    <>
      <Icon className="w-5 h-5 shrink-0 text-white" strokeWidth={2} aria-hidden />
      <span className="font-semibold font-jakarta text-white text-sm sm:text-base whitespace-nowrap">{label}</span>
    </>
  );
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-center justify-center gap-2 sm:gap-3 rounded-xl px-3 py-3 sm:px-4 sm:py-4 w-full max-w-xs mx-auto cursor-pointer select-none transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] border-2 border-white"
      style={{
        background: styleGlass.bg,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
      }}
    >
      {content}
    </a>
  );
}

function HubSectionBlock({ title, message, icon: Icon }: { title: string; message: string; icon: React.ElementType }) {
  const smsHref = `sms:${HUB_CONTACT.phoneRaw}?body=${encodeURIComponent(message)}`;
  const mailtoHref = `mailto:${HUB_CONTACT.email}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message)}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center justify-center p-4 min-w-0"
    >
      <div className="flex items-center justify-center gap-2 mb-6">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 shrink-0 text-white" strokeWidth={2} aria-hidden />
        <h3 className="text-center text-white font-jakarta font-bold text-lg sm:text-xl lg:text-2xl leading-snug">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full max-w-sm lg:max-w-5xl mx-auto">
        <ContactOption
          href={smsHref}
          label="SMS"
          icon={MessageSquare}
          styleGlass={BUTTON_COLORS.sms}
        />
        <ContactOption
          href={whatsAppUrl(message)}
          label="WhatsApp"
          icon={WhatsAppIcon}
          styleGlass={BUTTON_COLORS.whatsapp}
        />
        <ContactOption
          href={mailtoHref}
          label="Email"
          icon={Mail}
          styleGlass={BUTTON_COLORS.email}
        />
      </div>
    </motion.div>
  );
}

export function HubSections() {
  return (
    <section className="text-white min-w-0 overflow-x-hidden pt-14 lg:pt-20 pb-6 lg:pb-8">
      <div className="mx-auto flex flex-col gap-y-4 lg:gap-y-6 min-w-0 w-full p-4">
        {SECTIONS.map(({ title, message, icon }) => (
          <HubSectionBlock key={title} title={title} message={message} icon={icon} />
        ))}
      </div>
    </section>
  );
}
