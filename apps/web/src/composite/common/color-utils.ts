export const hexToRgb = (
  hex: string,
): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
};

export const generateColorShades = (primaryColor: string) => {
  const rgb = hexToRgb(primaryColor);
  if (!rgb) return null;

  const { r, g, b } = rgb;

  const lighten = (amount: number) => {
    return rgbToHex(
      Math.min(255, r + (255 - r) * amount),
      Math.min(255, g + (255 - g) * amount),
      Math.min(255, b + (255 - b) * amount),
    );
  };

  const darken = (amount: number) => {
    return rgbToHex(
      Math.max(0, r * (1 - amount)),
      Math.max(0, g * (1 - amount)),
      Math.max(0, b * (1 - amount)),
    );
  };

  return {
    50: lighten(0.95),
    100: lighten(0.9),
    200: lighten(0.75),
    300: lighten(0.6),
    400: lighten(0.3),
    500: primaryColor,
    600: darken(0.1),
    700: darken(0.2),
    800: darken(0.3),
    900: darken(0.4),
  };
};

export const getContrastColor = (hexColor: string): string => {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#000000';

  const { r, g, b } = rgb;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
