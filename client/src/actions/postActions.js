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
      dispatch({ type: GET_POSTS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

//ADD COMMENT
export const addComment = (newComment, id) => dispatch => {
  axios
    .post(`/posts/comment/${id}`, newComment)
    .then(res => {
      console.log("com");
      dispatch(getPosts);
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};
