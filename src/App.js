import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Overview from './components/Log/Overview';

const App = ({ location }) => (
  <div>
    <Navbar />
    <Route path="/" location={location} exact component={HomePage} />
    <Route
      path="/log-overview/:id"
      location={location}
      exact
      component={Overview}
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
