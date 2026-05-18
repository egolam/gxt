"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/game/map/Map"), {
  ssr: false,
  loading: () => <div className="flex-1 bg-background animate-pulse" />,
});

export function LazyMap() {
  return <Map />;
}
