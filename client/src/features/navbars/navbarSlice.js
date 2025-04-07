import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    screenNavOpen: false
}

export const navbarSlice = createSlice({
    name: 'nav',
    initialState: initialState,
    reducers: {
        screenNavDispaySet: (state, action) => {
            const { displayState } = action.payload
            state.screenNavOpen = displayState 
        },
    }
})

export const { screenNavDispaySet } = navbarSlice.actions

export default navbarSlice.reducer