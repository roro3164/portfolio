// Config hub – à adapter avec tes vraies coordonnées

export const HUB_CONTACT = {
  email: "romaindesigncode@gmail.com",
  /** Numéro au format international pour tel: et WhatsApp (sans espaces) */
  phoneRaw: "+33689226269",
  /** Numéro affiché (avec espaces) */
  phoneDisplay: "06 89 22 62 69",
} as const;

export const HUB_SOCIAL = {
  github: "https://github.com/roro3164",
  linkedin: "https://www.linkedin.com/in/romain-mornet/",
  behance: "https://www.behance.net/romainmornet",
  tiktok: "https://www.tiktok.com/@romain_designcode",
  instagram: "https://www.instagram.com/romaindesigncode",
} as const;

/** Pour lien WhatsApp : numéro sans + */
export const whatsappNumber = HUB_CONTACT.phoneRaw.replace(/\D/g, "");
