/* Import redux library */
import { createSlice } from "@reduxjs/toolkit";

/* Define redux states */
const initialState = {
    token: '',
    user: null,
    userPosts: null,
};

/* Define redux acitons and reducers */
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setLogin: (state,action) => {
            state.token = action.payload.token;
            state.user=action.payload.user;
        },

        setLogout: (state) => {
            state.token = null;
            state.user = null;
        },

        updateUser: (state, action) => {
            state.user = action.payload.user;
        },

        updateUserPosts: (state, action) => {
            state.userPosts = action.payload.userPosts;
        },

        updateUserPost: (state, action) => {
            const data = action.payload;
            const index =  state.userPosts.findIndex(post => post._id === data._id);

            if (index !== -1) {
                state.userPosts = state.userPosts.map((post) => {
                    if (post._id === data._id){
                        return data;
                    }
                    return post;
                });
            } else{
                /* append new post to redux */
                state.userPosts = [...state.userPosts, data];
            }
        },

        deleteUserPost: (state, action) => {
            const postId = action.payload;
            if (state.userPosts.length > 0){
                const updatedList = state.userPosts.filter((post,index) => index !== postId);
                state.userPosts = updatedList;
            } else{
                console.error("User does not have a post");
            }
        },

    }
});

export const { setLogin, setLogout, updateUser, updateUserPosts, updateUserPost, deleteUserPost } = userSlice.actions;
export default userSlice.reducer;