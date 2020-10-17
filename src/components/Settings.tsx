import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SettingsContext } from "../contexts/SettingsContext";
import { isPositionSet } from "../util/isPositionSet";

const Settings: React.FC = () => {
  const {
    homeLocation,
    setHomeLocation,
    permittedTravelDistance,
    setPermittedTravelDistance,
  } = useContext(SettingsContext);

  const setHomeLocationToCurrentPosition = () =>
    navigator.geolocation.getCurrentPosition(setHomeLocation, console.error, {
      enableHighAccuracy: true,
    });

  const isHomeLocationSet = isPositionSet(homeLocation);

  return (
    <>
      <h1>Settings</h1>
      <div>
        Home location:
        {isHomeLocationSet ? " set " : " not set "}
        <button onClick={setHomeLocationToCurrentPosition}>
          Set to current location
        </button>
      </div>
      <div>
        Permitted travel distance:{" "}
        <input
          type="number"
          value={permittedTravelDistance}
          onChange={({ target: { value } }) =>
            setPermittedTravelDistance(Number(value))
          }
        />
      </div>
      {isHomeLocationSet && <Link to="/">Save</Link>}
    </>
  );
};

export default Settings;
