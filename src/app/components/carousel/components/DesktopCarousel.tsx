"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { DesktopCarouselProps } from '../types';
import { ProjectCard } from './ProjectCard';


const DesktopCarousel: React.FC<DesktopCarouselProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isChangingDescription, setIsChangingDescription] = useState(false);
  const [currentProject, setCurrentProject] = useState(projects[0]);

  const nextSlide = useCallback(() => {
    if (isAnimating || selectedCard !== null) return;
    setIsAnimating(true);
    setIsExiting(true);
    setIsChangingDescription(true);
    
    // Premier timing : carte sort
    setTimeout(() => {
      setIsExiting(false);
      setActiveIndex((current) => (current + 1) % projects.length);
    }, 600);

    // Deuxième timing : description change
    setTimeout(() => {
      setCurrentProject(projects[(activeIndex + 1) % projects.length]);
      setIsChangingDescription(false);
    }, 300);

    // Troisième timing : animation finie
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, selectedCard, projects.length, activeIndex, projects]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (!isPaused && selectedCard === null) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPaused, nextSlide, selectedCard]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (selectedCard === null) {
      setIsPaused(false);
    }
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      setSelectedCard(selectedCard === null ? index : null);
      setIsPaused(selectedCard === null);
    }
  };

  const getCardStyle = (index: number) => {
    const diff = (index - activeIndex + projects.length) % projects.length;
    const isActive = diff === 0;
    const isSelected = selectedCard === index;
    
    let transform = '';
    const zIndex = projects.length - diff;
    
    if (isActive) {
      if (isExiting && !isSelected) {
        transform = 'translate(-180%, -10%) rotate(-12deg)';
      } else if (isSelected) {
        transform = 'translate(-120%, -10%) rotate(-12deg) scale(1.1)';
      } else {
        transform = 'translate(-45%, -8%) rotate(-12deg) scale(0.95) translateZ(0)';
      }
    } else {
      const offset = diff * 12;
      transform = `translate(calc(-50% + ${offset}px), -${offset}px)`;
    }

    return {
      transform,
      zIndex,
      filter: !isActive ? 'blur(0.8px)' : 'none',
      transition: 'all 0.7s ease-in-out',
    };
  };

  return (
    <div className="relative w-full flex items-center justify-center perspective-2000">
      <div className="relative w-96 h-[32rem]">
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
              className={`cursor-pointer ${isActive ? 'active-card' : ''}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCardClick(index)}
            >
              <ProjectCard
                imageProject={project.imageProject}
                logoProject={project.logoProject}
              />
            </div>
          );
        })}

        <div 
          key={currentProject.id}
          className={`absolute left-1/2 ml-32 w-96 text-white ${
            isChangingDescription ? 'fade-out' : 'fade-in'
          }`}
          style={{ 
            zIndex: projects.length + 1
          }}
        >
          <h2 className={`text-2xl font-bold mb-4 ${
            isChangingDescription ? 'fade-out' : 'fade-in'
          }`}>
            {currentProject.title}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            {currentProject.description}
          </p>
        </div>
      </div>

      <style jsx>{`
        .fade-in {
          opacity: 1;
          transform: translateX(0);
          transition: all 0.5s ease-out;
        }

        .fade-out {
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.3s ease-in;
        }

        .active-card {
          position: relative;
          transform-style: preserve-3d;
        }

        .active-card:hover {
          animation: bounce3D 4s infinite ease-in-out;
        }

        @keyframes bounce3D {
          0%, 100% {
            transform: translate(-45%, -8%) rotate(-12deg) scale(0.95) translateZ(0);
          }
          50% {
            transform: translate(-45%, -8%) rotate(-12deg) scale(1.15) translateZ(50px);
          }
        }
      `}</style>
    </div>
  );
};

export default DesktopCarousel;