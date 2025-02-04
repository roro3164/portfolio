import { Project } from "./types";
import styles from './styles/card.module.scss';

export const ProjectCard: React.FC<Project> = ({imageProject, logoProject}) => (
    <div className={styles.glassCardProject}>
        <div className={styles.imageContainer}>
            <img 
                src={imageProject} 
                alt="project preview" 
                className={styles.projectImage}
            />
        </div>
        <div className={styles.boxBottomCard}>
            <img 
                src={logoProject} 
                alt="project logo" 
                className={styles.logoImage}
            />
        </div>
    </div>
);