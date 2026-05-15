import { inverse } from "@/helpers/game/inverse";
import { useGame } from "@/hooks/use-game";
import { LatLngBoundsExpression } from "leaflet";
import { useParams } from "next/navigation";
import { Polyline, useMap } from "react-leaflet";

export default function ZoomToBounds() {
  const map = useMap();
  const { gameid } = useParams();
  const { data } = useGame(gameid as string);
  const guessLocation = inverse(
    data?.game.gameRounds?.[0].gx as number,
    data?.game.gameRounds?.[0].gy as number,
  );

  const exactLocation = inverse(
    data?.game.gameRounds?.[0].locations.ex as number,
    data?.game.gameRounds?.[0].locations.ey as number,
  );

  let bounds: LatLngBoundsExpression;

  if (!data?.game.gameRounds[0].gx || !data?.game.gameRounds[0].gy) {
    bounds = [[exactLocation.lat, exactLocation.lng]];
  } else {
    bounds = [
      [exactLocation.lat, exactLocation.lng],
      [guessLocation.lat, guessLocation.lng],
    ];
  }

  map.fitBounds(bounds, {
    padding: [96, 96],
    animate: true,
    duration: 0.3,
  });

  return (
    <>
      {data?.game.gameRounds[0].gx && data?.game.gameRounds[0].gy && (
        <Polyline
          pathOptions={{
            color: "#fa9549",
          }}
          positions={bounds}
          interactive={false}
        />
      )}
    </>
  );
}
