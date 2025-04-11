import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    screenNavOpen: false,
    categories: {
        'routines': {
            allURL: '/routines',
            targetURL: '/routines/${id}/sessions/'
        }
    },
    currentCategory: ''
}

export const navbarSlice = createSlice({
    name: 'nav',
    initialState: initialState,
    reducers: {
        screenNavDispaySet: (state, action) => {
            const { displayState } = action.payload
            state.screenNavOpen = displayState 
        },
        currentCategorySet: (state, action) => {
            const { category } = action.payload
            state.currentCategory = category 
        }
    }
})

export const { screenNavDispaySet } = navbarSlice.actions

export default navbarSlice.reducer