import { useThemeStore } from "@/store/themeStore";
import { darkColors, lightColors } from "@/theme";

export const useThemeColors = () => {
  const theme = useThemeStore((state) => state.theme);
  return theme === "dark" ? darkColors : lightColors;
};
