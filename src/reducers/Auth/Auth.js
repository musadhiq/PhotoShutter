import {
  SIGNIN,
  SIGNUP,
  LOGOUT,
  FETCHUSER,
  ERROR,
  UPDATEUSER,
} from "../../constants/ActionTypess";

export const authReducer = (user = {}, action) => {
  switch (action.type) {
    case FETCHUSER:
      return action.payload;
    case SIGNUP:
      return action.payload;
    case SIGNIN:
      return action.payload;
    case LOGOUT:
      return user;
    case UPDATEUSER:
      return action.payload;
    case ERROR:
      return action.payload;

    default:
      return user;
  }
};
