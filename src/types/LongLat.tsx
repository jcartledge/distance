export type LongLat = Pick<Coordinates, "longitude" | "latitude">;
export type NullableLongLat = LongLat | null;

export const isLongLatSet = (
  longLat: NullableLongLat
): longLat is LongLat => {
  return longLat !== null;
};
