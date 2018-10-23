import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser, logoutUser} from './actions/authActions'


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Signin from './components/auth/Signin';

import './App.css';

if (localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime ) {
    store.dispatch(logoutUser())
    window.location.href = '/landing'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store= {store}>
        <Router >
          <div className="App">
            <Navbar />
            <Route exact path={'/'} component = {Landing} />
            <Route exact path={'/signin'} component = {Signin} />
            <Route exact path={'/login'} component = {Login} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
