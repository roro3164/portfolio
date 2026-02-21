"use client";

import { useEffect, useRef } from "react";
import "../../../i18n";
import { Hero } from "../components/Main/Hero";
import { HubSections } from "./HubSections";
import { HubMesSites } from "./HubMesSites";
import { HubContactCard } from "./HubContactCard";

const PROSPECTION_API =
  process.env.NEXT_PUBLIC_PROSPECTION_API_URL || "https://mon-master-template.vercel.app";

export default function ContactPage() {
  const arrivedAtRef = useRef<number | null>(null);
  const durationSentRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const metier = params.get("metier");
    const establishment_name = params.get("establishment_name");
    if (!metier && !establishment_name) return;

    arrivedAtRef.current = Date.now();

    fetch(`${PROSPECTION_API}/api/prospection/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ metier, establishment_name }),
    }).catch(() => {});

    const sendDuration = () => {
      if (durationSentRef.current || arrivedAtRef.current == null) return;
      durationSentRef.current = true;
      const durationSeconds = Math.round((Date.now() - arrivedAtRef.current) / 1000);
      if (durationSeconds < 1) return;
      const url = `${PROSPECTION_API}/api/prospection/scan`;
      const body = JSON.stringify({ metier, establishment_name, duration_seconds: durationSeconds });
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(url, blob);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") sendDuration();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("beforeunload", sendDuration);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("beforeunload", sendDuration);
      sendDuration();
    };
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
