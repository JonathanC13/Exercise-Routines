import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    credentials: {},
    // save JWT into cookies later, for now just in var for current session
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        credentialsSet: (state, action) => {
            const { name, email, token } = action.payload
            state.credentials.name = name  // allowed mutating logic due to immer inside createSlice
            state.credentials.email = email
            state.credentials.token = token
        },
        accessTokenSet: (state, action) => {
            const { accessToken } = action.payload
            state.credentials.token = accessToken
        },
        loggedOut: (state, action) => {
            state.credentials = {}
        },
        
    }
})

export const { credentialsSet, accessTokenSet, loggedOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.credentials.token