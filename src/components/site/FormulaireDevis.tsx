"use client";

import { useState } from "react";

const PROJETS = ["Site e-commerce", "Site vitrine", "Refonte d'un site", "Référencement local", "Restaurant (Primaps)", "Autre"];

const champ =
  "mt-2 block w-full rounded-xl border border-[var(--line-2)] bg-[var(--bg)] px-4 py-3 text-[16px] text-white placeholder:text-[var(--faint)] transition-colors focus:border-[var(--violet)] focus:outline-none focus:ring-2 focus:ring-[rgba(143,137,236,0.3)]";
const etiquette = "text-[14.5px] font-medium text-[#dcdae6]";

export function FormulaireDevis({ projetInitial }: { projetInitial?: string }) {
  const [etat, setEtat] = useState<"repos" | "envoi" | "ok" | "erreur">("repos");
  const [erreur, setErreur] = useState("");

  async function envoyer(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setEtat("envoi");
    setErreur("");
    const donnees = Object.fromEntries(new FormData(ev.currentTarget));
    try {
      const rep = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donnees),
      });
      const json = await rep.json().catch(() => ({}));
      if (!rep.ok) throw new Error(json.erreur || "L'envoi a échoué.");
      setEtat("ok");
      (window as unknown as { dataLayer?: object[] }).dataLayer?.push({ event: "demande_demo", projet: donnees.projet });
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "L'envoi a échoué.");
      setEtat("erreur");
    }
  }

  if (etat === "ok") {
    return (
      <div className="carte-laser p-8 text-center md:p-12" role="status">
        <p className="text-[1.6rem] font-bold tracking-tight">Merci, je m&apos;occupe de votre démo.</p>
        <p className="mx-auto mt-3 max-w-md text-[var(--muted)]">
          Je lis votre message et je reviens vers vous sous 24 h pour lancer votre démo gratuite. Pensez à vérifier vos spams.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={envoyer} className="carte-laser lent space-y-6 p-6 md:p-9">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={etiquette}>Votre nom *</span>
          <input name="nom" required autoComplete="name" className={champ} />
        </label>
        <label className="block">
          <span className={etiquette}>Entreprise</span>
          <input name="entreprise" autoComplete="organization" className={champ} />
        </label>
        <label className="block">
          <span className={etiquette}>E-mail *</span>
          <input name="email" type="email" required autoComplete="email" className={champ} />
        </label>
        <label className="block">
          <span className={etiquette}>Téléphone</span>
          <input name="telephone" type="tel" autoComplete="tel" className={champ} />
        </label>
      </div>

      <fieldset>
        <legend className={etiquette}>Votre projet *</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {PROJETS.map((p) => (
            <label key={p} className="cursor-pointer">
              <input type="radio" name="projet" value={p} defaultChecked={p === (projetInitial ?? "Site e-commerce")} className="peer sr-only" required />
              <span className="inline-flex min-h-[42px] items-center rounded-full border border-[var(--line-2)] px-4 text-[14.5px] text-[var(--muted)] transition-colors peer-checked:border-[var(--violet)] peer-checked:bg-[rgba(143,137,236,0.14)] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--violet-2)]">
                {p}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className={etiquette}>Votre site actuel (si vous en avez un)</span>
        <input name="lien" type="url" inputMode="url" placeholder="https://" className={champ} />
      </label>

      <label className="block">
        <span className={etiquette}>Présentez votre activité *</span>
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="Ce que vous faites, pour qui, ce que le site doit apporter (ventes, appels, réservations), vos couleurs ou un site que vous aimez…"
          className={champ}
        />
      </label>

      {/* Piège à robots, invisible pour les visiteurs */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Ne pas remplir
          <input name="siteweb" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {etat === "erreur" && (
        <p role="alert" className="rounded-xl border border-[#ff8a8a40] bg-[#ff8a8a14] px-4 py-3 text-[15px] text-[#ffc2c2]">
          {erreur}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13.5px] text-[var(--faint)]">
          Vos informations servent uniquement à vous répondre.{" "}
          <a href="/confidentialite" className="underline underline-offset-2 hover:text-white">
            Confidentialité
          </a>
        </p>
        <button type="submit" disabled={etat === "envoi"} className="btn btn-primary disabled:opacity-60">
          {etat === "envoi" ? "Envoi…" : "Recevoir ma démo gratuite"}
        </button>
      </div>
    </form>
  );
}
