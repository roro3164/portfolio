"use client";

import "../../../i18n";
import { Hero } from "../components/Main/Hero";
import { HubSections } from "./HubSections";
import { HubContactCard } from "./HubContactCard";

export default function HubPage() {
  return (
    <div className="home">
      <div className="pt-0">
        <Hero showHeader={false} showButtons={false} compact />
        <HubSections />
        <div className="px-4 pt-4 pb-12">
          <HubContactCard />
        </div>
      </div>
    </div>
  );
}
