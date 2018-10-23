import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Signin from "./components/auth/Signin";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/common/CreateProfile";

import "./App.css";

if (localStorage.jwtToken) {
  //SAVE TOKEN IN LOCALSTORAGE
  setAuthToken(localStorage.jwtToken);
  //SET CURRENT USER
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  //CHECK FOR EXPIRED TOKEN
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = "/landing";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path={"/"} component={Landing} />
            <Route exact path={"/signin"} component={Signin} />
            <Route exact path={"/login"} component={Login} />
            <Switch>
              <PrivateRoute exact path={"/dashboard"} component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path={"/create-profile"}
                component={CreateProfile}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
