import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    addFormOpen: false,
    addFormType: '',
    location: {center:-9000, bottom:0},
    routineAddFormData: {
    },
    sessionAddFormData: {
        routine: null
    },
    exerciseAddFormData: {
        routineId: null,
        session: null
    },
    setAddFormData: {
        routineId: null,
        sessionId: null,
        exercise: null
    },
}

export const addFormModalsSlice = createSlice({
    name: 'addFormModals',
    initialState: initialState,
    reducers: {
        addFormClosed: (state, action) => {
            state.addFormOpen = false
            state.addFormType = ''
        },
        routineAddFormOpenChanged: (state, action) => {
            const { addFormOpen, addFormType, location } = action.payload
            state.addFormOpen = addFormOpen
            state.addFormType = addFormType
            state.location = location
        },
        sessionAddFormOpenChanged: (state, action) => {
            const { addFormOpen, addFormType, routine, location } = action.payload
            state.addFormOpen = addFormOpen
            state.addFormType = addFormType
            state.sessionAddFormData.routine = routine
            state.location = location
        },
        exerciseAddFormOpenChanged: (state, action) => {
            const { addFormOpen, addFormType, location, routineId, session } = action.payload
            state.addFormOpen = addFormOpen
            state.addFormType = addFormType
            state.location = location
            state.exerciseAddFormData.routineId = routineId
            state.exerciseAddFormData.session = session
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
    }
})

export const { addFormClosed, routineAddFormOpenChanged, sessionAddFormOpenChanged, exerciseAddFormOpenChanged, exSetAddFormOpenChanged } = addFormModalsSlice.actions

export default addFormModalsSlice.reducer