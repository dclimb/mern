import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PostForm from "./PostForm";
import PostItem from "./PostItem";
import { getPosts } from "../../actions/postActions";

class Posts extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(nextProps);
  //   return null;
  // }

  render() {
    const { posts } = this.props;
    console.log(this.props);
    console.log(posts);
    const feed = posts.posts.map(item => <PostItem post={item} />);
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {feed}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts,
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
