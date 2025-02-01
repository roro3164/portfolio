import { useState } from 'react';
import { TouchEvent } from 'react';

export const useSwipe = () => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setTouchEnd(e.touches[0].clientX);
    const diff = touchStart! - e.touches[0].clientX;
    setDragOffset(-diff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  return {
    touchStart,
    touchEnd,
    isDragging,
    dragOffset,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    setTouchStart,
    setTouchEnd
  };
};