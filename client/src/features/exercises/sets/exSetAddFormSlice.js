import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    exSetAddFormOpen: false,
    location: {center:-9000, bottom:0},
    routineId: null,
    sessionId: null,
    exercise: null
}

export const exSetAddFormSlice = createSlice({
    name: 'exSetAddForm',
    initialState: initialState,
    reducers: {
        exSetAddFormOpenChanged: (state, action) => {
            const { exSetAddFormOpen, location, routineId, sessionId, exercise } = action.payload
            state.exSetAddFormOpen = exSetAddFormOpen // allowed mutating logic due to immer inside createSlice
            state.location = location
            state.routineId = routineId
            state.sessionId = sessionId
            state.exercise = exercise
        },
        // to do thunk? to dispatch submit
    }
})

export const { exSetAddFormOpenChanged } = exSetAddFormSlice.actions

export default exSetAddFormSlice.reducer