import { getGameCoordinates } from "@/helpers/transform";
import { useGameStore } from "@/stores/game";
import { useMapEvents } from "react-leaflet";

export const MapEvents = () => {
  const setGuessXY = useGameStore((state) => state.setGuessXY);
  useMapEvents({
    click(e) {
      const { x, y } = getGameCoordinates(e.latlng);
      setGuessXY([x, y]);
    },
  });
  return null;
};
