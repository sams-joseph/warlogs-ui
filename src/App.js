import React from "react";
import { Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import PropTypes from "prop-types";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LogOverviewPage from "./pages/LogOverviewPage";

const muiTheme = getMuiTheme({
  borderRadius: 0,
  palette: {
    primary1Color: "#009BFF",
    primary2Color: "#00D2FF",
    primary3Color: "#4C555C",
    accent1Color: "#009BFF",
    accent2Color: "#4C555C",
    accent3Color: "#f3f5f8",
    canvasColor: "#262A33",
    textColor: "#f3f5f8",
    borderColor: "#4C555C"
  },
  tabs: {
    backgroundColor: "#22262e"
  },
  table: {
    backgroundColor: "#20242B"
  },
  tableHeaderColumn: {
    height: 55
  },
  tableRow: {
    stripeColor: "#282D36",
    borderColor: "#2E333D",
    height: 40
  },
  tableRowColumn: {
    height: 40
  },
  inkBar: {
    backgroundColor: "#009BFF"
  }
});

const App = ({ location }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Navbar />
    <Route path="/" location={location} exact component={HomePage} />
    <Route
      path="/log-overview/:id"
      location={location}
      exact
      component={LogOverviewPage}
    />
    <footer style={{ width: "100%", height: "200px", background: "#16191C" }} />
  </MuiThemeProvider>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
