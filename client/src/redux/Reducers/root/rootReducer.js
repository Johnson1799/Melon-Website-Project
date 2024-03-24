/* Import redux library */
import { combineReducers } from "@reduxjs/toolkit";

/* Import all the reducers */
import slideBarToggleReducer from "../slideBarToggleReducer";
import modalReducer from "../modalReducer";
import postReducer from "../postReducer";
import userReducer from "../userReducer";
import notificationReducer from "../notificationReducer";

export const rootReducer = combineReducers({
    slideBarToggle: slideBarToggleReducer,
    post: postReducer,
    modal: modalReducer,
    user:userReducer,
    notification:notificationReducer,
    
});