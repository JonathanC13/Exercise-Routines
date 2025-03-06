import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    exSetAddFormOpen: false,
    location: {center:-9000, bottom:0}
}

export const exSetAddFormSlice = createSlice({
    name: 'exSetAddForm',
    initialState: initialState,
    reducers: {
        exSetAddFormOpenChanged: (state, action) => {
            const { exSetAddFormOpen, location } = action.payload
            state.exSetAddFormOpen = exSetAddFormOpen // allowed mutating logic due to immer inside createSlice
            state.location = location
        }
    }
})

export const { exSetAddFormOpenChanged } = exSetAddFormSlice.actions

export default exSetAddFormSlice.reducer