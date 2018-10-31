import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile, getProfile } from "./actions/profileActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Signin from "./components/auth/Signin";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/common/CreateProfile";
import EditProfile from "./components/common/EditProfile";
import EditExperience from "./components/common/EditExperience";
import EditEducation from "./components/common/EditEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";

import "./App.css";

if (localStorage.jwtToken) {
  //SAVE TOKEN IN LOCALSTORAGE
  setAuthToken(localStorage.jwtToken);
  //SET CURRENT USER
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  console.log("store dispatch");
  store.dispatch(getProfile());
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
            <Route exact path={"/profile/:handle"} component={Profile} />
            <Route exact path={"/profiles"} component={Profiles} />
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
            <Switch>
              <PrivateRoute
                exact
                path={"/edit-profile"}
                component={EditProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path={"/edit-experience"}
                component={EditExperience}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path={"/edit-education"}
                component={EditEducation}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path={"/feed"} component={Posts} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
