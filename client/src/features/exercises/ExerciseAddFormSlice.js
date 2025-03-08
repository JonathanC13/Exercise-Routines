import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    exerciseAddFormOpen: false,
    location: {center:-9000, bottom:0},
    routineId: null,
    session: null
}

export const exerciseAddFormSlice = createSlice({
    name: 'exerciseAddForm',
    initialState: initialState,
    reducers: {
        exerciseAddFormOpenChanged: (state, action) => {
            const { exSetAddFormOpen, location, routineId, session } = action.payload
            state.exerciseAddFormOpen = exSetAddFormOpen // allowed mutating logic due to immer inside createSlice
            state.location = location
            state.routineId = routineId
            state.session = session
        },
        // to do thunk? to dispatch submit
    }
})

export const { exerciseAddFormOpenChanged } = exerciseAddFormSlice.actions

export default exerciseAddFormSlice.reducer