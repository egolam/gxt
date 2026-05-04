import { LatLngBoundsExpression, LatLngExpression } from "leaflet";

export const MAX_ZOOM = 5;
export const MIN_ZOOM = 0;
export const DEFAULT_ZOOM = 0;
export const CENTER_POS: LatLngExpression = [
  -128, 110.83093333333333333333333333333,
];
export const BOUNDS: LatLngBoundsExpression = [
  [0, 0],
  [-256, 256],
];
export const MAX_BOUNDS: LatLngBoundsExpression = [
  [0, 0],
  [-256, 256],
];
export const TILE_SIZE = 256;
