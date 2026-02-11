// Simple theme hook used by the generic Navbar component.
// This is a lightweight placeholder that provides the values
// the Navbar expects (primary color + assetVariant).

type Theme = {
  assetVariant?: "light" | "dark";
  colors?: {
    primary?: string;
  };
};

type ThemeContextValue = {
  theme?: Theme;
  customVariables?: {
    primaryColor?: string;
  };
};

export function useTheme(): ThemeContextValue {
  return {
    theme: {
      assetVariant: "dark",
      colors: {
        primary: "#C76BBF",
      },
    },
    customVariables: {
      primaryColor: "#C76BBF",
    },
  };
}

