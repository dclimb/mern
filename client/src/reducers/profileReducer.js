import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";
import { getProfile, setProfileLoading } from "../actions/profileActions";

const initialState = {
  profile: {},
  profiles: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
      return state;
  }
};
