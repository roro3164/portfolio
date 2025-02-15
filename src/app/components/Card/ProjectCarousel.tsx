"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Project } from './types';

import { ProjectCard } from './ProjectCard';
import styles from './styles/card.module.scss';
import { getCardClasses } from './styles/utils';
import { BaseCard } from './BaseCard';

interface ProjectCarouselProps {
  projects: Project[];
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects }) => {
  const classes = getCardClasses({ imageAlign: 'left' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [isChangingDescription, setIsChangingDescription] = useState(false);

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
  }, [isAnimating, projects.length, selectedCard, activeIndex, projects]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    
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
        transform = 'translate(-45%, -8%) rotate(-12deg) scale(0.95) translateZ(0)'; // Position de base modifiée
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

  return (
    <BaseCard
    title={
      <div 
        key={currentProject.id} 
        className={isChangingDescription ? 'fade-out' : 'fade-in'}
      >
        {currentProject.title}
      </div>
    }
      titleAlignment={classes.titleAlignment}
      cardAlignment={classes.cardAlignement}
    >
      <div className={`relative w-full flex items-center justify-center perspective-2000 ${styles.internBox}`}>
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

          <div 
            key={currentProject.id}
            className={`absolute left-1/2 ml-32 w-96 text-white opacity-0 ${
              isChangingDescription ? 'fade-out' : 'fade-in'
            }`}
            style={{ 
              zIndex: projects.length + 1
            }}
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              {currentProject.description}
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(20px);
          }
        }

        .fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .fade-out {
          animation: fadeOut 0.3s ease-in forwards;
        }

        @keyframes titleFade {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title-fade {
  animation: titleFade 0.3s ease-out forwards;
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

  .active-card > div {
    position: relative;
    overflow: hidden;
  }

  // Gardez l'effet shine existant
  .active-card > div::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: skewX(-15deg);
    animation: shine 2.5s infinite;
    z-index: 2;
    border-radius: inherit;
  }

  @keyframes shine {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
  
      `}</style>
    </BaseCard>
  );
};

export default ProjectCarousel;