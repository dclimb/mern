import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Moment from "react-moment";

class Credentials extends React.Component {
  render() {
    const { data } = this.props;
    let experience, education;
    if (data === null) {
      experience = <h1>Loading</h1>;
      education = <h1>Loading</h1>;
    } else {
      console.log("oianfaoi");
      experience = data.experience.map((item, index) => (
        <li className="list-group-item" key={index}>
          <h4>{item.company}</h4>

          <p>
            <strong>Position:</strong> {item.title}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {item.description ? item.description : null}
          </p>
        </li>
      ));
      education = data.education.map((item, index) => (
        <li className="list-group-item">
          <h4>{item.school}</h4>
          <p>
            - <Moment format="YYYY MMM">{item.from}</Moment> to{" "}
            {item.current ? (
              "now"
            ) : (
              <Moment format="YYYY MMM">{item.to}</Moment>
            )}
          </p>{" "}
          <p>
            <strong>Degree: </strong>
            {item.degree}
          </p>
          <p>
            <strong>Field Of Study: </strong>
            {item.fieldOfEducation}
          </p>
          <p>
            <p>
              <strong>Description:</strong>{" "}
              {item.description ? item.description : null}
            </p>
          </p>
        </li>
      ));
    }
    console.log();

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">
            {experience !== undefined ? experience : null}
          </ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">{education}</ul>
        </div>
      </div>
    );
  }
}

export default Credentials;
