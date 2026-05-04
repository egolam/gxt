import { LatLng } from "leaflet";

export function getGameCoordinates(location: LatLng) {
  const scaleX = 29.296875;
  const scaleY = 29.30078125;

  const x = Math.round((location.lng - 110.83093333) * scaleX);
  const y = Math.round(-(location.lat + 128) * scaleY);

  return { x, y };
}
