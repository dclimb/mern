import React from "react";
// import PropTypes from "prop-types";
// import classnames from "classnames";

class ProfileAbout extends React.Component {
  render() {
    const { data } = this.props;
    let skills;

    if (data != null) {
      skills = data.skills.map((skill, index) => (
        <div className="p-3" key={index}>
          <i className="fa fa-check" /> {skill}
        </div>
      ));
    } else {
      skills = "Loading Skills";
    }
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">
              {data
                ? data.user.name + "'s Bio"
                : "There is no bio available for this user"}
            </h3>
            <p className="lead" />
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
