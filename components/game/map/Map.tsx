import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {
  BOUNDS,
  CENTER_POS,
  DEFAULT_ZOOM,
  MAX_BOUNDS,
  MAX_ZOOM,
  MIN_ZOOM,
  TILE_SIZE,
} from "@/constants/map-settings";
import { IconManager } from "./IconManager";
import { Phase } from "@/types/types";
import { MapEvents } from "./MapEvents";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

interface Props {
  guessXY: [number, number] | null;
  exactXY: [number, number] | null;
  phase: Phase;
}

export default function Map({ exactXY, guessXY, phase }: Props) {
  return (
    <MapContainer
      center={CENTER_POS}
      zoom={DEFAULT_ZOOM}
      zoomSnap={1}
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      bounds={BOUNDS}
      maxBounds={MAX_BOUNDS}
      crs={L.CRS.Simple}
      maxBoundsViscosity={1}
      attributionControl={false}
      zoomControl={false}
      className="bg-text/12.5 outline-none flex-1"
    >
      <TileLayer
        url="https://assets.satisguessry.com/mapv3/{z}/{x}/{y}.webp"
        noWrap={true}
        tileSize={TILE_SIZE}
        bounds={BOUNDS}
        className="bg-secondary"
      />
      {phase === "guessing" && <MapEvents />}

      <IconManager exactXY={exactXY} guessXY={guessXY} phase={phase} />
    </MapContainer>
  );
}
