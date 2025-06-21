export const getColorValue = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    black: "#000000",
    white: "#FFFFFF",
    navy: "#1a237e",
    gray: "#9e9e9e",
    grey: "#9e9e9e",
    red: "#d32f2f",
    blue: "#1976d2",
    green: "#388e3c",
    yellow: "#fbc02d",
    orange: "#f57c00",
    purple: "#7b1fa2",
    pink: "#c2185b",
    brown: "#5d4037",
    beige: "#f5f5dc",
    cream: "#fffdd0",
    maroon: "#800000",
    olive: "#808000",
    teal: "#008080",
    silver: "#c0c0c0",
  };

  return colorMap[colorName.toLowerCase()] || "#cccccc";
};

export const getContrastColor = (backgroundColor: string): string => {
  // Convert hex to RGB
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white based on luminance
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};
