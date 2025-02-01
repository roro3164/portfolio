export interface Project {
    id: number;
    title: string;
    description: string;
    imageProject: string;
    logoProject: string;
}

export interface StyleParams {
    index: number;
    isAnimatingRight: boolean;
    animationPhase: number;
    cardOpacity: number;
    isDragging: boolean;
    dragOffset: number;
}

export interface MobileCarouselProps {
    projects: Project[];
}

export interface DesktopCarouselProps {
    projects: Project[];
}