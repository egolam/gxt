import { getGameCoordinates } from "@/helpers/transform";
import { useGame } from "@/hooks/use-game";
import { useGameStore } from "@/stores/game";
import { useParams } from "next/navigation";
import { useMapEvents } from "react-leaflet";

export const MapEvents = () => {
  const setGuessXY = useGameStore((state) => state.setGuessXY);
  const { gameslug } = useParams();
  const { data, isLoading, isValidating } = useGame(gameslug as string);
  useMapEvents({
    click(e) {
      if (data?.game.phase !== "guessing" && isLoading && isValidating) return;
      const { x, y } = getGameCoordinates(e.latlng);
      setGuessXY([x, y]);
    },
  });
  return null;
};
