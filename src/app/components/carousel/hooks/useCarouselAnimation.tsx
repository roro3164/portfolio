"use client";
import { useState } from 'react';
import { Project } from '../types';

export const useCarouselAnimation = (projects: Project[]) => {
  const [isAnimatingRight, setIsAnimatingRight] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [cardOpacity, setCardOpacity] = useState(1);
  const [isChangingContent, setIsChangingContent] = useState(false);
  const [cards, setCards] = useState(projects);

  const handleSwipeRight = async () => {
    setIsAnimatingRight(true);
    setIsChangingContent(true);
    
    // Phase 1 : Recul des cartes
    setAnimationPhase(1);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Entre les phases
    setCards(prevCards => [
      prevCards[prevCards.length - 1],
      ...prevCards.slice(0, prevCards.length - 1)
    ]);
    
    // Phase 2 : Fade out puis in de la nouvelle carte
    setAnimationPhase(2);
    setCardOpacity(0);
    await new Promise(resolve => setTimeout(resolve, 150));
    setCardOpacity(1);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Reset
    setAnimationPhase(0);
    setIsAnimatingRight(false);
    setIsChangingContent(false);
  };

  const handleSwipeLeft = () => {
    setIsChangingContent(true);
    setCards(prevCards => [
      ...prevCards.slice(1),
      prevCards[0]
    ]);
    setTimeout(() => setIsChangingContent(false), 300);
  };

  return {
    isAnimatingRight,
    animationPhase,
    cardOpacity,
    isChangingContent,
    cards,
    setCards,
    handleSwipeRight,
    handleSwipeLeft
  };
};