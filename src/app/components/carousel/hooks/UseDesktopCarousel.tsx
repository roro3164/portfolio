"use client";
import { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';

export function useDesktopCarousel(projects: Project[]) {
  // Tous les états qu’on avait avant
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [isChangingDescription, setIsChangingDescription] = useState(false);

  // nextSlide (avec setTimeout)
  const nextSlide = useCallback(() => {
    if (isAnimating || selectedCard !== null) return;
    setIsAnimating(true);
    setIsExiting(true);
    setIsChangingDescription(true);

    // Premier timing
    setTimeout(() => {
      setIsExiting(false);
      setActiveIndex((c) => (c + 1) % projects.length);
    }, 600);

    // Deuxième timing
    setTimeout(() => {
      setCurrentProject(projects[(activeIndex + 1) % projects.length]);
      setIsChangingDescription(false);
    }, 300);

    // Troisième timing
    setTimeout(() => setIsAnimating(false), 800);

  }, [isAnimating, projects, selectedCard, activeIndex]);

  // Auto-play (interval)
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (!isPaused && selectedCard === null) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPaused, nextSlide, selectedCard]);

  // Handlers
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    if (selectedCard === null) setIsPaused(false);
  };
  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      setSelectedCard(selectedCard === null ? index : null);
      setIsPaused(selectedCard === null);
    }
  };

  // Calcul du style pour chaque carte
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

  return {
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
  };
}