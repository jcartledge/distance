import React, { useContext } from "react";
import styled from "styled-components";
import { MapContext } from "../contexts/MapContext";
import { isLongLatSet } from "../types/LongLat";
import Map from "./Map";

const EmptyMap = styled.div`
  width: 400px;
  height: 300px;
  background-color: silver;
`;

const MapContainer: React.FC = () => {
  const {
    homeLongLat,
    setHomeLongLat,
    permittedTravelDistance,
    setPermittedTravelDistance,
    distance,
  } = useContext(MapContext);

  const setHomeLongLatToCurrentPosition = () =>
    navigator.geolocation.getCurrentPosition(
      (position) => setHomeLongLat(position.coords),
      console.error,
      {
        enableHighAccuracy: true,
      }
    );

  const isHomeLongLatSet = isLongLatSet(homeLongLat);
  if (!isHomeLongLatSet) {
    setHomeLongLatToCurrentPosition();
  }

  return (
    <>
      <div>{isHomeLongLatSet ? <Map /> : <EmptyMap />}</div>
      <div>
        Permitted travel distance:{" "}
        <input
          type="number"
          max="50"
          min="1"
          step="1"
          value={permittedTravelDistance}
          onChange={({ target: { value } }) =>
            setPermittedTravelDistance(Number(value))
          }
        />{" "}
        km
        <div>Current distance from home: {distance.toFixed(2)} km</div>
      </div>
    </>
  );
};

export default MapContainer;
