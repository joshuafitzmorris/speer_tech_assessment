import React from "react";
import { Switch, Route } from "react-router-dom";
import CallFeed from "../pages/CallFeed/CallFeed.jsx";
import Dialpad from "../pages/Dialpad/Dialpad.jsx";
import Archive from "../pages/Archive/Archive.jsx";
const Routes = () => {
  return (
    <Switch>
      <Route path="/callfeed">
        <CallFeed />
      </Route>
      <Route path="/dialpad">
        <Dialpad />
      </Route>
      <Route path="/archive">
        <Archive />
      </Route>
      <Route path="/">
        <CallFeed />
      </Route>
    </Switch>
  );
};

export default Routes;
