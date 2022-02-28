import { combineReducers } from "redux";
import { meReducer } from "./me/meReducer";
import { userReducer } from "./user/userReducer";

export default combineReducers({ user: userReducer, me: meReducer });