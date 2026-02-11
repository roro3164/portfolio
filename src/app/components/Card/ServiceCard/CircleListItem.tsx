import styles from './ServiceCard.module.scss';

const accentColors: Record<string, string> = {
  green: "#22c55e",
  blue: "#3b82f6",
  violet: "#8b5cf6",
  gold: "#d4af37",
  yellow: "#eab308",
  orange: "#f97316",
  red: "#ef4444",
};

interface CircleListItemProps {
  text: string;
  className?: string;
  color?: string;
  textClassName?: string;
  spacing?: string;
  /** Affiche uniquement un point coloré, sans symbole ✓ */
  dotOnly?: boolean;
  /** Affiche uniquement la coche ✓, sans fond coloré */
  checkOnly?: boolean;
}

export const CircleListItem = ({ 
  text, 
  className = "", 
  color = "violet",
  textClassName = "",
  spacing = "mr-2 sm:mr-4",
  dotOnly = false,
  checkOnly = false
}: CircleListItemProps) => {
  const colorValue = getColorVariable(color);
  const sizeClass = className || (dotOnly ? "min-w-2 h-2" : "min-w-8 h-8");
  const checkColor = accentColors[color] || accentColors.violet;

  if (checkOnly) {
    return (
      <div className="flex items-center">
        <span
          className={`flex items-center justify-center ${spacing} text-lg font-bold`}
          style={{ color: checkColor }}
          aria-hidden
        >
          ✓
        </span>
        <span className={`text-white ${textClassName || 'text-sm lg:text-base'}`}>
          {text}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div 
        className={`
          flex items-center justify-center
          ${spacing}
          rounded-full
          ${styles.circle}
          ${sizeClass}
          ${dotOnly ? "text-transparent" : "text-white"}
        `}
        style={{ 
          '--card-color': colorValue 
        } as React.CSSProperties}
      >
        {!dotOnly && "✓"}
      </div>
      <span className={`text-white ${textClassName || 'text-sm lg:text-base'}`}>
        {text}
      </span>
    </div>
  );
};

// Mêmes couleurs que les fonds des titres des cartes (accentColors)
function getColorVariable(color: string): string {
  switch (color) {
    case 'green':
      return 'rgba(34, 197, 94, 0.5)';   // #22c55e
    case 'blue':
      return 'rgba(59, 130, 246, 0.5)';  // #3b82f6
    case 'violet':
      return 'rgba(139, 92, 246, 0.5)'; // #8b5cf6
    case 'gold':
      return 'rgba(212, 175, 55, 0.5)'; // #d4af37
    case 'yellow':
      return 'rgba(212, 175, 55, 0.5)';
    case 'orange':
      return 'rgba(255, 140, 0, 0.5)';
    case 'red':
      return 'rgba(211, 64, 64, 0.3)';
    default:
      return 'rgba(139, 92, 246, 0.5)';
  }
}