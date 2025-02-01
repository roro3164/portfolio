"use client";
import React from 'react';
import { MobileCarouselProps } from '../types';
import { ProjectCard } from './ProjectCard';
import { useSwipe } from '../hooks/useSwipe';
import { useCarouselAnimation } from '../hooks/useCarouselAnimation';
import { getCardStyle } from '../utils/styleUtils';


const MobileCarousel: React.FC<MobileCarouselProps> = ({ projects }) => {
  const {
    touchStart,
    touchEnd,
    isDragging,
    dragOffset,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useSwipe();

  const {
    isAnimatingRight,
    animationPhase,
    cardOpacity,
    isChangingContent,
    cards,
    handleSwipeRight,
    handleSwipeLeft
  } = useCarouselAnimation(projects);

  const handleTouchEndWithSwipe = () => {
    if (!touchStart || !touchEnd) return;
    
    const diff = touchStart - touchEnd;
    const threshold = 100;
    
    if (diff > threshold) {
      handleSwipeLeft();
    } else if (diff < -threshold) {
      handleSwipeRight();
    }
    
    handleTouchEnd();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Zone des cartes */}
      <div className="flex-none relative w-full flex justify-center" style={{ height: '60vh' }}>
        <div className="relative w-48 h-72">
          <div 
            className="relative w-full h-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEndWithSwipe}
          >
            {cards.map((project, index) => (
              <div 
                key={project.id}
                style={getCardStyle({
                  index,
                  isAnimatingRight,
                  animationPhase,
                  cardOpacity,
                  isDragging,
                  dragOffset
                })}
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
      </div>

      {/* Zone de texte */}
      <div className="flex-grow w-full px-4 py-6 bg-gray-900">
        <div 
          className={`max-w-md mx-auto transition-opacity duration-300 ${
            isChangingContent ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h2 className="text-xl font-bold text-white text-center mb-4">
            {cards[0].title}
          </h2>
          <p className="text-gray-300 text-center">
            {cards[0].description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileCarousel;