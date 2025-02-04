"use client";
import React, { useState } from 'react';
import { Project } from './types';
import { ProjectCard } from './ProjectCard';
import BaseCard from './BaseCard';
import { getCardClasses } from './styles/utils';
import styles from './styles/card.module.scss';

interface MobileProjectCarouselProps {
  projects: Project[];
}

export const MobileCarousel: React.FC<MobileProjectCarouselProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isChangingContent, setIsChangingContent] = useState(false);
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [isExiting, setIsExiting] = useState(false);
  
  const classes = getCardClasses({ imageAlign: 'left' });

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe || isRightSwipe) {
      setIsExiting(true);
      setIsChangingContent(true);
      
      setTimeout(() => {
        const newIndex = isLeftSwipe
          ? (activeIndex + 1) % projects.length
          : (activeIndex - 1 + projects.length) % projects.length;
        
        setActiveIndex(newIndex);
        setCurrentProject(projects[newIndex]);
        setIsExiting(false);
      }, 300);

      setTimeout(() => {
        setIsChangingContent(false);
      }, 600);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const getCardStyle = (index: number) => {
    const diff = (index - activeIndex + projects.length) % projects.length;
    const isActive = diff === 0;
    let transform = "";
    const zIndex = projects.length - diff;

    if (isActive) {
      if (isExiting) {
        transform = "translate(-180%, -10%) rotate(-12deg)";
      } else {
        transform = "translate(-45%, -8%) rotate(-12deg) scale(0.95)";
      }
    } else {
      const offset = diff * 12;
      transform = `translate(calc(-50% + ${offset}px), -${offset}px)`;
    }

    return {
      position: 'absolute' as const,
      left: '45%',
      top: '0%',
      transform,
      zIndex,
      filter: !isActive ? "blur(0.8px)" : "none",
      transition: "all 0.7s ease-in-out",
    };
  };

  return (
    <BaseCard
      title={
        <div className={isChangingContent ? "fade-out" : "fade-in"}>
          {currentProject.title}
        </div>
      }
      titleAlignment={classes.titleAlignment}
      cardAlignment={classes.cardAlignement}
    >
      <div className={`${styles.internBox} w-full`}>
        <div 
          className="relative h-80 w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={getCardStyle(index)}
              className="w-56 h-80"
            >
              <ProjectCard
                imageProject={project.imageProject}
                logoProject={project.logoProject}
              />
            </div>
          ))}
        </div>

        <div className={`px-4 w-full ${isChangingContent ? "fade-out" : "fade-in"}`}>
          <p className="text-gray-300 text-center leading-relaxed">
            {currentProject.description}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }

        .fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .fade-out { animation: fadeOut 0.3s ease-in forwards; }
      `}</style>
    </BaseCard>
  );
};

export default MobileCarousel;