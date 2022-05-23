import { SIGNIN, SIGNUP, LOGOUT } from "../constants/ActionTypess";

export const authReducer = (user = {}, action) => {
  switch (action.type) {
    case SIGNUP:
      return action.payload;
    case SIGNIN:
      return action.payload;
    case LOGOUT:
      return user;
    default:
      return user;
  }
};
