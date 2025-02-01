import { CardProps } from './types';
import { getCardClasses } from './styles/utils';

import styles from './styles/card.module.scss';
import EaselAnimation from '../EaselAnimation';
import BaseCard from './BaseCard';



const Card = ({
  title,
  internContent,
  imageSrc,
  imageAlign = 'left',
  hasEaselAnimation = false,
  ...styleProps
}: CardProps) => {
  const classes = getCardClasses({ imageAlign, ...styleProps });

  return (
    <BaseCard
    title={title} 
    titleAlignment= {classes.titleAlignment}
    cardAlignment={classes.cardAlignement}
  >
      
      {/* Mobile Content */}
      <div 
        className={`${styles.internBox} ${classes.mobile.visibility}`}
        style={classes.mobile.style} 
      >
        <p className={styles.content}>{internContent}</p>
      </div>

      {/* Desktop Content */}
      <div 
        className={`${styles.internBox} ${classes.desktop.visibility}`}
        style={classes.desktop.style}
      >
        <p className={styles.content}>{internContent}</p>
      </div>

      {/* Mobile Image */}
      <div 
        className={`${classes.mobile.imagePosition} ${classes.mobile.visibility}`}
        style={classes.mobile.imageStyle}
      >
        <img src={imageSrc} alt="Card decoration" className="w-full h-full object-contain " />
        {hasEaselAnimation && <EaselAnimation />}
      </div>

      {/* Desktop Image */}
      <div 
        className={`${classes.desktop.imagePosition} ${classes.desktop.visibility}`}
        style={classes.desktop.imageStyle}
      >
        <img src={imageSrc} alt="Card decoration" className="w-full h-full object-contain " />
        {hasEaselAnimation && <EaselAnimation />}
      </div>
    </BaseCard>
  );
};
export default Card;