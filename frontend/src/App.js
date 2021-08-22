import React, { useEffect, useState } from "react";
import Index from "./containers";
import Profile from "./containers/Profile/Profile.js";

// Redux
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import { useDispatch } from "react-redux";
import { fetchUser } from "./actions/auth";
import { setAuthToken } from "./api";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("key")) {
      setAuthToken(localStorage.getItem("key"));
      dispatch(fetchUser());
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/edit" component={Profile} />
      </Switch>
    </Router>
  );
}
