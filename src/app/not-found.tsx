import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

export const metadata: Metadata = { title: "Page introuvable", robots: { index: false } };

export default function PageIntrouvable() {
  return (
    <>
    <Header />
    <main id="contenu">
    <section className="wrap flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="h2 mt-4">Cette page n&apos;existe pas (ou plus).</h1>
      <p className="lead mt-4">Elle a peut-être changé d&apos;adresse lors de la refonte du site.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">Retour à l&apos;accueil</Link>
        <Link href="/realisations" className="btn btn-ghost">Voir les réalisations</Link>
      </div>
    </section>
    </main>
    <Footer />
    </>
  );
}
