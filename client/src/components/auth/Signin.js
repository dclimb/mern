import React from "react";
import PropTypes from "prop-types";
// import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";

import TextFieldGroup from "../common/TextFieldGroup";

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // getDerivedStateFromProps(nextProps, prevState) {

  // }
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    // const { user } = this.props.auth;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="name"
                  type="text"
                  onChange={this.onChange}
                  value={this.state.name}
                  placeholder="Name"
                  error={errors.name}
                />

                <TextFieldGroup
                  name="email"
                  type="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  placeholder="Email"
                  error={errors.email}
                />

                <TextFieldGroup
                  name="password"
                  type="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  placeholder="Password"
                  error={errors.password}
                />

                <TextFieldGroup
                  name="password2"
                  type="password"
                  onChange={this.onChange}
                  value={this.state.password2}
                  placeholder="Password2"
                  error={errors.password2}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Signin));
