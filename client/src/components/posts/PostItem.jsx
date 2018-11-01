import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

import {
  addComment,
  likePost,
  unlikePost,
  deletePost,
  deleteComment
} from "../../actions/postActions";

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
    // console.log(prevState);
    // console.log(nextProps);
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

  onLike = e => {
    this.props.likePost(e.target.value, this.state.id);
  };

  onUnlike = e => {
    this.props.unlikePost(e.target.value, this.state.id);
  };

  onDelete = () => {
    this.props.deletePost(this.state.id);
  };

  onDeleteComment = e => {
    console.log(e.target.value);
    this.props.deleteComment(this.state.id, e.target.value);
  };

  onSubmit = e => {
    e.preventDefault();

    const newComment = {
      commentText: this.state.comment
    };

    this.props.addComment(newComment, this.state.id);
    this.setState({
      comment: "",
      commentBox: !this.state.commentBox
    });
  };

  render() {
    const { post } = this.props;
    const { user } = this.props.auth;

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

    const comments = post.comments;
    let commentContent = null;

    if (comments.length > 0) {
      console.log(comments);
      console.log(user.id);
      commentContent = comments.map((comment, index) => (
        <div className="card card-body mb-3" key={index}>
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
              <p className="text-center">{comment.user.name}</p>
            </div>
            <div className="col-md-10">
              <p className="lead">{comment.commentText}</p>
            </div>
            {user.id == comment.user ? (
              <button
                className="btn-danger btn btn-large"
                value={comment._id}
                onClick={this.onDeleteComment}
              >
                Delete Comment
              </button>
            ) : null}
          </div>
        </div>
      ));
    }

    let unlikeButton;

    if (this.props.errors) {
      unlikeButton = (
        <div className="col-md-2">
          <button
            className="btn btn-large btn-warning"
            value={post.id}
            onClick={this.onUnlike}
          >
            <i class="far fa-thumbs-down" />
          </button>
        </div>
      );
    }
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
          <div className="col-md-2" />
          <div className="col-md-2">
            <button
              className="btn-primary btn btn-large"
              onClick={this.displayCommentBox}
            >
              Comment
            </button>
          </div>
          <div className="col-md-2">
            <button
              className="btn-success btn btn-large"
              value={post.id}
              onClick={this.onLike}
            >
              <i class="far fa-thumbs-up" />
              {" " + post.likes.length}
            </button>
          </div>
          {unlikeButton}
          <button
            className="btn-danger btn btn-large"
            value={post.id}
            onClick={this.onDelete}
          >
            Delete
          </button>
          {this.state.errors == post._id ? (
            <div className="text-danger">You already liked this post</div>
          ) : null}
          <div className="col-md-10 mt-4">
            {this.state.commentBox ? commentInput : null}
            {commentContent}
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
  { addComment, likePost, unlikePost, deletePost, deleteComment }
)(PostItem);
