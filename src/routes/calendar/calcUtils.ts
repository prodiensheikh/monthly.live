export function getBackgroundColor(percentage: number) {
  const red = {
    r: 255,
    g: 77,
    b: 77,
  };
  const green = {
    r: 35,
    g: 217,
    b: 132,
  };

  const r = red.r + (green.r - red.r) * percentage;
  const g = red.g + (green.g - red.g) * percentage;
  const b = red.b + (green.b - red.b) * percentage;

  return `rgb(${r}, ${g}, ${b})`;
}