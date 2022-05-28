import { SIGNIN, SIGNUP } from "../constants/ActionTypess";

export const authReducer = (user = {}, action) => {
  switch (action.type) {
    case SIGNUP:
      return action.payload;
    case SIGNIN:
      return action.payload;
    default:
      return user;
  }
};
