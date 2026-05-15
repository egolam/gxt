export function getScore(distance: number): number {
  let points = 0;
  if (distance >= 500 || !distance) {
    points = 0;
  } else if (distance <= 12) {
    points = 2000;
  } else if (distance < 500) {
    points = 2000 - Math.round(distance) * 4;
  }

  return points;
}
