import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addFormOpen: false,
    addFormType: '',
    location: {center:-9000, bottom:0},
    setAddFormData: {
        routineId: null,
        sessionId: null,
        exercise: null
    },
    exerciseAddFormData: {
        routineId: null,
        session: null
    }
}

export const addFormModalsSlice = createSlice({
    name: 'addFormModals',
    initialState: initialState,
    reducers: {
        addFormClosed: (state, action) => {
            state.addFormOpen = false
            state.addFormType = ''
        },
        exSetAddFormOpenChanged: (state, action) => {
            const { addFormOpen, addFormType, location, routineId, sessionId, exercise } = action.payload
            state.addFormOpen = addFormOpen // allowed mutating logic due to immer inside createSlice
            state.addFormType = addFormType
            state.location = location
            state.setAddFormData.routineId = routineId
            state.setAddFormData.sessionId = sessionId
            state.setAddFormData.exercise = exercise
        },
        exerciseAddFormOpenChanged: (state, action) => {
            const { addFormOpen, addFormType, location, routineId, session } = action.payload
            state.addFormOpen = addFormOpen
            state.addFormType = addFormType
            state.location = location
            state.exerciseAddFormData.routineId = routineId
            state.exerciseAddFormData.session = session
        },
        // to do thunk? to dispatch submit
    }
})

export const { addFormClosed, exSetAddFormOpenChanged, exerciseAddFormOpenChanged } = addFormModalsSlice.actions

export default addFormModalsSlice.reducer