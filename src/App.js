import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import ParsePage from "./pages/ParsePage";

const App = ({ location }) => (
  <div className="container">
    <Route path="/" location={location} exact component={HomePage} />
    <Route path="/upload" location={location} exact component={UploadPage} />
    <Route path="/parse" location={location} exact component={ParsePage} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
