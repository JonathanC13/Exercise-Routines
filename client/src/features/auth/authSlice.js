import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    credentials: {user_name: null, token: null},
    // save JWT into cookies later, for now just in var for current session
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        credentialsSet: (state, action) => {
            const { user: {name}, token } = action.payload
            state.credentials.user_name = name  // allowed mutating logic due to immer inside createSlice
            state.credentials.token = token
        },
        loggedOut: (state, action) => {
            state.credentials.user_name = null
            state.credentials.token = null
        }
    }
})

export const { credentialsSet, loggedOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.credentials.token