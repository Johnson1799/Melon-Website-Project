/* Import redux library */
import { createSlice } from "@reduxjs/toolkit";

/* Define States */
const initialState = {
    toggleImageModal: false,
    toggleEditModal: false,
    togglePostModal: false,
    toggleEditPostModal: false,
    toggleAddFriendsModal:false,

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

        setToggleAddFriendsModal: (state) => {
            state.toggleAddFriendsModal = !state.toggleAddFriendsModal;
        },

        resetModalState: (state)=>{
            state.toggleImageModal = false;
            state.toggleEditModal = false;
            state.toggleEditPostModal = false;
            state.togglePostModal = false;
            state.toggleAddFriendsModal = false;
        }
    }
});

export const { setToggleImageModal, setToggleEditModal, setTogglePostModal, setToggleEditPostModal, setToggleAddFriendsModal, resetModalState, } = modalSlice.actions;
export default modalSlice.reducer;