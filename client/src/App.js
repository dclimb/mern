import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Signin from './components/auth/Signin';


class App extends Component {
  render() {
    return (
      <Provider store= {store}>
        <Router>
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
