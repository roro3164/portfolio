import { CommonButtonProps } from "@/lib/types/button-props";

// Hook léger pour fournir des valeurs par défaut cohérentes
export function useButtonProps(
  props: Partial<CommonButtonProps> = {},
): Required<Pick<
  CommonButtonProps,
  "backgroundColor" | "textColor" | "borderRadius" | "fontFamily" | "fontSize" | "fontWeight" | "size"
>> &
  CommonButtonProps {
  const defaults: Required<Pick<
    CommonButtonProps,
    "backgroundColor" | "textColor" | "borderRadius" | "fontFamily" | "fontSize" | "fontWeight" | "size"
  >> = {
    backgroundColor: "#8b5cf6",
    textColor: "#ffffff",
    borderRadius: 999,
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: 14,
    fontWeight: 600,
    size: "md",
  };

  return {
    ...defaults,
    ...props,
  } as Required<Pick<
    CommonButtonProps,
    "backgroundColor" | "textColor" | "borderRadius" | "fontFamily" | "fontSize" | "fontWeight" | "size"
  >> &
    CommonButtonProps;
}

