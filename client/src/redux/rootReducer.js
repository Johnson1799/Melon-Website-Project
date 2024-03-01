/* Import React-Rudex */
import { combineReducers } from "@reduxjs/toolkit";

/* Import all the reducers */
import authenticationReducer from "../redux/authenticationSlice.js";

export const rootReducer = combineReducers({
    authentication: authenticationReducer
});