export function inverse(x: number, y: number) {
  const scaleX = 29.296875;
  const scaleY = 29.30078125;

  const lng = x / scaleX + 110.83093333;
  const lat = -(y / scaleY) - 128;

  return { lng, lat };
}
