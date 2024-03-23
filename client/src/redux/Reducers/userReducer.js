/* Import redux library */
import { createSlice } from "@reduxjs/toolkit";

/* Define redux states */
const initialState = {
    token: '',
    user: null,
    userPosts: null,
    userPostIndex: null,
};

/* Define redux acitons and reducers */
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setLogin: (state,action) => {
            state.token = action.payload.token;
            state.user=action.payload.user;
            state.userPosts = action.payload.userPosts;
        },
         
        setUserPostIndex: (state,action) => {
            state.userPostIndex = action.payload;
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

        addLikeUserPost : (state, action) => {
            const userId = action.payload.userId;
            const postIndex = action.payload.postIndex;

            state.userPosts[postIndex].likes = [...state.userPosts[postIndex].likes, userId];
        },

        removeLikeUserPost: (state,action) => {
            const userId = action.payload.userId;
            const postIndex = action.payload.postIndex;

            if (state.userPosts[postIndex].likes.length > 0){
                const updatedLikesList = state.userPosts[postIndex].likes.filter((likeUserId,index) => likeUserId !== userId);
                state.userPosts[postIndex].likes = updatedLikesList;
            }
            else{
                console.error("User have not like this post");
            }
        },

        resetUserState: (state) => {
            state.token = '';
            state.user = null;
            state.userPosts = null;
            state.userPostIndex = null;
        },

    }
});

export const { setLogin, setUserPostIndex, updateUser, updateUserPosts, updateUserPost, deleteUserPost, addLikeUserPost, removeLikeUserPost, resetUserState, } = userSlice.actions;
export default userSlice.reducer;