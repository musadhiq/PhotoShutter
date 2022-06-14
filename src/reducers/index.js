import { combineReducers } from "redux";
import { authReducer } from "./Auth/Auth";
import { postReducer } from "./Posts/posts";
import { userReducer } from "./User/user";
import { usersReducer } from "./User/users";

export default combineReducers({
  posts: postReducer,
  auth: authReducer,
  user: userReducer,
  users: usersReducer,
});
