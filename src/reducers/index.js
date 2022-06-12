import { combineReducers } from "redux";
import { authReducer } from "./Auth";
import { postReducer } from "./posts";
import { userReducer } from "./user";

export default combineReducers({
  posts: postReducer,
  auth: authReducer,
  user: userReducer,
});
