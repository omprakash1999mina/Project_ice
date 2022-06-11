import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.login = true;
            state.userInfo = action.payload;
        },
        userLogout: (state, action) => {
            state.login = false
            state.userInfo = action.payload;
        },
        userOTP: (state, action) => {
            state.userOTP = action.payload;
        },
        userEmail: (state, action) => {
            state.userEmail = action.payload;
        },

    }
})

export const { userLogin, userLogout, userEmail, userOTP } = userSlice.actions;
export const getUser = (state) => state.user;
export default userSlice.reducer;