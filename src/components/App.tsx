import React from "react";
import MapContextProvider from "../contexts/MapContext";
import MapContainer from "./MapContainer";

function App() {
  return (
    <div className="App">
      <MapContextProvider>
        <MapContainer />
      </MapContextProvider>
    </div>
  );
}

export default App;
