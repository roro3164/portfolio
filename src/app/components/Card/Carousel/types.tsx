export interface ProjectCardProps {
    imageProject: string;
    logoProject: string;
  }
  
  export interface Project {
    id?: number;
    imageProject: string;
    logoProject: string;
    className?: string;
    title?: string;
    description?: string;
    moreInfoUrl?: string;
    technologies?: Technology[];
    sections?: { // Ajoutez cette interface
      title: string;
      content: string[];
    }[];
    note?: string;
  }
  
  export interface Technology {
    name: string;
    icon: string;
  }
   
  export interface ProjectCarouselProps {
    projects: Project[];
  }
  
  export interface AnimatedCardProps {
    style: React.CSSProperties;
    isActive?: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    children: React.ReactNode;
  }