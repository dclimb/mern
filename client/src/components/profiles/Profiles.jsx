import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";
import classnames from "classnames";

class Profiles extends React.Component {
  componentDidMount() {
    console.log("aosif");
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    console.log(this.props.profiles);
    console.log(profiles == null);
    let profilesContent;
    if (loading || profiles == null) {
      profilesContent = <h1>Loading</h1>;
    } else {
      console.log(profiles);
      profilesContent = profiles.map((prof, index) => (
        <ProfileItem key={index} profile={prof} />
      ));
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profilesContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
