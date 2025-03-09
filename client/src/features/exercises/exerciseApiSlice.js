// import { exerciseAdapter, initialExerciseState, selectExercisesResult } from '../sessions/sessionsApiSlice'
import { apiSlice } from '../../app/api/apiSlice'
// import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

const exerciseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addExercise: builder.mutation({
            query: (args) => ({
                url: `/routines/${args.routineId}/sessions/${args.sessionId}/exercises/`,
                headers: { authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzlmY2UyNTcwNDJmOTQyNmE0Yzc0OWEiLCJuYW1lIjoiSm9uIiwiaWF0IjoxNzM5NzM1OTEzLCJleHAiOjE3NDIzMjc5MTN9.EpCJIg0DXMw0o4u-ZxYOVhm8pmOO7oPHp_HFYnIgebU' },
                method: 'POST',
                body: args.body
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Session', id: arg.sessionId }]
        }),
        updateExercise: builder.mutation({
            query: (args) => ({
                url: `/routines/${args.routineId}/sessions/${args.sessionId}/exercises/${args.exerciseId}`,
                headers: { authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzlmY2UyNTcwNDJmOTQyNmE0Yzc0OWEiLCJuYW1lIjoiSm9uIiwiaWF0IjoxNzM5NzM1OTEzLCJleHAiOjE3NDIzMjc5MTN9.EpCJIg0DXMw0o4u-ZxYOVhm8pmOO7oPHp_HFYnIgebU' },
                method: 'PATCH',
                body: args.body
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Session', id: arg.sessionId }]
        }),
        deleteExercise: builder.mutation({
            query: (args) => ({
                url: `/routines/${args.routineId}/sessions/${args.sessionId}/exercises/${args.exerciseId}`,
                headers: { authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzlmY2UyNTcwNDJmOTQyNmE0Yzc0OWEiLCJuYW1lIjoiSm9uIiwiaWF0IjoxNzM5NzM1OTEzLCJleHAiOjE3NDIzMjc5MTN9.EpCJIg0DXMw0o4u-ZxYOVhm8pmOO7oPHp_HFYnIgebU' },
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Session', id: arg.sessionId }]
        })
    })
})

export const {
    useAddExerciseMutation, 
    useUpdateExerciseMutation,
    useDeleteExerciseMutation
} = exerciseApiSlice

// memoized
// const selectExercisesData = createSelector(
//     selectExercisesResult,
//     exercisesResult => exercisesResult.data
// )

// selectors
// export const {
//     selectAll: selectAllExercises,
//     selectById: selectExerciseById,
//     selectIds: selectExerciseIds,
//     select
// } = exerciseAdapter.getSelectors((state) => selectExercisesData ?? initialExerciseState)