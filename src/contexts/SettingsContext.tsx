import React, { useState } from "react";
import { Builder } from "../util/Builder";

export type NullablePosition = Position | null;

interface SettingsContextValue {
  homeLocation: NullablePosition;
  setHomeLocation: (position: Position) => void;
  permittedTravelDistance: number;
  setPermittedTravelDistance: (distance: number) => void;
}

const buildSettingsContextValue: Builder<SettingsContextValue> = (
  overrides: Partial<SettingsContextValue> = {}
) => ({
  homeLocation: null,
  setHomeLocation: (_) => null,
  permittedTravelDistance: 0,
  setPermittedTravelDistance: (_) => null,
  ...overrides,
});

export const SettingsContext = React.createContext<SettingsContextValue>(
  buildSettingsContextValue()
);

const SettingsContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [homeLocation, setHomeLocation] = useState<NullablePosition>(null);
  const [permittedTravelDistance, setPermittedTravelDistance] = useState(5);
  return (
    <SettingsContext.Provider
      value={{
        homeLocation,
        setHomeLocation,
        permittedTravelDistance,
        setPermittedTravelDistance,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
