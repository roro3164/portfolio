import { BaseCardProps } from './types';
import styles from './styles/card.module.scss';


const BaseCard = ({ title, children, titleAlignment = '', cardAlignment = '' }: BaseCardProps) => (
  <div className={`${styles.cardContainer} ${cardAlignment}`}>
    <div className={styles.hiddenContainer}>
      <div className={styles.animationContainer}></div>
    </div>


    

    <div className={styles.background}>
      <div className={styles.glass}>
      <div className={`${styles.titleBox} ${titleAlignment}`}>
          <h3>{title}</h3>
        </div>
        {children}
      </div>
    </div>
  </div>
);
export default BaseCard;