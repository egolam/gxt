import { exactIcon, guessIcon } from "@/helpers/game/icons";
import { inverse } from "@/helpers/game/inverse";
import { useGame } from "@/hooks/use-game";
import { useParams } from "next/navigation";
import { Marker, Polyline } from "react-leaflet";
import { Fragment } from "react/jsx-runtime";

export const HistoryMultiMarkers = () => {
  const { gameid } = useParams();
  const { data } = useGame(gameid as string);

  return data?.game.gameRounds.map((round) => {
    const guessLocation = inverse(round.gx as number, round.gy as number);
    const exactLocation = inverse(
      round.locations.ex as number,
      round.locations.ey as number,
    );

    return (
      <Fragment key={round.round}>
        {round.gx && round.gy && (
          <Marker
            zIndexOffset={1}
            position={[guessLocation.lat, guessLocation.lng]}
            icon={guessIcon}
            interactive={false}
          />
        )}

        <Marker
          position={[exactLocation.lat, exactLocation.lng]}
          icon={exactIcon}
          interactive={false}
        />
        {round.gx && round.gy && (
          <Polyline
            pathOptions={{ color: "#fa9549" }}
            positions={[
              [exactLocation.lat, exactLocation.lng],
              [guessLocation.lat, guessLocation.lng],
            ]}
            interactive={false}
          />
        )}
      </Fragment>
    );
  });
};
