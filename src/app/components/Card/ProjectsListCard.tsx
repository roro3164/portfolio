import React, { useState } from 'react';
import { ProjectCard } from '../carousel/components/ProjectCard';
import { ProjectsListCardProps } from './types';

export const ProjectsListCard: React.FC<ProjectsListCardProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const calculateCardStyle = (index: number) => {
    const diff = (index - currentIndex + projects.length) % projects.length;
    
    let transform = '';
    let opacity = 1;
    const zIndex = 30 - diff;
    
    if (diff === 0) {
      transform = 'rotateX(-15deg) translateZ(20px)';
    } else if (diff === 1) {
      transform = 'rotateX(-15deg) translateY(40px) translateX(20px) translateZ(-40px)';
      opacity = 0.9;
    } else if (diff === 2) {
      transform = 'rotateX(-15deg) translateY(80px) translateX(40px) translateZ(-80px)';
      opacity = 0.8;
    } else {
      transform = 'rotateX(-15deg) translateY(120px) translateX(60px) translateZ(-120px)';
      opacity = 0;
    }

    return {
      transform,
      opacity,
      zIndex,
    };
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="relative w-full h-[32rem] overflow-hidden">
      <div 
        className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800"
        style={{ perspective: '2000px' }}
      >
        <div 
          className="relative w-[450px]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="absolute w-full transition-all duration-500 ease-out cursor-pointer"
              style={{
                ...calculateCardStyle(projects.indexOf(project)),
                transformStyle: 'preserve-3d'
              }}
              onClick={() => setCurrentIndex(projects.indexOf(project))}
            >
              {/* On ne passe que les propriétés nécessaires à ProjectCard */}
              <ProjectCard
                imageProject={project.imageProject}
                logoProject={project.logoProject}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6 z-50">
          <button
            onClick={handlePrev}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-full 
                     text-white text-sm font-medium transition-colors backdrop-blur-sm"
          >
            Précédent
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-full 
                     text-white text-sm font-medium transition-colors backdrop-blur-sm"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};