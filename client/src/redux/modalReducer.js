import { createSlice } from "@reduxjs/toolkit";

/* Define States */
const initialState = {
    toggleImageModal: false,
    toggleEditModal: false,
    userAvatarURL: '',
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

        setUserAvatar: (state,action) => {
            state.userAvatarURL = action.payload;
        }
    }
});

export const { setToggleImageModal, setToggleEditModal, setUserAvatar, } = modalSlice.actions;
export default modalSlice.reducer;