import haversine from "haversine";
import React from "react";
import { usePosition } from "use-position";

type LongLat = Pick<Coordinates, "longitude" | "latitude">;

interface DistanceProps {
  homeLongLat: LongLat;
}

const convertToLongLat = (
  position: ReturnType<typeof usePosition>
): LongLat => ({
  longitude: Number(position.longitude),
  latitude: Number(position.latitude),
});

const Distance: React.FC<DistanceProps> = ({ homeLongLat }) => {
  const currentLongLat = convertToLongLat(
    usePosition(true, {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 5000,
    })
  );
  const distance =
    haversine(homeLongLat, currentLongLat, {
      unit: "meter",
    }) / 1000;
  return (
    <>
      <div>Distance: {distance.toFixed(2)} km</div>
    </>
  );
};

export default Distance;
