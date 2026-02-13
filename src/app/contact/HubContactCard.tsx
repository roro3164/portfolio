"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, Globe, Instagram } from "lucide-react";
import { HUB_CONTACT, HUB_SOCIAL } from "./hubConfig";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" width={20} height={20}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const violetGlassStyle = {
  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.35) 0%, rgba(139, 92, 246, 0.2) 100%)",
  border: "1px solid rgba(255, 255, 255, 0.6)",
};

export function HubContactCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl mx-auto rounded-2xl p-6 text-white"
      style={{
        background: "linear-gradient(#fff3, transparent)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 25px 25px rgba(0, 0, 0, 0.25)",
      }}
    >
      <h3 className="text-center font-jakarta font-bold text-lg sm:text-xl mb-6">
        Contactez-moi
      </h3>
      <div className="flex flex-col gap-4">
        <a
          href={`tel:${HUB_CONTACT.phoneRaw}`}
          className="flex items-center justify-center gap-3 rounded-xl py-3 px-4 transition-all hover:opacity-90 active:scale-[0.98]"
          style={violetGlassStyle}
        >
          <Phone className="w-5 h-5 shrink-0" strokeWidth={2} />
          <span className="font-jakarta font-medium">{HUB_CONTACT.phoneDisplay}</span>
        </a>
        <Link
          href="/"
          className="flex items-center justify-center gap-3 rounded-xl py-3 px-4 transition-all hover:opacity-90 active:scale-[0.98]"
          style={violetGlassStyle}
        >
          <Globe className="w-5 h-5 shrink-0" strokeWidth={2} />
          <span className="font-jakarta font-medium">romaindesigncode.fr</span>
        </Link>
        <a
          href={`mailto:${HUB_CONTACT.email}`}
          className="flex items-center justify-center gap-3 rounded-xl py-3 px-4 transition-all hover:opacity-90 active:scale-[0.98]"
          style={violetGlassStyle}
        >
          <Mail className="w-5 h-5 shrink-0" strokeWidth={2} />
          <span className="font-jakarta font-medium truncate">{HUB_CONTACT.email}</span>
        </a>
        <a
          href={HUB_SOCIAL.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 rounded-xl py-3 px-4 transition-all hover:opacity-90 active:scale-[0.98]"
          style={violetGlassStyle}
        >
          <TikTokIcon className="w-5 h-5 shrink-0" />
          <span className="font-jakarta font-medium">TikTok</span>
        </a>
        <a
          href={HUB_SOCIAL.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 rounded-xl py-3 px-4 transition-all hover:opacity-90 active:scale-[0.98]"
          style={violetGlassStyle}
        >
          <Instagram className="w-5 h-5 shrink-0" strokeWidth={2} />
          <span className="font-jakarta font-medium">Instagram</span>
        </a>
      </div>
    </motion.div>
  );
}
