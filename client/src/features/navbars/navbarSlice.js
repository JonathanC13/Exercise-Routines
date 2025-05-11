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
    categoriesHidden: false,
    container: {
        open: false,
        category: '',
        locationRect: null
    }
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
        },
        containerSet: (state, action) => {
            const { open, category, locationRect } = action.payload
            state.container.open = open
            state.category.category = category
            state.locationRect = locationRect
        },
        containerClosed: (state, action) => {
            state.container.open = false
            state.category.category = ''
            state.locationRect = null
        }
    }
})

export const { screenNavDispaySet, currentCategorySet, categoriesHiddenSet, screenNavClosed, containerSet, containerClosed } = navbarSlice.actions

export default navbarSlice.reducer