import { FETCHUSERS } from "../../constants/ActionTypess";

export const usersReducer = (users = {}, action) => {
  switch (action.type) {
    case FETCHUSERS:
      return action.payload;
    default:
      return users;
  }
};
