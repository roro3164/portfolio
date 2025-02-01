import { Project } from "../../Card/types";
import styles from '../styles/carousel.module.scss';

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