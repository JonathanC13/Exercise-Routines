import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    credentials: {},
    persistLogin: JSON.parse(localStorage.getItem('persistLogin') || false),
    authMessage: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        credentialsSet: (state, action) => {
            const { name, email, token, preferredTheme, persistLogin } = action.payload
            state.credentials.name = name  // allowed mutating logic due to immer inside createSlice
            state.credentials.email = email
            state.credentials.token = token
            state.credentials.preferredTheme = preferredTheme
            
        },
        persistLoginSet: (state, action) => {
            const { persistLogin } = action.payload
            state.persistLogin = persistLogin

            // local storage
            localStorage.setItem('persistLogin', persistLogin)
        },
        accessTokenSet: (state, action) => {
            const { accessToken } = action.payload
            // console.log('old token: ', state.credentials.token, ' / new token: ', accessToken)
            state.credentials.token = accessToken
        },
        loggedOut: (state, action) => {
            state.credentials = {}
            state.persistLogin = false

            localStorage.setItem('persistLogin', false)
        },
        authMessageSet: (state, action) => {
            state.authMessage = action.payload.message
        }
    }
})

export const { credentialsSet, persistLoginSet, accessTokenSet, loggedOut, authMessageSet } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.credentials.token