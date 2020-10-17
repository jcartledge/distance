import "mapbox-gl/dist/mapbox-gl.css";
import React, { useContext, useState } from "react";
import ReactMapGL, { ContextViewportChangeHandler } from "react-map-gl";
import { MapContext } from "../contexts/MapContext";
import CurrentLocationMarker from "./CurrentLocationMarker";
import HomeMarker from "./HomeMarker";

const Map: React.FC = () => {
  const { homeLongLat, setHomeLongLat } = useContext(MapContext);
  const { latitude, longitude } = homeLongLat ?? { latitude: 0, longitude: 0 };
  const [viewport, setViewport] = useState({
    width: 400,
    height: 300,
    latitude,
    longitude,
    zoom: 12,
  });

  const viewportChanged: ContextViewportChangeHandler = (nextViewport) => {
    setHomeLongLat({
      longitude: nextViewport.longitude,
      latitude: nextViewport.latitude,
    });
    setViewport(nextViewport);
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={viewportChanged}
    >
      <HomeMarker />
      <CurrentLocationMarker />
    </ReactMapGL>
  );
};

export default Map;
