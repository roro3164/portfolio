// types.ts

// Types de base
interface ImageSize {
  width: string;
  height: string;
 }
 
 interface BoxPaddings {
  mobile?: {
    top?: string;
  };
  desktop?: {
    content?: string;
  };
 }
 
 // Props pour les styles
 export interface StyleProps {
  imageAlign?: "left" | "right" ;
  titleAlignment?: string;
  boxPaddings?: BoxPaddings;
  imageSizeMobile?: ImageSize;
  imageSizeDesktop?: ImageSize;
  cardAlignment?: string;
 }
 
 // Props pour BaseCard
 export interface BaseCardProps {
  title?: React.ReactNode;    
  titleAlignment?: string;
  children?: React.ReactNode;
  cardAlignment?: string;

  
 }
 
 // Props pour la Card principale qui étend StyleProps
 export interface CardProps extends StyleProps {
  title: string;
  internContent?: string;
  imageSrc?: string;
  hasEaselAnimation?: boolean;  
  children?: React.ReactNode;
 }
 
 export interface CardServiceProps {
  title: string;
  description: string;
  listItems: string[];
}

export interface CircleListItemProps {
  text: string;
}

export interface ProjectCardProps {
  imageProject: string;
  logoProject: string;
}

// L'interface Project reste inchangée

export interface Project {
  id?: number;
  title?: string;
  description?: string;
  imageProject?: string;
  logoProject?: string;
}

export interface ProjectCarouselProps {
  projects: Project[];
}

export interface AnimatedCardProps {
  style: React.CSSProperties;
  isActive?: boolean; // Devenu optionnel si non utilisé
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode; // Ajouté
}