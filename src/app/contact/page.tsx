"use client";

import { useEffect } from "react";
import "../../../i18n";
import { Hero } from "../components/Main/Hero";
import { HubSections } from "./HubSections";
import { HubMesSites } from "./HubMesSites";
import { HubContactCard } from "./HubContactCard";

const PROSPECTION_API =
  process.env.NEXT_PUBLIC_PROSPECTION_API_URL || "https://mon-master-template.vercel.app";

export default function ContactPage() {
  useEffect(() => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const metier = params.get("metier");
    const establishment_name = params.get("establishment_name");
    if (!metier && !establishment_name) return;

    fetch(`${PROSPECTION_API}/api/prospection/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ metier, establishment_name }),
    }).catch(() => {});
  }, []);

  return (
    <div className="home">
      <div className="pt-0">
        <Hero showHeader showButtons={false} headerMinimal showSticker={false} compact />
        <HubMesSites />
        <HubSections />
        <div className="px-4 pt-4 pb-12">
          <HubContactCard />
        </div>
      </div>
    </div>
  );
}
