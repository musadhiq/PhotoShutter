import { combineReducers } from "redux";
import { authReducer } from "./Auth";
import { postReducer } from "./posts";

export default combineReducers({
  posts: postReducer,
  auth: authReducer,
});
