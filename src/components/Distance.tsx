import haversine from "haversine";
import React from "react";
import { usePosition } from "use-position";

interface DistanceProps {
  homeLocation: Position;
}

type LongLat = Pick<Coordinates, "longitude" | "latitude">;

const convertToCoords = (
  position: ReturnType<typeof usePosition>
): LongLat => ({
  longitude: Number(position.longitude),
  latitude: Number(position.latitude),
});

interface DebugProps {
  label: string;
  coords: LongLat;
}

const Debug: React.FC<DebugProps> = ({
  label,
  coords: { longitude, latitude },
}) => (
  <div>
    {label} - Long:{longitude} - Lat:{latitude}
  </div>
);

const Distance: React.FC<DistanceProps> = ({ homeLocation }) => {
  const currentLocation = convertToCoords(
    usePosition(true, {
      enableHighAccuracy: true,
      timeout: 0,
      maximumAge: Infinity,
    })
  );
  const distance = haversine(homeLocation.coords, currentLocation, {
    unit: "meter",
  });
  return (
    <>
      <div>Distance: {distance}</div>
      <Debug label="home" coords={homeLocation.coords} />
      <Debug label="current" coords={currentLocation} />
    </>
  );
};

export default Distance;
