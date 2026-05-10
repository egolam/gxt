import { inverse } from "@/helpers/inverse";
import { useGame } from "@/hooks/use-game";
import { LatLngBoundsExpression } from "leaflet";
import { useParams } from "next/navigation";
import { Polyline, useMap } from "react-leaflet";

export default function ZoomToBounds() {
  const map = useMap();
  const { gameslug } = useParams();
  const { data } = useGame(gameslug as string);
  const guessLocation = inverse(
    data?.game.gameRounds?.[0].guessX as number,
    data?.game.gameRounds?.[0].guessY as number,
  );

  const exactLocation = inverse(
    data?.game.gameRounds?.[0].location.x as number,
    data?.game.gameRounds?.[0].location.y as number,
  );

  let bounds: LatLngBoundsExpression;

  if (!data?.game.gameRounds[0].guessX || !data?.game.gameRounds[0].guessY) {
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
      {data?.game.gameRounds[0].guessX && data?.game.gameRounds[0].guessY && (
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
