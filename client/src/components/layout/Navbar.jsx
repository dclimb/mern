import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import classnames from "classnames";

import { logoutUser } from "../../actions/authActions";

class Navbar extends React.Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authContent = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-5">
          <Link className="nav-link" to="/feed">
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link onClick={this.onLogout} className="nav-link" to="/">
            Log Out
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            {user.name}
          </Link>
        </li>
      </ul>
    );

    const guestContent = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/signin">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  Developers
                </Link>
              </li>
            </ul>
          </div>
          {isAuthenticated ? authContent : guestContent}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
