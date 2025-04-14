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
        },
        'placeholder' : {}
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
        }
    }
})

export const { screenNavDispaySet, currentCategorySet, categoriesHiddenSet } = navbarSlice.actions

export default navbarSlice.reducer