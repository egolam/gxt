import { exactIcon, guessIcon } from "@/helpers/game/icons";
import { inverse } from "@/helpers/game/inverse";
import { useGame } from "@/hooks/use-game";
import { useGameStore } from "@/stores/game";
import { useParams } from "next/navigation";
import { Marker } from "react-leaflet";
import ZoomToBounds from "./ZoomToBounds";
import ResetMapZoom from "./ResetMapZoom";
import { HistoryMultiMarkers } from "./HistoryMultiMarkers";

export const IconManager = () => {
  const { gameid } = useParams();
  const { data } = useGame(gameid as string);

  const guessXY = useGameStore((state) => state.guessXY);
  const guessLocation =
    data?.game.phase === "round_end"
      ? inverse(
          data.game.gameRounds?.[0].gx as number,
          data.game.gameRounds?.[0].gy as number,
        )
      : inverse(guessXY?.[0] as number, guessXY?.[1] as number);

  const exactLocation = inverse(
    data?.game.gameRounds?.[0].locations.ex as number,
    data?.game.gameRounds?.[0].locations.ey as number,
  );

  if (data?.game.phase === "game_end") return <HistoryMultiMarkers />;

  return (
    <>
      {data?.game.phase === "round_end" ? (
        <>
          <Marker
            icon={exactIcon}
            position={[exactLocation.lat, exactLocation.lng]}
            interactive={false}
          />
          <ZoomToBounds />
          {data.game.gameRounds[0].gx && data.game.gameRounds[0].gy && (
            <Marker
              icon={guessIcon}
              position={[guessLocation.lat, guessLocation.lng]}
              interactive={false}
            />
          )}
        </>
      ) : !guessXY && data?.game.phase === "guessing" ? (
        <ResetMapZoom />
      ) : (
        <Marker
          icon={guessIcon}
          position={[guessLocation.lat, guessLocation.lng]}
          interactive={false}
        />
      )}
    </>
  );
};
