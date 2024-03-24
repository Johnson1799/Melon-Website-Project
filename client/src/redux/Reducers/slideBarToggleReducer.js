/* Import redux library */
import { createSlice } from "@reduxjs/toolkit";

/* Define redux states */
const initialState = {
    toggle: false,
    isRouting: false,
};

/* Define redux acitons and reducers */
const slideBarToggleSlice = createSlice({
    name: "slideBarToggle",
    initialState: initialState,
    reducers: {
        setToggle: (state) => {
            state.toggle = !state.toggle;
        },

        setIsRouting: (state, action) => {
            state.isRouting = action.payload;
        },

        resetSlideBarState: (state) => {
            state.toggle = false;
            state.isRouting = false;
        }
    }
});

export const { setToggle, setIsRouting, resetSlideBarState} = slideBarToggleSlice.actions;
export default slideBarToggleSlice.reducer;