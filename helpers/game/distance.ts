export function getDistance(
  guessXY: [number, number] | null,
  exactXY: [number, number] | null,
) {
  if (!guessXY || !exactXY) return 0;

  const x = guessXY[0] - exactXY[0];
  const y = guessXY[1] - exactXY[1];

  return Math.round(Math.hypot(x, y));
}
