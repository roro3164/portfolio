export interface CommonButtonProps {
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  componentName?: string;
  textConfig?: {
    text?: string;
  };
  size?: "sm" | "md" | "lg";
  sizeLevel?: number;
  padding?: string;
  margin?: string;
  align?: "left" | "center" | "right";
  alignResponsive?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  iconSize?: number;
  width?: string | number;
  height?: string | number;
  opacity?: number;
  shadow?: string;
  hover?: string;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: string;
  customFontFamily?: string;
  blurAmount?: number;
  opacityLevel?: number;
}

