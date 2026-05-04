import { Phase } from "@/types/types";
import { LatLngBoundsExpression } from "leaflet";
import { Polyline, useMap } from "react-leaflet";

interface Props {
  guessXY: { lat: number; lng: number };
  exactXY: { lat: number; lng: number };
  phase: Phase;
}

export default function ZoomToBounds({ exactXY, guessXY, phase }: Props) {
  const map = useMap();

  let bounds: LatLngBoundsExpression;

  if (!guessXY) {
    bounds = [[exactXY.lat, exactXY.lng]];
  } else {
    bounds = [
      [exactXY.lat, exactXY.lng],
      [guessXY.lat, guessXY.lng],
    ];
  }

  map.fitBounds(bounds, {
    padding: [96, 96],
    animate: true,
    duration: 0.3,
  });

  return (
    <Polyline
      pathOptions={{
        color: "#fa9549",
      }}
      positions={bounds}
      interactive={false}
    />
  );
}
