import { CSSProperties } from 'react';
import { StyleParams } from '../types';

export const getCardStyle = ({
  index,
  isAnimatingRight,
  animationPhase,
  cardOpacity,
  isDragging,
  dragOffset
}: StyleParams): CSSProperties => {
  const styles: CSSProperties = {
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
          styles.transform = `
            perspective(1000px)
            translate3d(${cardOpacity === 0 ? '-100%' : '0'}, -30px, 40px)
            rotate3d(0, 0, 1, -15deg)
          `;
          styles.zIndex = 10;
          styles.opacity = cardOpacity;
          styles.transition = 'all 0.5s ease-out';
        } else {
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