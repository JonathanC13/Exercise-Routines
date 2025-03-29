import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = 'http://localhost:5000/api/v1/' // import.meta.env.REACT_APP_BE_URL + '/auth' || 

// Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with
    baseQuery: fetchBaseQuery(
        {
            baseUrl: url, 
            credentials: 'include'
        }
    ),
    // For cached data, so when it is invalidated it will retrieve.
    tagTypes: ['User', 'Routine', 'Session', 'Exercise', 'Comment'],
    // The "endpoints" represent operations and requests for this server
    endpoints: (builder) => ({})
})