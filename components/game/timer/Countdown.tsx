"use client";

import { getRemainingMs } from "@/helpers/game/time";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type Props = {
  startedAt: Date;
  duration: number;
  serverNow: number;
  onFinish?: () => void;
};

export default function CountdownTimer({
  startedAt,
  duration,
  serverNow,
  onFinish,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);

  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync server/client clocks
  useEffect(() => {
    offsetRef.current = serverNow - Date.now();
  }, [serverNow]);

  useEffect(() => {
    if (!mounted) return;

    const startedAtMs = new Date(startedAt).getTime();

    function tick() {
      const now = Date.now() + offsetRef.current;

      const ms = getRemainingMs({
        startedAtMs,
        durationSec: duration,
        nowMs: now,
      });

      setRemainingMs(ms);

      // Fire once
      if (ms <= 0 && !finishedRef.current) {
        finishedRef.current = true;
        onFinish?.();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [mounted, startedAt, duration, onFinish]);

  if (!mounted) return null;

  const totalSeconds = Math.floor(remainingMs / 1000);

  const seconds = totalSeconds % 60;

  return (
    <div
      className={cn(
        "font-bold w-16 text-white text-2xl tabular-nums leading-none flex items-center justify-center bg-ficsit-secondary h-full relative",
      )}
    >
      <p className="">{seconds.toString().padStart(2, "0")}</p>
     
    </div>
  );
}
