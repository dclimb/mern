import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

import { addComment } from "../../actions/postActions";

class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBox: false,
      comment: "",
      id: this.props.post._id,
      errors: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    prevState.errors = nextProps.errors;
    console.log(prevState);
    console.log(nextProps);
    return prevState;
  }

  displayCommentBox = e => {
    this.setState({
      commentBox: !this.state.commentBox
    });
  };

  onChange = e => {
    this.setState({
      comment: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newComment = {
      text: this.state.comment
    };

    this.props.addComment(newComment, this.state.id);
    console.log("Submited");
  };

  render() {
    const { post } = this.props;
    console.log(post);

    console.log(this.state);
    const commentInput = (
      <form onSubmit={this.onSubmit}>
        <TextAreaFieldGroup
          onChange={this.onChange}
          placeholder="Write your comment"
          name="commentText"
          value={this.state.comment}
          error={this.state.errors ? this.state.errors.commentText : null}
        />
        <button className="btn btn-primary" type="submit">
          Post Comment
        </button>
      </form>
    );
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.user.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
          </div>
          <div className="col-md-2">
            <button
              className="btn-primary btn btn-large"
              onClick={this.displayCommentBox}
            >
              Comment
            </button>
          </div>
          <div className="col-md-2">
            <button className="btn-success btn btn-large">Like</button>
          </div>
          <div className="col-md-10 mt-4">
            {this.state.commentBox ? commentInput : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(PostItem);
