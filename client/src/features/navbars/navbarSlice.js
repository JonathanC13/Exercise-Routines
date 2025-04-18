import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    screenNavOpen: false,
    categories: {
        'routines': {
            'parent': {
                title: 'All routines',
                URL: '/routines'
            },
            'children': {
                URL: '/routines/${id}/sessions/'
            }
        }
    },
    currentCategory: '',
    categoriesHidden: false
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
        },
        categoriesHiddenSet: (state, action) => {
            const { hidden } = action.payload
            state.categoriesHidden = hidden 
        },
        screenNavClosed: (state, action) => {
            state.currentCategory = ''
            state.categoriesHidden = false
            state.screenNavOpen = false
        }
    }
})

export const { screenNavDispaySet, currentCategorySet, categoriesHiddenSet, screenNavClosed } = navbarSlice.actions

export default navbarSlice.reducer