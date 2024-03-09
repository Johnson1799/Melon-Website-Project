import { createSlice } from "@reduxjs/toolkit";

/* Define States */
const initialState = {
    toggle: false,
    isRouting: false,
};

const slideBarToggleSlice = createSlice({
    name: "slideBarToggle",
    initialState: initialState,
    reducers: {
        setToggle: (state) => {
            state.toggle = !state.toggle;
        },

        setIsRouting: (state, action) => {
            state.isRouting = action.payload;
        }
    }
});

export const { setToggle, setIsRouting} = slideBarToggleSlice.actions;
export default slideBarToggleSlice.reducer;