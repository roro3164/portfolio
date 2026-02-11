import React from "react";
import Image from "next/image";
import styles from "./footer.module.scss";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const scrollToContactForm = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Lien e-mail */}
        <div className={styles.email}>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToContactForm();
            }}
          >
            <Image
              src="/image/icons/mail.svg"
              alt="Email"
              width={24}
              height={24}
              className={styles.icon}
            />
            romaindesigncode@gmail.com
          </a>
        </div>

        {/* Navigation */}
        <div className={styles.sectionNav}>
          <ul>
          <li><a href="#seo">{t("footer.navigation.seo")}</a></li>
            <li><a href="#developer">{t("footer.navigation.developer")}</a></li>
            <li><a href="#designer">{t("footer.navigation.designer")}</a></li>
            <li><a href="#services">{t("footer.navigation.services")}</a></li>
            <li><a href="#projects">{t("footer.navigation.projects")}</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToContactForm(); }}>{t("footer.navigation.contact")}</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div className={styles.socialNetwork}>
          <ul>
            {/* GitHub */}
            <li className="relative">
              <a
                href="https://github.com/roro3164"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/image/icons/githubHover.svg"
                  alt="GitHub Hover"
                  width={24}
                  height={24}
                  className={`${styles.iconHover} absolute top-[10px] left-[11px] -z-1`}
                />
                <Image
                  src="/image/icons/gitHub.svg"
                  alt="GitHub"
                  width={24}
                  height={24}
                  className={styles.icon}
                />
                {t("footer.social.github")}
              </a>
            </li>
            {/* LinkedIn */}
            <li className="relative">
              <a
                href="https://www.linkedin.com/in/romain-mornet/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/image/icons/linkedinHover.svg"
                  alt="LinkedIn Hover"
                  width={24}
                  height={24}
                  className={`${styles.iconHover} absolute top-[8px] left-[12px] -z-1`}
                />
                <Image
                  src="/image/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className={styles.icon}
                />
                {t("footer.social.linkedin")}
              </a>
            </li>
            {/* Behance */}
            <li className="relative">
              <a
                href="https://www.behance.net/romainmornet"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/image/icons/behanceHover.svg"
                  alt="Behance Hover"
                  width={24}
                  height={24}
                  className={`${styles.iconHover} absolute top-[19px] left-[12px] -z-1`}
                />
                <Image
                  src="/image/icons/behance.svg"
                  alt="Behance"
                  width={24}
                  height={24}
                  className={styles.icon}
                />
                {t("footer.social.behance")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bas de page centré avec padding */}
      <div
        className={styles.footerBottom}
        style={{ textAlign: "center", padding: "1rem 0" }}
      >
        <p style={{ margin: 0, marginBottom: "1rem" }}>
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>
        {/* Logo centré */}
        <Image
          src="/image/icons/logoCentre.svg"
          alt="Logo Romain DesignCode"
          width={160}
          height={160}
          style={{ display: "inline-block", marginTop: "1rem" }}
        />
      </div>
    </footer>
  );
};