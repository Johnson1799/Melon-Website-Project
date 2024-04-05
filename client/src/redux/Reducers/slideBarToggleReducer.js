/* Import redux library */
import { createSlice } from "@reduxjs/toolkit";

/* Define redux states */
const initialState = {
    toggle: false,
};

/* Define redux acitons and reducers */
const slideBarToggleSlice = createSlice({
    name: "slideBarToggle",
    initialState: initialState,
    reducers: {
        setToggle: (state) => {
            state.toggle = !state.toggle;
        },

        resetSlideBarState: (state) => {
            state.toggle = false;
        }
    }
});

export const { setToggle, resetSlideBarState} = slideBarToggleSlice.actions;
export default slideBarToggleSlice.reducer;