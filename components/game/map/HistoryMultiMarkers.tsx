import { exactIcon, guessIcon } from "@/helpers/icons";
import { inverse } from "@/helpers/inverse";
import { useGame } from "@/hooks/use-game";
import { useParams } from "next/navigation";
import { Marker, Polyline } from "react-leaflet";
import { Fragment } from "react/jsx-runtime";

export const HistoryMultiMarkers = () => {
  const { gameslug } = useParams();
  const { data } = useGame(gameslug as string);

  return data?.game.gameRounds.map((round) => {
    const guessLocation = inverse(
      round.guessX as number,
      round.guessY as number,
    );
    const exactLocation = inverse(round.location.x, round.location.y);

    return (
      <Fragment key={round.round}>
        {round.guessX && round.guessY && (
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
        {round.guessX && round.guessY && (
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
