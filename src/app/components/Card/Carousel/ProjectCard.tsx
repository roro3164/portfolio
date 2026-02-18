import { Project } from "./types";
import styles from './Carousel.module.scss';
import Image from "next/image";

interface ProjectCardProps extends Project {
  imageOpacity?: number;
  className?: string;
  imageScale?: number;
  metiers?: string[];
  metier?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  imageProject, 
  logoProject, 
  imageOpacity = 1,
  className,
  imageScale = 1,
  metiers,
  metier
}) => (
    <div className={`${styles.glassCardProject} ${className ?? ""}`.trim()}>
        <div className={styles.imageContainer}>
        <Image
          src={imageProject}
          alt="project preview"
          width={800}
          height={600}
          style={{ 
            opacity: imageOpacity,
            transition: 'opacity 0.7s ease-in-out',
            transform: imageScale !== 1 ? `scale(${imageScale})` : undefined,
            objectFit: 'contain'
          }}
        />
        </div>
        <div className={styles.boxBottomCard}>
            {(metier || (metiers && metiers.length > 0)) ? (
              <span 
                className="text-white font-jakarta font-semibold text-lg sm:text-xl text-center w-full block"
                style={{ 
                  opacity: imageOpacity === 1 ? 1 : 0,
                  transition: 'opacity 0.7s ease-in-out',
                  textShadow: '0 1px 2px black, 0 0 4px black'
                }}
              >
                {metier ?? metiers?.join(" • ")}
              </span>
            ) : (
              <img 
                src={logoProject} 
                alt="project logo"
                style={{ 
                  opacity: imageOpacity,
                  transition: 'opacity 0.7s ease-in-out'
                }}
              />
            )}
        </div>
    </div>
);