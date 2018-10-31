import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import "moment-timezone";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  onDelete = e => {
    console.log(e.target.value);
    this.props.deleteExperience(e.target.value);
  };
  render() {
    const { experience } = this.props.profile.profile;
    const tableContent = experience.map(row => (
      <tr key={row._id}>
        <th>{row.title}</th>
        <th>{row.company}</th>
        <th>{row.location}</th>

        <th>
          <Moment format="YYYY-MM">{row.from}</Moment> {" / "}
          <Moment format="YYYY-MM">{row.to}</Moment>
        </th>
        <th>
          <button
            value={row._id}
            className="btn btn-lg btn-danger"
            onClick={this.onDelete}
          >
            Delete
          </button>
        </th>
      </tr>
    ));
    console.log(this.props.experience);
    return (
      <div className="experience-container mt-10">
        <h1>Experience</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>From - To</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { deleteExperience }
)(Experience);
