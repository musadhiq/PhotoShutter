import * as api from "../api";
import { ERROR, FETCHUSER, UPDATEUSER } from "../constants/ActionTypess";

export const updateUser = (id, user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, user);
    dispatch({ type: UPDATEUSER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);

    dispatch({ type: FETCHUSER, payload: data });
  } catch (error) {
    dispatch({ type: ERROR, payload: error.response.data });
  }
};
