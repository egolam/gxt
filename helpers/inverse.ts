export function inverse(X: number, Y: number) {
  const ScaleX = 29.296875;
  const ScaleY = 29.30078125;

  const lng = X / ScaleX + 110.83093333;
  const lat = -(Y / ScaleY) - 128;

  return { lng, lat };
}
