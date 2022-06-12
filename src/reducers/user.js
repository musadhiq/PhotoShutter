import { FETCHUSER, UPDATEUSER } from "../constants/ActionTypess";

export const userReducer = (user = {}, action) => {
  switch (action.type) {
    case FETCHUSER:
      return action.payload;
    case UPDATEUSER:
      return action.payload;
    default:
      return user;
  }
};
