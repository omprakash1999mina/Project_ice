import {configureStore} from '@reduxjs/toolkit';
import userSlice from "../states/User/UserSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
}) 
