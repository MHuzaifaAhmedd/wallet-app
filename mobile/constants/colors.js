// constants/colors.js
const coffeeTheme = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  border: "#E5D3B7",
  white: "#FFFFFF",
  textLight: "#9A8478",
  expense: "#E74C3C",
  income: "#2ECC71",
  card: "#FFFFFF",
  shadow: "#000000",
};

const forestTheme = {
  primary: "#2E7D32",
  background: "#E8F5E9",
  text: "#1B5E20",
  border: "#C8E6C9",
  white: "#FFFFFF",
  textLight: "#66BB6A",
  expense: "#C62828",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const purpleTheme = {
  primary: "#6A1B9A",
  background: "#F3E5F5",
  text: "#4A148C",
  border: "#D1C4E9",
  white: "#FFFFFF",
  textLight: "#BA68C8",
  expense: "#D32F2F",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

const oceanTheme = {
  // Primary brand blue (buttons, accents)
  primary: "#2563EB", // blue-600

  // Backgrounds & surfaces
  background: "#FFFFFF",
  card: "#FFFFFF",
  border: "#E5E7EB", // gray-200

  // Text colors
  text: "#0F172A", // slate-900
  textLight: "#6B7280", // gray-500
  white: "#FFFFFF",

  // Semantic colors
  expense: "#EF4444", // red-500
  income: "#10B981", // emerald-500

  // Shadows
  shadow: "#000000",
};

export const THEMES = {
  coffee: coffeeTheme,
  forest: forestTheme,
  purple: purpleTheme,
  ocean: oceanTheme,
};

// 👇 change this to switch theme
export const COLORS = THEMES.ocean;
