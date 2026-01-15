import { ServiceCardProps } from "./types";
import styles from "./ServiceCard.module.scss";
import { CircleListItem } from "./CircleListItem";
import VioletHover from "../hover/VioletHover";

interface ExtendedServiceCardProps extends ServiceCardProps {
  disableHover?: boolean;
  width?: string; // Nouvelle prop pour la largeur
  compact?: boolean; // Nouvelle prop pour réduire la hauteur
}

export const ServiceCard = ({
  title,
  description,
  listItems,
  prefix,
  color = "violet",
  disableHover = false,
  width, // Nouvelle prop
  compact = false, // Nouvelle prop pour réduire la hauteur
}: ExtendedServiceCardProps) => (
  <div 
    className={`transition-transform duration-400 hover:scale-105  ${
      width ? '' : 'w-[29%]  min-w-[316px] sm:min-w-[400px]'
    }`}
    style={width ? { width } : {}}
  >
    <VioletHover color={color} disabled={disableHover}>
      <div className="bg-[#100E12] rounded-xl ">
        <div className={`rounded-xl ${compact ? 'h-auto min-h-[360px]' : 'h-[540px]'} flex flex-col ${compact ? 'p-4 gap-y-3.5' : 'p-6 gap-y-6'} ${styles.glassCard}`}>
          
          <div
            className={`
              mx-auto text-center
              text-white ${compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl lg:text-2xl'} font-jakarta font-semibold
              ${compact ? 'py-1.5 px-4' : 'py-2 px-10'} w-full rounded-xl
              ${styles.titleBox}
            `}
            style={{ 
              '--card-color': getColorVariable(color) 
            } as React.CSSProperties}
          >
            <h3>{title}</h3>
          </div>
       
          <div
            className={`
              rounded-xl ${compact ? 'p-3' : 'p-6'} 
              ${styles.internBox}
            `}
          >
            <p className={`text-white text-center ${compact ? 'text-xs sm:text-sm' : 'text-base sm:text-lg lg:text-xl'} ${compact ? 'leading-snug' : 'leading-relaxed'} italic`}>{description}</p>
          </div>

          <div className={`flex flex-col ${compact ? 'gap-2' : 'gap-3'}`}>
            {prefix && !compact && <p className={`text-white text-left text-base sm:text-lg lg:text-xl my-2 font-jakarta font-bold`}>{prefix}</p>}
            {listItems.map((item, index) => (
              <CircleListItem 
                key={index} 
                text={item} 
                color={color}
                textClassName={compact ? 'text-xs sm:text-sm' : ''}
                spacing={compact ? 'mr-2' : 'mr-2 sm:mr-4'}
                className={compact ? 'min-w-6 h-6' : 'min-w-8 h-8'}
              />
            ))}
          </div>
        </div>
      </div>
    </VioletHover>
  </div>
);

function getColorVariable(color: string): string {
  switch (color) {
    case 'blue':
      return 'rgba(64, 153, 211, 0.3)';
    case 'green':
      return 'rgba(64, 211, 111, 0.3)';
    case 'yellow':
      return 'rgba(212, 175, 55, 0.5)';
    case 'or': 
      return 'rgba(255, 215, 0, 0.7)';
    case 'orange':
      return 'rgba(255, 140, 0, 0.5)'; 
    case 'red':
      return 'rgba(211, 64, 64, 0.3)';
    case 'violet':
    default:
      return 'rgba(89, 64, 211, 0.3)';
  }
}