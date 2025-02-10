import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedInAccount: {'hello':'there'},
    // save JWT into cookies later, for now just in var for current session
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setLoggedInAccount: (state) => {
            state.loggedInAccount = action.payload
        },
        logOut: (state) => {
            state.loggedInAccount = null
        }
    }
})

export const { setLoggedInAccount, logOut } = authSlice.actions

export default authSlice.reducer