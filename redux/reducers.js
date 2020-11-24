import { combineReducers } from "redux";
import * as types from "./types";
import { isAuth } from "../actions/auth";
import { userPublicProfile } from "../actions/user";

// INITIAL USERPROFILE STATE
const initialUserState = {};
// USERPROFILE REDUCER
const userProfileReducer = (state = initialUserState, { type }) => {
  switch (type) {
    case types.LOAD_USER:
      return { user: "hapmoniym" };

    default:
      return state;
  }
};

// INITIAL USER_BLOGS STATE
const initUserBlogsState = {};

// TIMER REDUCER
const userBlogsReducer = (state = initUserBlogsState, { type, username }) => {
  switch (type) {
    case types.LOAD_USER_BLOGS:
      return {
        blogs: {
          title: 1,
        },
      };
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  userProfile: userProfileReducer,
  userBlogs: userBlogsReducer,
};

export default combineReducers(reducers);
