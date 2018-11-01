import React from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
// import classnames from "classnames";

import { getProfileByHandle } from "../../actions/profileActions";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import Credentials from "./Credentials";
import ProfileGithub from "./ProfileGithub";

class Profile extends React.Component {
  componentDidMount() {
    this.props.getProfileByHandle(this.props.match.params.handle);
  }
  render() {
    const { profile } = this.props.profile;
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-6">
                  <a
                    href="profiles.html"
                    className="btn btn-light mb-3 float-left"
                  >
                    Back To Profiles
                  </a>
                </div>
                <div className="col-6" />
              </div>
              <ProfileHeader data={profile} />
              <ProfileAbout data={profile} />
              <Credentials data={profile} />
              <ProfileGithub />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
