import React from "react";
// import PropTypes from "prop-types";
// import classnames from "classnames";

import { Link } from "react-router-dom";

class ProfileGithub extends React.Component {
  render() {
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        <div className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link to={""} className="text-info" target="_blank">
                  {" "}
                  Repository One
                </Link>
              </h4>
              <p>Repository description</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">Stars: 44</span>
              <span className="badge badge-secondary mr-1">Watchers: 21</span>
              <span className="badge badge-success">Forks: 122</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileGithub;
