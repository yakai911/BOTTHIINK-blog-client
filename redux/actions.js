import { LOAD_USER, LOAD_USER_PROFILE } from "./types";
import { isAuth } from "../actions/auth";
import { userPublicProfile } from "../actions/user";

export const loadUser = () => async (dispatch) => {
  console.log("fetching...");
  const user = await isAuth();
  dispatch({
    type: LOAD_USER,
    user: user,
  });
};

export const loadUserProfile = (username) => async (dispatch) => {
  const userProfile = await userPublicProfile(username);
  dispatch({
    type: LOAD_USER_PROFILE,
    userProfile,
  });
};
