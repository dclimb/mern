import jwt_decode from "jwt-decode";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import { GET_TOKEN, SET_CURRENT_USER } from "./types";
import { GET_ERRORS, GET_PROFILE } from "./types";

//REGISTER

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/users/signin", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//LOGIN

export const loginUser = loginInfo => dispatch => {
  axios
    .post("/users/login", loginInfo)
    .then(res => {
      console.log("called");
      //GET TOKEN
      const { token } = res.data;
      //SAVE TOKEN TO LOCAL STORAGE
      localStorage.setItem("jwtToken", token);
      //SET TOKEN TO AUTH HEADER
      setAuthToken(token);
      //DECODE TOKEN
      const decoded = jwt_decode(token);
      //SET CURRENT USER
      dispatch(setCurrentUser(decoded));
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

//LOGOUT

export const logoutUser = history => dispatch => {
  //REMOVE TOKEN FROM LOCAL STORAGE
  localStorage.removeItem("jwtToken");
  //REMOVE AUTH HEADER
  setAuthToken(false);
  //LOG OUT USER
  dispatch(setCurrentUser({}));
  //REMOVE PROFILE FROM STATE
  dispatch({
    type: GET_PROFILE,
    payload: {}
  });
  history.push("/");
};

//DELETE USER

export const deleteAccount = () => dispatch => {
  axios
    .delete("/users")
    .then(res => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS
      });
    });
};
