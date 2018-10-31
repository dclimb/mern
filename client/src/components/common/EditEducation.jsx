import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "./TextFieldGroup";
import TextAreaFieldGroup from "./TextAreaFieldGroup";
import SelectListGroup from "./SelectListGroup";
import InputGroup from "./InputGroup";

import isEmpty from "../../validation/isEmpty";

import { editEducation } from "../../actions/profileActions";

class EditEducation extends React.Component {
  constructor() {
    super();
    this.state = {
      school: "",
      degree: "",
      fielOfEducation: "",
      school: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("prev", prevState);
    console.log("next", nextProps);
    console.log(isEmpty(nextProps.errors));

    if (
      (!isEmpty(nextProps.errors) || !isEmpty(nextProps.from)) &&
      prevState.current == false &&
      prevState.to == ""
    ) {
      prevState.errors = nextProps.errors;
      prevState.errors.to = "Form field required";

      return prevState;
    }
    return null;
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    const current = !this.state.current;
    // if (current) {
    //   const d = new Date();
    //   const month =
    //     d.getMonth().toString().length == 1 ? "0" + d.getMonth() : d.getMonth();
    //   const day =
    //     d.getDay().toString().length == 1 ? "0" + d.getDay() : d.getDay();
    //   console.log(day);
    //   const to = d.getFullYear() + "-" + month + "-" + day;
    //   console.log(to);
    //   this.setState({ to, current });
    // } else {
    this.setState({ current });
    // }
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.editEducation(this.state, this.props.history);
  };

  render() {
    const { errors } = this.props;
    console.log(this.props);
    return (
      <div className="edit-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="lead text-center">Edit your profile</h1>
              <form onSubmit={this.onSubmit}>
                <div>School</div>
                <TextFieldGroup
                  name="school"
                  placeholder="School"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                  title="Name of the school"
                />
                <div>Degree</div>
                <TextFieldGroup
                  name="degree"
                  placeholder="Degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                  title="Name of the degree"
                />

                <div>Field Of Eduaction</div>
                <TextFieldGroup
                  name="fieldOfEducation"
                  placeholder="Degree"
                  value={this.state.fieldOfEducation}
                  onChange={this.onChange}
                  error={errors.fieldOfEducation}
                  title="Name the field of education"
                />

                <div>Location</div>
                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  title="Location of the company"
                />
                <div>From date</div>
                <TextFieldGroup
                  name="from"
                  type="date"
                  placeholder="From date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  title="Date you started working there"
                />
                <div>To date</div>
                <TextFieldGroup
                  name="to"
                  type="date"
                  placeholder="To date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  title="Date you finish working there"
                  disabled={this.state.current}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    name="current"
                    id="current"
                    onChange={this.onCheck}
                    value={this.state.current}
                    className="form-check-input"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <div className="mt-4">Description</div>
                <TextAreaFieldGroup
                  name="description"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  title="Descritipon about the position"
                />
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditEducation.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  editEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { editEducation }
)(withRouter(EditEducation));
