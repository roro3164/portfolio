export interface Project {
    id: number;
    title: string;
    description: string;
    imageProject: string;
    logoProject: string;
  }
  
  export interface DesktopCarouselProps {
    projects: Project[];
    onTitleChange: (title: string) => void;
  }
  
  