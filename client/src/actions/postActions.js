import {
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  ADD_POST,
  GET_ERRORS
} from "./types";
import axios from "axios";

//ADD A NEW POST
export const addPost = newPost => dispatch => {
  axios
    .post("/posts", newPost)
    .then(res => {
      dispatch({ type: ADD_POST, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

//GET POSTS

export const getPosts = newPost => dispatch => {
  axios
    .get("/posts/all", newPost)
    .then(res => {
      console.log("got");
      dispatch({ type: GET_POSTS, payload: res.data });
    })
    .catch(err => {
      // dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

//ADD COMMENT
export const addComment = (newComment, id) => dispatch => {
  axios
    .post(`/posts/comment/${id}`, newComment)
    .then(res => {
      console.log("added");
      dispatch(getPosts());
    })
    .catch(err => {
      console.log("not added");
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

//LIKE A POST

export const likePost = (like, postId) => dispatch => {
  axios
    .post(`/posts/like/${postId}`, like)
    .then(res => {
      console.log("liked");
      dispatch(getPosts());
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: GET_ERRORS, payload: postId });
    });
};

//UNLIKE A POST

export const unlikePost = (unlike, postId) => dispatch => {
  axios
    .post(`/posts/unlike/${postId}`, unlike)
    .then(res => {
      dispatch(getPosts());
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const deletePost = id => dispatch => {
  axios
    .delete(`/posts/${id}`)
    .then(res => {
      dispatch(getPosts());
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/posts/comment/${postId}/${commentId}`)
    .then(res => {
      console.log("del", res.data);
      dispatch(getPosts());
    })
    .catch(err => {
      console.log(commentId);
      console.log("err", err.response.data);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
