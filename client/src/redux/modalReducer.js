import { createSlice } from "@reduxjs/toolkit";

/* Define States */
const initialState = {
    toggleImageModal: false,
    toggleEditModal: false,
    togglePostModal: false,
    toggleEditPostModal: false,
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

        setTogglePostModal: (state) => {
            state.togglePostModal = !state.togglePostModal;
        },

        setToggleEditPostModal: (state) => {
            state.toggleEditPostModal = !state.toggleEditPostModal;
        },
    }
});

export const { setToggleImageModal, setToggleEditModal, setTogglePostModal, setToggleEditPostModal } = modalSlice.actions;
export default modalSlice.reducer;