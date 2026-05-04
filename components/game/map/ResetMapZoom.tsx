import { CENTER_POS, DEFAULT_ZOOM } from "@/constants/map-settings";
import { useMap } from "react-leaflet";

export default function ResetMapZoom() {
  const map = useMap();
  map.setView(CENTER_POS, DEFAULT_ZOOM, { animate: false });
  return null;
}
