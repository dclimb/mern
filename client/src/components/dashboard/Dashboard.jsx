import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProfile } from "../../actions/profileActions";
import { deleteAccount } from "../../actions/authActions";

import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { loading, profile } = this.props.profile;
    let dashboardContent;
    if (profile === null || profile.loading) {
      console.log(profile);
      dashboardContent = <h1>Loading</h1>;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <h1>Welcome {user.name}</h1>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div className="mb-6">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  this.props.deleteAccount();
                }}
              >
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <h1>Welcome {user.name}</h1>
            <p>You haven't yet created your profile</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create profile
            </Link>
          </div>
        );
      }
    }

    return <div className="dashboardContainer">{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfile, deleteAccount }
)(Dashboard);
