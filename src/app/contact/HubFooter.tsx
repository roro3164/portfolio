"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../components/Footer/footer.module.scss";
import { HUB_CONTACT, HUB_SOCIAL } from "./hubConfig";

export function HubFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Lien vers le site */}
        <div className={styles.email}>
          <Link href="/" className="flex flex-col items-center gap-y-2">
            <Image
              src="/image/icons/logo2.svg"
              alt="Romain DesignCode"
              width={120}
              height={32}
              className="w-auto h-8"
            />
            <span className="text-sm font-jakarta">Retour au site</span>
          </Link>
        </div>

        {/* Email */}
        <div className={styles.email}>
          <a href={`mailto:${HUB_CONTACT.email}`}>
            <Image
              src="/image/icons/mail.svg"
              alt="Email"
              width={24}
              height={24}
              className={styles.icon}
            />
            {HUB_CONTACT.email}
          </a>
        </div>

        {/* Téléphone */}
        <div className={styles.email}>
          <a href={`tel:${HUB_CONTACT.phoneRaw}`}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-16"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {HUB_CONTACT.phoneDisplay}
          </a>
        </div>

        {/* Réseaux sociaux */}
        <div className={styles.socialNetwork}>
          <ul>
            <li className="relative">
              <a
                href={HUB_SOCIAL.github}
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
                GitHub
              </a>
            </li>
            <li className="relative">
              <a
                href={HUB_SOCIAL.linkedin}
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
                LinkedIn
              </a>
            </li>
            <li className="relative">
              <a
                href={HUB_SOCIAL.behance}
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
                Behance
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={styles.footerBottom}
        style={{ textAlign: "center", padding: "1rem 0" }}
      >
        <p style={{ margin: 0, marginBottom: "1rem" }}>
          © {new Date().getFullYear()} Romain DesignCode
        </p>
        <Image
          src="/image/icons/logoCentre.svg"
          alt="Logo Romain DesignCode"
          width={120}
          height={120}
          style={{ display: "inline-block", marginTop: "0.5rem" }}
        />
      </div>
    </footer>
  );
}
