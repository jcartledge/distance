import React, { useContext } from "react";
import { FiHome } from "react-icons/fi";
import { Marker } from "react-map-gl";
import { MapContext } from "../contexts/MapContext";

const HomeMarker = () => {
  const { homeLongLat } = useContext(MapContext);
  const { latitude, longitude } = homeLongLat ?? { latitude: 0, longitude: 0 };

  return (
    <Marker latitude={latitude} longitude={longitude}>
      <FiHome />
    </Marker>
  );
};

export default HomeMarker;
