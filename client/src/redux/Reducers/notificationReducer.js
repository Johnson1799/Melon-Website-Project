import { createSlice } from "@reduxjs/toolkit";

/* Define States */
const initialState = {
   countFriendRequests: 0,

};

const notificationSlice = createSlice({
    name: "notification",
    initialState: initialState,
    reducers: {
        setCountFriendRequests: (state, action) => {
            state.countFriendRequests = action.payload;
        },

    }
});

export const { setCountFriendRequests } = notificationSlice.actions;
export default notificationSlice.reducer;