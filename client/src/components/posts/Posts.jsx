import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PostForm from "./PostForm";
import PostItem from "./PostItem";
import { getPosts } from "../../actions/postActions";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.posts.posts.map(post => post.likes)
    };
  }

  componentDidMount() {
    this.props.getPosts();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  render() {
    const { posts } = this.props;
    console.log(this.state.likes);
    const feed = posts.posts.map((item, index) => (
      <PostItem
        key={index}
        post={item}
        liked={item.likes.indexOf(this.props.auth.user.id) >= 0}
      />
    ));
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
