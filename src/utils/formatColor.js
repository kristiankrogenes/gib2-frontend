export function getGrayColor(percentage) {
  const value = 255 * percentage;
  return `RGB(${value},${value},${value})`;
}
