/* Import redux library */
import { createSlice } from "@reduxjs/toolkit";

/* Define redux states */
const initialState = {
    adminId: '',
    token: '',
};

/* Define redux acitons and reducers */
const adminSlice = createSlice({
    name: "admin",
    initialState: initialState,
    reducers: {
        setAdmin: (state,action) => {
            state.adminId = action.payload.adminId;
            state.token = action.payload.token;
        },

        resetAdminState: (state) => {
            state.adminId = '';
            state.token = '';
        },
    }
});

export const { setAdmin, resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;