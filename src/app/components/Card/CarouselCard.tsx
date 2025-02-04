"use client";
import React, { useEffect, useState } from 'react';
import { Project } from './types';
import { DesktopCarousel } from './DesktopCarousel';
import MobileCarousel from './MobileCarousel';


interface CardProjectProps {
  projects: Project[];
}

export const CardProject: React.FC<CardProjectProps> = ({ projects }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Quand la largeur de la fenêtre est < 1024px => on définit isMobile = true
      setIsMobile(window.innerWidth < 1024);
    };

    // On exécute une première fois pour vérifier la taille à l'initialisation
    handleResize();

    // On écoute les changements de taille de fenêtre
    window.addEventListener('resize', handleResize);
    
    // Nettoyage quand le composant se démonte
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // On choisit d'afficher l'un ou l'autre en fonction de la variable `isMobile`
  return (
    <>
      {isMobile ? (
        <MobileCarousel projects={projects} />
      ) : (
        <DesktopCarousel projects={projects} />
      )}
    </>
  );
};