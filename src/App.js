import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Log from './components/Log';
import DamageDetails from './components/Log/DamageDetails';

const App = ({ location }) => (
  <div>
    <Navbar />
    <Route path="/" location={location} exact component={HomePage} />
    <Route
      path="/log-overview/:id"
      location={location}
      exact
      component={Log}
    />
    <Route
      path="/damage-details/:id"
      location={location}
      exact
      component={DamageDetails}
    />
    <footer style={{ width: "100%", height: "200px", background: "#16191C" }} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
