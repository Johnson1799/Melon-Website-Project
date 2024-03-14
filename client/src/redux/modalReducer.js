import { createSlice } from "@reduxjs/toolkit";

/* Define States */
const initialState = {
    toggleImageModal: false,
    toggleEditModal: false,
};

const modalSlice = createSlice({
    name: "modal",
    initialState: initialState,
    reducers: {
        setToggleImageModal: (state) => {
            state.toggleImageModal = !state.toggleImageModal;
        },

        setToggleEditModal: (state) => {
            state.toggleEditModal = !state.toggleEditModal;
        },
    }
});

export const { setToggleImageModal, setToggleEditModal, } = modalSlice.actions;
export default modalSlice.reducer;