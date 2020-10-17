import haversine from "haversine";
import React, { useState } from "react";
import { usePosition } from "use-position";
import { Builder } from "../types/Builder";
import { isLongLatSet, LongLat, NullableLongLat } from "../types/LongLat";

interface MapContextValue {
  homeLongLat: NullableLongLat;
  setHomeLongLat: (longLat: LongLat) => void;
  permittedTravelDistance: number;
  setPermittedTravelDistance: (distance: number) => void;
  currentLongLat: LongLat;
  distance: number;
}

const buildMapContextValue: Builder<MapContextValue> = (
  overrides: Partial<MapContextValue> = {}
) => ({
  homeLongLat: null,
  setHomeLongLat: (_) => null,
  permittedTravelDistance: 0,
  setPermittedTravelDistance: (_) => null,
  currentLongLat: { longitude: 0, latitude: 0 },
  distance: 0,
  ...overrides,
});

const convertPositionToLongLat = (
  position: ReturnType<typeof usePosition>
): LongLat => ({
  longitude: Number(position.longitude),
  latitude: Number(position.latitude),
});

export const MapContext = React.createContext<MapContextValue>(
  buildMapContextValue()
);

const MapContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [homeLongLat, setHomeLongLat] = useState<NullableLongLat>(null);
  const [permittedTravelDistance, setPermittedTravelDistance] = useState(5);
  const currentLongLat = convertPositionToLongLat(
    usePosition(true, {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 5000,
    })
  );
  const distance = isLongLatSet(homeLongLat)
    ? haversine(homeLongLat, currentLongLat, {
        unit: "meter",
      }) / 1000
    : 0;

  return (
    <MapContext.Provider
      value={{
        homeLongLat,
        setHomeLongLat,
        permittedTravelDistance,
        setPermittedTravelDistance,
        currentLongLat,
        distance,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
