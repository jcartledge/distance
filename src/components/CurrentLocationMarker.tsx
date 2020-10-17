import React, { useContext } from "react";
import { FiUser } from "react-icons/fi";
import { Marker } from "react-map-gl";
import { MapContext } from "../contexts/MapContext";

const CurrentLocationMarker: React.FC = () => {
  const {
    currentLongLat: { latitude, longitude },
  } = useContext(MapContext);

  return isNaN(latitude) ? null : (
    <Marker latitude={latitude} longitude={longitude}>
      <FiUser />
    </Marker>
  );
};

export default CurrentLocationMarker;
