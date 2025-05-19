import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: '',
    message: ''
}

export const errorSlice = createSlice({
    name: 'errorSlice',
    initialState: initialState,
    reducers: {
        errorStatusSet: (state, action) => {
            const { newStatus, newMessage } = action.payload
            state.status = newStatus
            state.message = newMessage
        },
        errorStatusCleared: (state, action) => {
            state.status = ''
            state.message = ''
        }
    }
})

export const { errorStatusSet, errorStatusCleared } = errorSlice.actions

export default errorSlice.reducer