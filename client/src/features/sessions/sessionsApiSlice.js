import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const sessionsAdapter = createEntityAdapter({
    // Sort in ascending order, if same then descending updatedAt order
    sortComparer: (a, b) => {
        const ord = a - b
        if (ord === 0) {
            return b.updatedAt.localeCompare(a.updatedAt)
        }
        return ord
    }
})

const initialSessionsState = sessionsAdapter.getInitialState()

// export const exerciseAdapter = createEntityAdapter({
//     // Sort in ascending order, if same then descending updatedAt order
//     sortComparer: (a, b) => {
//         const ord = a - b
//         if (ord === 0) {
//             return b.updatedAt.localeCompare(a.updatedAt)
//         }
//         return ord
//     }
// })

// const initialExercisesState = exerciseAdapter.getInitialState()
// export { initialExercisesState }

export const sessionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSessions: builder.query({
            query: (params) => ({
                url: `/routines/${params.routineId}/sessions`,
                headers: { authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzlmY2UyNTcwNDJmOTQyNmE0Yzc0OWEiLCJuYW1lIjoiSm9uIiwiaWF0IjoxNzM5NzM1OTEzLCJleHAiOjE3NDIzMjc5MTN9.EpCJIg0DXMw0o4u-ZxYOVhm8pmOO7oPHp_HFYnIgebU' },
                method: 'GET'
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (responseData) => {
                const data = responseData.response

                // nested exercises
                // const loadedExercises = []
                // for (let i = 0; i < data.length; i ++) {
                //     for (let j = 0; j < data[i].exercises.length; j ++) {
                //         data[i].exercises.id = data[i].exercises._id
                //         loadedExercises.push(data[i].exercises)
                //     }
                // }
                // exerciseAdapter.setAll(initialExercisesState, loadedExercises)

                // parent session
                const loadedSessions = data.map((session) => {
                    session.id = session._id    // normalized data uses .id, so add in a .id prop and assign the mongoDB _id value.
                    session.exercises.map((exercise) => {
                        exercise.id = exercise._id
                    })
                    return session
                })
                return sessionsAdapter.setAll(initialSessionsState, loadedSessions)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Session', id: 'LIST' },
                        ...result.ids.map((id) => ({type: 'Session', id}))
                    ]
                } else {
                    return [{ type: 'Session', id: 'LIST' }]
                }
            }
        })
    })
})

export const {
    useGetSessionsQuery
} = sessionsApiSlice

export const selectSessionsResult = sessionsApiSlice.endpoints.getSessions.select()
export const selectExercisesResult = sessionsApiSlice.endpoints.getSessions.select()

// memoized
const selectSessionsData = createSelector(
    selectSessionsResult,
    sessionsResult => sessionsResult.data   // normalized state object with ids & entities
)

// selectors
export const {
    selectAll: selectAllSessions,
    selectById: selectSessionById,
    selectIds: selectSessionIds
} = sessionsAdapter.getSelectors(state => selectSessionsData(state) ?? initialSessionsState)