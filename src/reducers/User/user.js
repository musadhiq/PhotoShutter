import { FETCHUSER, UPDATEUSER, CLEARUSER } from "../../constants/ActionTypess";

export const userReducer = (user = {}, action) => {
  switch (action.type) {
    case FETCHUSER:
      return action.payload;
    case UPDATEUSER:
      return action.payload;
    case CLEARUSER:
      return user;
    default:
      return user;
  }
};
