"use client";

import { useEffect, useRef, useState } from "react";
import { getRemainingMs } from "@/helpers/time";

type Props = {
  startedAt: string; // ISO string
  duration: number; // seconds
  serverNow: number; // timestamp from server
};

export default function CountdownTimer({
  startedAt,
  duration,
  serverNow,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);

  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // ✅ Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Calculate server-client offset ONCE
  useEffect(() => {
    const clientNow = Date.now();
    offsetRef.current = serverNow - clientNow;
  }, [serverNow]);

  // ✅ Main timer loop (RAF > setInterval)
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

      if (ms > 0) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, startedAt, duration]);

  if (!mounted) return null;


  const totalSeconds = Math.floor(remainingMs / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{formatted}</div>
  );
}
