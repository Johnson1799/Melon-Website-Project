import { createSlice } from "@reduxjs/toolkit";

/* Define States */
const initialState = {
    token: '',
    user: null,
};

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

    }
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;