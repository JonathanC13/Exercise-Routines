import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    credentials: {},
    authMessage: ''
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
            console.log('old token: ', state.credentials.token, ' / new token: ', accessToken)
            state.credentials.token = accessToken
        },
        loggedOut: (state, action) => {
            state.credentials = {}
        },
        authMessageSet: (state, action) => {
            state.authMessage = action.payload.message
        }
    }
})

export const { credentialsSet, accessTokenSet, loggedOut, authMessageSet } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.credentials.token