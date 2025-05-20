import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user:  null,
    token:  null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action?.payload?.user
            state.token = action?.payload?.token
        },
        clearAuth: (state) => {
            state.user = null;
            state.token = null;
        },
    }
})

export const {setLogin,clearAuth}=authSlice.actions
export default authSlice.reducer