/* Import React-Rudex */
import { combineReducers } from "@reduxjs/toolkit";

/* Import all the reducers */
import authenticationReducer from "../redux/authenticationSlice.js";
import slideBarToggleReducer from "../redux/slideBarToggleReducer.js";
import modalReducer from "../redux/modalReducer.js";

export const rootReducer = combineReducers({
    authentication: authenticationReducer,
    slideBarToggle: slideBarToggleReducer,
    modal: modalReducer,
});