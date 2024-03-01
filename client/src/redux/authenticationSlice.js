import { createSlice } from "@reduxjs/toolkit";

/* Define States */
const initialState = {
    mode: "light",              // the state that adjust the light mode and dark mode
    user: null,
    token: null,
    posts: []
};

/* Create Authentication Slice */
export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: initialState,

    /* Define Reducers */
    reducers: {
        // 'setMode' Reducer
        setMode: (state,action) => {
            // set the 'mode' state
            if (state.mode === "light") {
                state.mode = "dark";
            } else if (state.mode === "dark") {
                state.mode = "light";
            }
        },

        /* 'setLogin' Reducer */
        setLogin: (state, action) => {
            // set the 'user' and 'token' state
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        /* 'setLogout' Reducer */
        setLogout: (state) => {
            // set the 'user' and 'token' state
            state.user = null;
            state.token = null;
        },

        /* 'setFriends' Reducer */
        setFriends: (state, action) => {
            // set the 'user' state
            if (state.user){
                state.user.friends = action.payload.friends;
            } else {
                console.error("User friends does not exist!");
            }
        },

        /* 'setPosts' Reducer */
        setPosts: (state, action) => {
            // set the 'post' state
            state.posts = action.payload.posts;
        },

        /* 'setUptoDatePost' Reducer */
        setUptoDatePost: (state, action) => {
            // grab a list of posts if post id of database === current post id
            const updatedPosts = state.posts.map( post => {
                if (post._id === action.payload.post_id) {
                    return action.payload.post;
                } else {
                    return post;
                }
            });

            // set the 'post' state
            state.posts = updatedPosts;
        }
    },
})


/* Export all the Actions */
export const { setMode, setLogin, setLogout, setFriends, setPosts, setUptoDatePost } = authenticationSlice.actions;

/* Export all the Reducers */
export default authenticationSlice.reducer;
