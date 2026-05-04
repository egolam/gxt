// lib/time.ts

export function calculateRemainingTime(
  startedAt: number,
  duration: number,
  now: number,
) {
  const endTime = startedAt + duration * 1000;
  return Math.max(0, endTime - now);
}
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
