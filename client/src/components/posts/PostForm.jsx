import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";

import { addPost } from "../../actions/postActions";

class PostForm extends React.Component {
  constructor() {
    super();
    this.state = {
      commentText: "",
      errors: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    prevState.errors = nextProps.errors;
    return prevState;
  }

  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      commentText: this.state.commentText,
      user: this.props.auth.user.name,
      avatar: ""
    };
    this.setState({
      commentText: ""
    });

    this.props.addPost(newPost);
  };

  onChange = e => {
    const commentText = e.target.value;
    this.setState({ commentText });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  name="commentText"
                  value={this.state.commentText}
                  placeholder="Write a post"
                  error={this.state.errors.text}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
PostForm.propTypes = {
  posts: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
