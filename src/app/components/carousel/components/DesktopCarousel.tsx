"use client";
import React from 'react';
import { DesktopCarouselProps } from '../types';
import { useDesktopCarousel } from '../hooks/UseDesktopCarousel';
import { getCardClasses } from '../../Card/styles/utils';

// Styles du carousel (layout, etc.)
import cardStyles from '../../Card/styles/card.module.scss';

// Animations (optionnel) si tu veux appliquer des classes .fadeIn, .fadeOut...
import carouselStyles from '../styles/carousel.module.scss';

// Tes autres imports
import BaseCard from './../../Card/BaseCard';             // si tu as un BaseCard
import { ProjectCard } from './ProjectCard';   // si tu as un ProjectCard

export const DesktopCarousel: React.FC<DesktopCarouselProps> = ({ projects }) => {
  // Hook: on récupère tout l’état et les méthodes
  const {
    activeIndex,
    isAnimating,
    isExiting,
    isPaused,
    selectedCard,
    currentProject,
    isChangingDescription,
    nextSlide,
    handleMouseEnter,
    handleMouseLeave,
    handleCardClick,
    getCardStyle,
  } = useDesktopCarousel(projects);

  // Utilitaire pour aligner titre ou card
  const classes = getCardClasses({ imageAlign: 'left' });

  // Rendu JSX
  return (
    <BaseCard
      title={
        <div
          key={currentProject.id}
          /* Soit tu utilises ta classe fade-out/fade-in 
             depuis animStyles, soit tu gardes les noms 
             que tu avais et la logique inline. */
          className={isChangingDescription ? carouselStyles.fadeOut : carouselStyles.fadeIn}
        >
          {currentProject.title}
        </div>
      }
      titleAlignment={classes.titleAlignment}
      cardAlignment={classes.cardAlignement}
    >
      <div className={`relative w-full flex items-center justify-center ${cardStyles .internBox}`}>
        <div className="relative w-48 h-80">
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={project.id}
                style={{
                  ...getCardStyle(index),
                  position: 'absolute',
                  left: '-50%',
                  top: '-20%',
                }}
                onMouseEnter={isActive ? handleMouseEnter : undefined}
                onMouseLeave={isActive ? handleMouseLeave : undefined}
                onClick={() => handleCardClick(index)}
                className={`cursor-pointer ${isActive ? 'active-card' : ''}`}
              >
                <ProjectCard
                  imageProject={project.imageProject}
                  logoProject={project.logoProject}
                />
              </div>
            );
          })}

          {/* Description (text) du projet actif */}
          <div
            key={currentProject.id}
            className={`absolute left-1/2 ml-32 w-96 text-white opacity-0 ${
              isChangingDescription ? 'fade-out' : 'fade-in'
            }`}
            style={{ zIndex: projects.length + 1 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              {currentProject.description}
            </p>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};