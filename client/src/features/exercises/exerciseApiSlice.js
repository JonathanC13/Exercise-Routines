// import { exerciseAdapter, initialExerciseState, selectExercisesResult } from '../sessions/sessionsApiSlice'
// import { apiSlice } from '../../app/api/apiSlice'
// import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

// const exerciseApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         addExercise: builder.mutation({
//             query: (route, body) => ({
//                 url: `/routines/${route.routineId}/sessions/${route.sessionId}/exercises/`,
//                 method: 'POST',
//                 body
//             }),
//             invalidatesTags: [{ type: 'Session', id: 'LIST' }]
//         }),
//         updateExercise: builder.mutation({
//             query: (route, body) => ({
//                 url: `/routines/${route.routineId}/sessions/${route.sessionId}/exercises/${route.exerciseId}`,
//                 method: 'POST',
//                 body
//             }),
//             invalidatesTags: [{ type: 'Session', id: route.exerciseId }]
//         }),
//         deleteExercise: builder.mutation({
//             query: (route, body) => ({
//                 url: `/routines/${route.routineId}/sessions/${route.sessionId}/exercises/${route.exerciseId}`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: [{ type: 'Session', id: route.exerciseId }]
//         })
//     })
// })

// export const {
//     useAddExerciseMutation, 
//     useUpdateExerciseMutation,
//     useDeleteExerciseMutation
// } = exerciseApiSlice

// // memoized
// const selectExercisesData = createSelector(
//     selectExercisesResult,
//     exercisesResult => exercisesResult.data
// )

// // selectors
// export const {
//     selectAll: selectAllExercises,
//     selectById: selectExerciseById,
//     selectIds: selectExerciseIds,
//     select
// } = exerciseAdapter.getSelectors((state) => selectExercisesData ?? initialExerciseState)