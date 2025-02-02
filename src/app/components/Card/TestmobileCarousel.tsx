"use client";
import React, { useState } from 'react';
import { ProjectCard } from '../carousel/components/ProjectCard';
import { Project } from './types';

interface MobileProjectCarouselProps {
  projects: Project[];
}

export const TestMobileCarousel: React.FC<MobileProjectCarouselProps> = ({ projects }) => {
  const [cards, setCards] = useState(projects);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimatingRight, setIsAnimatingRight] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isChangingContent, setIsChangingContent] = useState(false);
  const [cardOpacity, setCardOpacity] = useState(1);

  const handleTouchStart = (e) => {
    if (isAnimatingRight) return;
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || isAnimatingRight) return;
    setTouchEnd(e.touches[0].clientX);
    const diff = touchStart - e.touches[0].clientX;
    setDragOffset(-diff);
  };

  const handleSwipeRight = async () => {
    setIsAnimatingRight(true);
    setIsChangingContent(true);
    
    // Phase 1 : Recul des cartes
    setAnimationPhase(1);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Entre les phases : réorganisation silencieuse des cartes
    setCards(prevCards => [
      prevCards[prevCards.length - 1],
      ...prevCards.slice(0, prevCards.length - 1)
    ]);
    
    // Phase 2 : Fade out puis in de la nouvelle carte
    setAnimationPhase(2);
    setCardOpacity(0); // Cache la carte
    await new Promise(resolve => setTimeout(resolve, 150)); // Attend que la carte soit cachée
    setCardOpacity(1); // Fait réapparaître la carte
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Reset
    setAnimationPhase(0);
    setIsAnimatingRight(false);
    setIsChangingContent(false);
  };

  const handleTouchEnd = () => {
    if (isAnimatingRight) return;
    setIsDragging(false);
    
    if (!touchStart || !touchEnd) return;
    
    const diff = touchStart - touchEnd;
    const threshold = 100;
    
    if (diff > threshold) {
      setIsChangingContent(true);
      setCards(prevCards => [
        ...prevCards.slice(1),
        prevCards[0]
      ]);
      setTimeout(() => setIsChangingContent(false), 300);
    } else if (diff < -threshold) {
      handleSwipeRight();
    }
    
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const getCardStyle = (index) => {
    const styles = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      transition: 'all 0.3s ease-out, opacity 0.3s ease-in-out',
      transform: '',
      zIndex: 5 - index,
      filter: index === 0 ? 'none' : 'blur(0.8px)'
    };

    if (index > 4) {
      return { ...styles, display: 'none' };
    }

    if (isAnimatingRight) {
      if (animationPhase === 1) {
        // Phase 1: toutes les cartes reculent d'une position
        const newPosition = index + 1;
        const verticalOffset = newPosition * 15;
        const horizontalOffset = newPosition * 12;
        
        if (index === 0) {
          styles.transform = `
            perspective(1000px)
            translate3d(${horizontalOffset}px, -${verticalOffset}px, ${-horizontalOffset}px)
            rotate3d(0, 0, 1, 0deg)
          `;
          styles.zIndex = 4;
        } else {
          styles.transform = `
            perspective(1000px)
            translate3d(${horizontalOffset}px, -${verticalOffset}px, ${-horizontalOffset}px)
          `;
          styles.zIndex = 3 - index;
        }
      } else if (animationPhase === 2) {
        if (index === 0) {
          // La nouvelle carte arrive de la gauche avec effet de fade
          styles.transform = `
            perspective(1000px)
            translate3d(${cardOpacity === 0 ? '-100%' : '0'}, -30px, 40px)
            rotate3d(0, 0, 1, -15deg)
          `;
          styles.zIndex = 10;
          styles.opacity = cardOpacity;
          styles.transition = 'all 0.5s ease-out';
        } else {
          // Les autres cartes restent à leur nouvelle position
          const verticalOffset = index * 15;
          const horizontalOffset = index * 12;
          styles.transform = `
            perspective(1000px)
            translate3d(${horizontalOffset}px, -${verticalOffset}px, ${-horizontalOffset}px)
          `;
        }
      }
    } else {
      if (index === 0) {
        const dragX = isDragging ? dragOffset : 0;
        styles.transform = `
          perspective(1000px)
          translate3d(${dragX}px, -30px, 20px)
          rotate3d(0, 0, 1, -15deg)
        `;
        styles.zIndex = 5;
      } else {
        const verticalOffset = index * 15;
        const horizontalOffset = index * 12;
        styles.transform = `
          perspective(1000px)
          translate3d(${horizontalOffset}px, -${verticalOffset}px, ${-horizontalOffset}px)
        `;
      }
    }

    return styles;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Section des cartes */}
      <div className="relative w-48 h-72">
        <div 
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {cards.map((project, index) => (
            <div 
              key={project.id}
              style={getCardStyle(index)}
              className="w-full h-full"
            >
              <ProjectCard
                imageProject={project.imageProject}
                logoProject={project.logoProject}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Section titre et description */}
      <div className="mt-8 px-4 w-full">
        <div 
          className={`text-center mb-4 transition-opacity duration-300 ${
            isChangingContent ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h2 className="text-xl font-bold">{cards[0].title}</h2>
        </div>
        <div 
          className={`text-center transition-opacity duration-300 ${
            isChangingContent ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <p className="text-gray-600">{cards[0].description}</p>
        </div>
      </div>
    </div>
  );
};
