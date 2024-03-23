/* Import redux library */
import { createSlice } from "@reduxjs/toolkit";

/* Define redux states */
const initialState = {
    postIndex: null,
    profileUser: null,
    profilePosts: [],
};

/* Define redux acitons and reducers */
const postSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {
        setPostIndex: (state,action) => {
            state.postIndex = action.payload;
        },

        setProfileUser: (state, action) => {
            state.profileUser = action.payload;
        },

        setProfilePosts : (state, action) => {
            state.profilePosts = action.payload;
        },

        updateProfilePosts: (state, action) => {
            state.profilePosts = action.payload.profilePosts;
        },

        deleteProfilePost: (state, action) => {
            const postId = action.payload;
            if (state.profilePosts.length > 0){
                const updatedList = state.profilePosts.filter((post,index) => index !== postId);
                state.profilePosts = updatedList;
            } else{
                console.error("User does not have a post");
            }
        },

        addLikePost : (state, action) => {
            const userId = action.payload.userId;
            const postIndex = action.payload.postIndex;

            state.profilePosts[postIndex].likes = [...state.profilePosts[postIndex].likes, userId];
        },

        removeLikePost: (state,action) => {
            const userId = action.payload.userId;
            const postIndex = action.payload.postIndex;

            if (state.profilePosts[postIndex].likes.length > 0){
                const updatedLikesList = state.profilePosts[postIndex].likes.filter((likeUserId,index) => likeUserId !== userId);
                state.profilePosts[postIndex].likes = updatedLikesList;
            }
            else{
                console.error("User have not like this post");
            }
        },

        resetPostState: (state) => {
            state.postIndex = null;
            state.profileUser = null;
            state.profilePosts = [];
        }
    }
});

export const { setPostIndex, setProfilePosts, updateProfilePosts, addLikePost, removeLikePost, deleteProfilePost, setProfileUser, resetPostState} = postSlice.actions;
export default postSlice.reducer;