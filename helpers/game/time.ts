export function getRemainingMs({
  startedAtMs,
  durationSec,
  nowMs,
}: {
  startedAtMs: number;
  durationSec: number;
  nowMs: number;
}) {
  const end = startedAtMs + durationSec * 1000;

  return Math.max(0, end - nowMs);
}

export function isRoundExpired({
  startedAtMs,
  durationSec,
  nowMs,
}: {
  startedAtMs: number;
  durationSec: number;
  nowMs: number;
}) {
  return nowMs >= startedAtMs + durationSec * 1000;
}
