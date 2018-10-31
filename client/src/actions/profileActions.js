import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_PROFILE,
  GET_ERRORS,
  EDIT_EXPERIENCE,
  EDIT_EDUCATION
} from "./types";
import axios from "axios";

export const getProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/profiles")
    .then(res => {
      // console.log("then");

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      // console.log("error");
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

//CREATE OR MODIFY ---PROFILE---

export const setProfile = (profileData, history) => dispatch => {
  axios
    .post("/profiles", profileData)
    .then(res => {
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//CREATE OR MODIFY ---EXPERIENCE---

export const editExperience = (newExperience, history) => dispatch => {
  axios
    .post("/profiles/experience", newExperience)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//CREATE OR MODIFY ---EDUCATION

export const editEducation = (newEducation, history) => dispatch => {
  axios
    .post("/profiles/education", newEducation)
    .then(res => {
      history.push("/dashboard");
      console.log(res.data);
    })
    .catch(err => {
      console.log("error education");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      console.log(err.response.data);
    });
};

//DELETE EXPERIENCE

export const deleteExperience = id => dispatch => {
  axios
    .delete(`/profiles/experience/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("delet catch");
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
      console.log(err.response);
    });
};

//DELETE EDUCATION

export const deleteEducation = id => dispatch => {
  axios
    .delete(`/profiles/edycation/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("delet catch");
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
      console.log(err.response);
    });
};

//GET ALL PROFILES

export const getProfiles = () => dispatch => {
  axios
    .get("/profiles/all")
    .then(res => {
      console.log(res.data);
      dispatch({ type: setProfileLoading });
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//GET PROFILE BY HANDLE

export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/profiles/handle/${handle}`)
    .then(res => {
      console.log(res.data);
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
