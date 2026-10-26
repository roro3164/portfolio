import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const PROJETS = ["Site e-commerce", "Site vitrine", "Refonte d'un site", "Référencement local", "Restaurant (Primaps)", "Autre"];

const echapper = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const texte = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let corps: Record<string, unknown>;
  try {
    corps = await request.json();
  } catch {
    return NextResponse.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  // Champ piège : rempli uniquement par les robots.
  if (texte(corps.siteweb, 200)) return NextResponse.json({ ok: true });

  const nom = texte(corps.nom, 120);
  const entreprise = texte(corps.entreprise, 160);
  const email = texte(corps.email, 200);
  const telephone = texte(corps.telephone, 40);
  const projet = PROJETS.includes(texte(corps.projet, 60)) ? texte(corps.projet, 60) : "Autre";
  const lien = texte(corps.lien, 300);
  const message = texte(corps.message, 5000);

  if (!nom || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return NextResponse.json({ erreur: "Merci d'indiquer votre nom, un e-mail valide et quelques mots sur votre projet." }, { status: 422 });
  }

  const lignes: [string, string][] = [
    ["Nom", nom],
    ["Entreprise", entreprise],
    ["E-mail", email],
    ["Téléphone", telephone],
    ["Projet", projet],
    ["Site actuel", lien],
  ];

  try {
    const transporteur = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT ?? "587", 10),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.CONTACT_EMAIL, pass: process.env.EMAIL_PASSWORD },
    });

    await transporteur.sendMail({
      from: process.env.CONTACT_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Démo gratuite · ${projet} · ${nom}${entreprise ? ` (${entreprise})` : ""}`,
      text: `${lignes.filter(([, v]) => v).map(([k, v]) => `${k} : ${v}`).join("\n")}\n\n${message}`,
      html: `<h2>Nouvelle demande de démo gratuite</h2>${lignes
        .filter(([, v]) => v)
        .map(([k, v]) => `<p><strong>${k} :</strong> ${echapper(v)}</p>`)
        .join("")}<p><strong>Message :</strong></p><p style="white-space:pre-wrap;background:#f5f5f5;padding:15px;border-radius:6px">${echapper(message)}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Envoi du formulaire de contact impossible", e);
    return NextResponse.json({ erreur: "L'envoi a échoué. Écrivez-moi directement à romaindesigncode@gmail.com." }, { status: 500 });
  }
}
