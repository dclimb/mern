import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getProfile } from "../../actions/profileActions";

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { loading, profile } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <h1>Loading</h1>;
    } else {
      if (Object.keys(profile) > 0) {
        //TODO: display profile
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

    return <div class="dashboardContainer">{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Dashboard);
