import { getGameCoordinates } from "@/helpers/game/transform";
import { useGame } from "@/hooks/use-game";
import { useGameStore } from "@/stores/game";
import { useParams } from "next/navigation";
import { useMapEvents } from "react-leaflet";

export const MapEvents = () => {
  const setGuessXY = useGameStore((state) => state.setGuessXY);
  const { gameid } = useParams();
  const { data, isLoading, isValidating } = useGame(gameid as string);
  useMapEvents({
    click(e) {
      if (data?.game.phase !== "guessing" && isLoading && isValidating) return;
      const { x, y } = getGameCoordinates(e.latlng);
      setGuessXY([x, y]);
    },
  });
  return null;
};
