import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileByHandle } from "../../actions/profileActions";

class ProfileItem extends React.Component {
  // viewProfile = e => {
  //   this.props.getProfileByHandle(e.target.value);
  // };
  render() {
    const profile = this.props.profile;

    const skillSet = profile.skills.map((skill, index) => (
      <li className="list-group-item" key={index}>
        <i className="fa fa-check pr-1" />
        {skill}
      </li>
    ));

    console.log(profile);
    // return <h1>{this.props}</h1>;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              className="rounded-circle"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              alt=""
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status} at {profile.company}
            </p>
            <p>{profile.user.location}</p>
            <Link
              to={`/profile/${profile.handle}`}
              className="btn btn-info"
              onClick={this.viewProfile}
            >
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <h4>Skill Set</h4>
            <ul className="list-group">{skillSet}</ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired
};

export default connect(
  null,
  { getProfileByHandle }
)(ProfileItem);
