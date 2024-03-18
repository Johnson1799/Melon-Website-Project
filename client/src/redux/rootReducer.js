/* Import React-Rudex */
import { combineReducers } from "@reduxjs/toolkit";

/* Import all the reducers */
import slideBarToggleReducer from "../redux/slideBarToggleReducer.js";
import modalReducer from "../redux/modalReducer.js";
import postReducer from "../redux/postReducer.js";
import userReducer from "../redux/userReducer.js";

export const rootReducer = combineReducers({
    slideBarToggle: slideBarToggleReducer,
    post: postReducer,
    modal: modalReducer,
    user:userReducer,
});