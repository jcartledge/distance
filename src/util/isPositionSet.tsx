import { NullablePosition } from "../contexts/SettingsContext";


export const isPositionSet = (
  position: NullablePosition
): position is Position => {
  return position !== null;
};
