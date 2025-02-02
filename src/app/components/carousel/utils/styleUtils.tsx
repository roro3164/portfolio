import React from "react";

interface GetDesktopCardStyleProps {
  index: number;
  activeIndex: number;
  selectedCard: number | null;
  totalProjects: number;
  isExiting: boolean;
}

export function getDesktopCardStyle({
  index,
  activeIndex,
  selectedCard,
  totalProjects,
  isExiting
}: GetDesktopCardStyleProps): React.CSSProperties {
  const diff = (index - activeIndex + totalProjects) % totalProjects;
  const isActive = diff === 0;
  const isSelected = selectedCard === index;

  let transform = "";
  const zIndex = totalProjects - diff;

  if (isActive) {
    if (isExiting && !isSelected) {
      transform = "translate(-180%, -10%) rotate(-12deg)";
    } else if (isSelected) {
      transform = "translate(-120%, -10%) rotate(-12deg) scale(1.1)";
    } else {
      transform = "translate(-45%, -8%) rotate(-12deg) scale(0.95) translateZ(0)";
    }
  } else {
    const offset = diff * 12;
    transform = `translate(calc(-50% + ${offset}px), -${offset}px)`;
  }

  return {
    transform,
    zIndex,
    filter: !isActive ? "blur(0.8px)" : "none",
    transition: "all 0.7s ease-in-out",
    position: "absolute",
    left: "-50%",
    top: "-20%"
  };
}