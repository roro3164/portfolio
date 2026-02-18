"use client";

import "../../../i18n";
import { Hero } from "../components/Main/Hero";
import { HubSections } from "./HubSections";
import { HubMesSites } from "./HubMesSites";
import { HubContactCard } from "./HubContactCard";

export default function ContactPage() {
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
