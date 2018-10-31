import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "./TextFieldGroup";
import TextAreaFieldGroup from "./TextAreaFieldGroup";
import SelectListGroup from "./SelectListGroup";
import InputGroup from "./InputGroup";

import isEmpty from "../../validation/isEmpty";

import { editExperience } from "../../actions/profileActions";

class EditExperience extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      company: "",
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
      console.log(nextProps.errors);
      console.log(prevState);

      return prevState;
    }
    return null;
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  onCheck = e => {
    const current = !this.state.current;
    if (current) {
      const d = new Date();
      const month =
        d.getMonth().toString().length == 1 ? "0" + d.getMonth() : d.getMonth();
      const day =
        d.getDay().toString().length == 1 ? "0" + d.getDay() : d.getDay();
      console.log(day);
      const to = d.getFullYear() + "-" + month + "-" + day;
      console.log(to);
      this.setState({ to, current });
    } else {
      this.setState({ current });
    }
  };

  onSubmit = e => {
    if (this.state.current) {
      this.setState({ to: Date.now() });
    }

    e.preventDefault();

    this.props.editExperience(this.state, this.props.history);
  };

  render() {
    const { errors } = this.props;

    return (
      <div className="edit-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="lead text-center">Edit your profile</h1>
              <form onSubmit={this.onSubmit}>
                <div>Title</div>
                <TextFieldGroup
                  name="title"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  title="Your position at the company"
                />
                <div>Company</div>
                <TextFieldGroup
                  name="company"
                  placeholder="Company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  title="Name of the company"
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

EditExperience.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  editExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { editExperience }
)(withRouter(EditExperience));
