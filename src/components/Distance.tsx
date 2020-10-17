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

const Distance: React.FC<DistanceProps> = ({ homeLongLat }) => {
  const currentLongLat = convertToLongLat(
    usePosition(true, {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 5000,
    })
  );
  const distance = haversine(homeLongLat, currentLongLat, {
    unit: "meter",
  });
  return (
    <>
      <div>Distance: {distance}</div>
      <Debug label="home" coords={homeLongLat} />
      <Debug label="current" coords={currentLongLat} />
    </>
  );
};

export default Distance;
