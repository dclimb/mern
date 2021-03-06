import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/edit-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link
        to="/edit-education"
        href="add-education.html"
        className="btn btn-light"
      >
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
