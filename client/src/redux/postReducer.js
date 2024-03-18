import { createSlice } from "@reduxjs/toolkit";

/* Define States */
const initialState = {
    postIndex: null,
};

const postSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {
        setPostIndex: (state,action) => {
            state.postIndex = action.payload;
        },


    }
});

export const { setPostIndex,} = postSlice.actions;
export default postSlice.reducer;