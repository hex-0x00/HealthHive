import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    isUserLoggedIn: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload
            state.isUserLoggedIn = true
        },
        logout: (state) => {
            state.userData = null
            state.isUserLoggedIn = false
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer