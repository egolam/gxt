import { guessIcon } from "@/helpers/icons";
import { inverse } from "@/helpers/inverse";
import { useGameStore } from "@/stores/game";
import { Marker } from "react-leaflet";

export const IconManager = () => {
  const guessXY = useGameStore((state) => state.guessXY);
  const location = inverse(guessXY?.[0] as number, guessXY?.[1] as number);

  return !guessXY ? null : (
    <Marker
      icon={guessIcon}
      position={[location.lat, location.lng]}
      interactive={false}
    />
  );
};
