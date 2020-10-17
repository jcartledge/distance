import React, { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";
import { isPositionSet } from "../util/isPositionSet";
import Distance from "./Distance";
import NoHomeLocation from "./NoHomeLocation";

const DistanceContainer: React.FC = () => {
  const { homeLocation } = useContext(SettingsContext);
  return isPositionSet(homeLocation) ? <Distance homeLocation={homeLocation} /> : <NoHomeLocation />;
}

export default DistanceContainer;