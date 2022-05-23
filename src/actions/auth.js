import * as api from "../api";
import { SIGNIN, SIGNUP } from "../constants/ActionTypess";
export const signUp = (user, Navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(user);
    dispatch({ type: SIGNIN, payload: data.result });
    localStorage.setItem("profile", JSON.stringify(data));
    Navigate("/");
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const signIn = (user, Navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(user);
    dispatch({ type: SIGNUP, payload: data });
    localStorage.setItem("profile", JSON.stringify(data));
    Navigate("/");
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const logOut = (Navigate) => async (dispatch) => {
  localStorage.clear();
  Navigate("/sign_in");
};
