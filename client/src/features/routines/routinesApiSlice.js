import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const routinesAdapter = createEntityAdapter({
    // Sort in ascending order, if same then descending updatedAt order
    sortComparer: (a, b) => {
        const ord = a - b
        if (ord === 0) {
            return b.updatedAt.localeCompare(a.updatedAt)
        }
        return ord
    }
})

const initialState = routinesAdapter.getInitialState()

/* normalized e.g.
routine : {
        id : {
            "post1" : {
                id : "post1",
                author : "user1",
                body : "......",
                comments : ["comment1", "comment2"]
            },
            "post2" : {
                id : "post2",
                author : "user2",
                body : "......",
                comments : ["comment3", "comment4", "comment5"]
            }
        },
        ids : ["post1", "post2"]
    }
*/

export const routinesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRoutines: builder.query({
            query: (args) => ({
                url: '/routines',
                headers: { authorization: `Bearer ${args.token}` },
                method: 'GET'
            }),
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const data = responseData.response
                const loadedRoutines = data.map((routine) => {
                    routine.id = routine._id    // normalized data uses .id, so add in a .id prop and assign the mongoDB _id value.
                    return routine
                })
                return routinesAdapter.setAll(initialState, loadedRoutines)
            },
            providesTags: (result, error, arg) => {
                // tag for re-fetch
                if (result?.ids) {   // optional chaining ?. operator accesses an object's property or calls a function. If the object accessed or function called using this operator is undefined or null, the expression short circuits and evaluates to undefined instead of throwing an error.
                    return [
                        { type: 'Routine', id: 'LIST' },
                        ...result.ids.map((id) => ({type: 'Routine', id}))
                    ]
                } else {
                    return [{ type: 'Routine', id: 'LIST' }]
                }
            }
        }),
        addRoutine: builder.mutation({
            query: (args) => ({
                url: `/routines/`,
                headers: { authorization: `Bearer ${args.token}` },
                method: 'POST',
                body: args.body
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Routine', id: 'LIST'}]
        }),
        updateRoutine: builder.mutation({
            query: (args) => ({
                url: `/routines/${args.routineId}`,
                headers: { authorization: `Bearer ${args.token}` },
                method: 'PATCH',
                body: args.body
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Routine', id: arg.routineId }]
        }),
        deleteRoutine: builder.mutation({
            query: (args) => ({
                url: `/routines/${args.routineId}`,
                headers: { authorization: `Bearer ${args.token}` },
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Routine', id: arg.routineId }]
        })
    })
})

export const {
    useGetRoutinesQuery,
    useAddRoutineMutation,
    useUpdateRoutineMutation,
    useDeleteRoutineMutation
} = routinesApiSlice

// selectors
// returns the query result object
export const selectRoutinesResult = routinesApiSlice.endpoints.getRoutines.select()

// created memoized selector
const selectRoutinesData = createSelector(
    selectRoutinesResult,
    routinesResult => routinesResult.data   // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllRoutines,
    selectById: selectRoutineById,
    selectIds: selectRoutineIds
} = routinesAdapter.getSelectors(state => selectRoutinesData(state) ?? initialState)