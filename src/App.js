import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./layouts/Login";
import Admin from "./layouts/Admin";
import IndividualClient from "./layouts/IndividualClient";
import { ThemeProvider } from "@material-ui/core";
import AppStore from "./app-store";
import GlobalScreens from "./components/GlobalScreens";
import { ProtectedRoute } from "./ProtectedRoute";
import AppTheme from "./AppTheme";
import "./App.scss";

function App() {
  return (
    <Provider store={AppStore}>
      <ThemeProvider theme={AppTheme}>
        <Router>
          {/* basename={'/dev'} */}
          <Switch>
            <Route
              exact
              path="/"
              component={(props) =>
                localStorage.getItem("access_token") ? (
                  <Redirect to="/admin" />
                ) : (
                  <Login {...props} />
                )
              }
            />

            {/* <Route exact path="/" component={Login} /> */}
            <ProtectedRoute path="/admin" component={Admin} />
            <ProtectedRoute path="/client" component={IndividualClient} />
          </Switch>
          <GlobalScreens />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
