import { bindActionCreators, combineReducers } from "redux";
import { LOAD_USER_PROFILE, LOAD_USER } from "./types";

const initialUser = {
  user: {},
};

const userReducer = (state = initialUser, { type, user }) => {
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        user: user,
      };

    default:
      return state;
  }
};

const initialUserProfile = {
  userProfile: {
    user: {},
    blogs: [],
  },
};

const userProfileReducer = (
  state = initialUserProfile,
  { type, userProfile }
) => {
  switch (type) {
    case LOAD_USER_PROFILE:
      return {
        ...state,
        user: userProfile.user,
        blogs: userProfile.blogs,
      };
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  user: userReducer,
  userProfile: userProfileReducer,
};

export default combineReducers(reducers);
