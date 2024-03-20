/* Import redux library */
import { createSlice } from "@reduxjs/toolkit";

/* Define redux states */
const initialState = {
    postIndex: null,
};

/* Define redux acitons and reducers */
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