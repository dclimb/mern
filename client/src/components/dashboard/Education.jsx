import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import "moment-timezone";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profileActions";

class Education extends React.Component {
  constructor(props) {
    super(props);
  }

  onDelete = e => {
    this.props.deleteEducation(e.target.value);
  };
  render() {
    const { education } = this.props.profile.profile;
    const tableContent = education.map(row => (
      <tr key={row._id}>
        <th>{row.degree}</th>
        <th>{row.school}</th>
        <th>{row.fieldOfEducation}</th>

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

    return (
      <div className="education-container mt-10">
        <h1>Education</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Degree</th>
              <th>School</th>
              <th>Field of education</th>
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

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { deleteEducation }
)(Education);
