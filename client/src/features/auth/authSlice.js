import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    credentials: {},
    preferredTheme: localStorage.getItem('preferredTheme') || 'light',
    persistLogin: localStorage.getItem('persistLogin') || false,
    authMessage: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        credentialsSet: (state, action) => {
            const { id, name, email, token, preferredTheme } = action.payload
            state.credentials.id = id ?? state.credentials.id
            state.credentials.name = name ?? state.credentials.name  // allowed mutating logic due to immer inside createSlice
            state.credentials.email = email ?? state.credentials.email
            state.credentials.token = token ?? state.credentials.token
            state.preferredTheme = preferredTheme ?? state.preferredTheme

            localStorage.setItem('preferredTheme', preferredTheme ?? 'light')
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