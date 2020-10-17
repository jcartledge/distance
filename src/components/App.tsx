import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SettingsContextProvider from "../contexts/SettingsContext";
import DistanceContainer from "./DistanceContainer";
import Settings from "./Settings";

function App() {
  return (
    <div className="App">
      <SettingsContextProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <DistanceContainer />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
          </Switch>
        </Router>
      </SettingsContextProvider>
    </div>
  );
}

export default App;
