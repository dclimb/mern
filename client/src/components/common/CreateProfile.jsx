import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TextFieldGroup from "./TextFieldGroup";
import TextAreaFieldGroup from "./TextAreaFieldGroup";
import SelectListGroup from "./SelectListGroup";
import InputGroup from "./InputGroup";

import { setProfile } from "../../actions/profileActions";

class CreateProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      displaySocialInputs: false,
      bio: "",
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubUserName: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }

  componentDidMount() {}

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps) {
      return { errors: nextProps.errors };
    }
    return null;
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ errors: nextProps.errors });
  // }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newProfile = {
      displaySocialInputs: false,
      bio: this.state.bio,
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubUserName: this.state.githubUserName,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.Youtube,
      instagram: this.state.instagram
    };
    this.props.setProfile(newProfile, this.props.history);
  };

  render() {
    const { errors, displaySocialInputs } = this.state;
    const options = [
      { label: "Select profesional status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Teacher", value: "Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    let socialInput;
    if (displaySocialInputs) {
      socialInput = (
        <div>
          <InputGroup
            placeholder="Twitter profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Youtube channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
          <InputGroup
            placeholder="Facebook profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
        </div>
      );
    }
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="lead text-center">Create your profile</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="handle"
                  placeholder="Handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  title="A unique handle for your URL"
                />
                <SelectListGroup
                  name="status"
                  placeholder="Status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  title="Carreer status"
                  options={options}
                />
                <TextFieldGroup
                  name="company"
                  placeholder="Company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  title="Name the company you are currently working for"
                />
                <TextFieldGroup
                  name="website"
                  placeholder="Website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  title="Presonal website"
                />
                <TextFieldGroup
                  name="skills"
                  placeholder="Skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  title="Introduce your personal skills coma separated"
                />
                <TextAreaFieldGroup
                  name="bio"
                  placeholder="Website"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  title="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                  >
                    Add Social Network
                  </button>
                  {socialInput}
                  <input
                    type="submit"
                    value="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { setProfile }
)(withRouter(CreateProfile));
