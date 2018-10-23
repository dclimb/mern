import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";
import axios from "axios";

export const getProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

export const setProfileLoading = () => ({
  type: PROFILE_LOADING,
  loading: true
});

export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});
