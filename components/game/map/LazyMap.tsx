"use client";

import { Phase } from "@/types/types";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/game/map/Map"), {
  ssr: false,
  loading: () => <div className="flex-1 bg-red-500 animate-pulse" />,
});
interface Props {
  guessXY: [number, number] | null;
  exactXY: [number, number] | null;
  phase: Phase;
}
export function LazyMap({ exactXY, guessXY, phase }: Props) {
  return <Map exactXY={exactXY} guessXY={guessXY} phase={phase} />;
}
