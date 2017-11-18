import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";

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

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <BrowserRouter>
      <Provider store={store}>
        <Route component={App} />
      </Provider>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
