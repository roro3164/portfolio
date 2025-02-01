"use client";
import React, { useState, useEffect } from 'react';
import { projects } from '../data/projectsData';
import DesktopCarousel from './DesktopCarousel';
import styles from '../styles/carousel.module.scss';
import BaseCard from '../../Card/BaseCard';
import MobileCarousel from './MobileCarousel';


const ProjectCarousel: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentProject] = useState(projects[0]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <BaseCard title={currentProject.title} titleAlignment="mx-auto" cardAlignment="mx-auto">
      <div className={styles.internBox}>
        {isMobile ? (
          <MobileCarousel projects={projects} />
        ) : (
          <DesktopCarousel projects={projects} />
        )}
      </div>
    </BaseCard>
  );
};

export default ProjectCarousel;