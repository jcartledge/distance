import haversine from "haversine";
import React from "react";
import { usePosition } from "use-position";

interface DistanceProps {
  homeLocation: Position;
}

const convertToCoords = (
  position: ReturnType<typeof usePosition>
): Pick<Coordinates, "longitude" | "latitude"> => ({
  longitude: Number(position.longitude),
  latitude: Number(position.latitude),
});

const Distance: React.FC<DistanceProps> = ({ homeLocation }) => {
  const currentLocation = convertToCoords(
    usePosition(true, {
      enableHighAccuracy: true,
      timeout: 0,
      maximumAge: Infinity,
    })
  );
  const distance = haversine(
    homeLocation.coords,
    currentLocation as Coordinates
  );
  return <>Distance: {distance}</>;
};

export default Distance;
