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
import constants from './components/constants';
import rootReducer from "./rootReducer";

const muiTheme = getMuiTheme({
  borderRadius: 0,
  palette: {
    primary1Color: constants.primaryColor,
    primary3Color: constants.darkBackground,
    accent1Color: constants.accent1Color,
    accent3Color: '#FFFFFF',
    canvasColor: constants.canvasColor,
    textColor: '#f3f5f8',
  },
  table: {
    backgroundColor: constants.canvasColor,
  },
  tableHeaderColumn: {
    height: 55,
  },
  tableRow: {
    stripeColor: constants.stripeColor,
    borderColor: constants.highlightColor,
    height: 40,
  },
  tableRowColumn: {
    height: 40,
  },
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
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
