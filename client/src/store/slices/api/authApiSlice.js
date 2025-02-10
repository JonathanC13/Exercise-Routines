import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const url = 'http://localhost:5000/api/v1/auth' // import.meta.env.REACT_APP_BE_URL + '/auth' || 

// Define our single API slice object
export const authApiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with
    baseQuery: fetchBaseQuery({baseUrl: url}),
    // The "endpoints" represent operations and requests for this server
    endpoints: (builder) => ({
        // The `login` endpoint is a "query" operation that returns data in the result object
        login: builder.mutation({
            
            query: (credentials) => ({
                method: 'POST',
                url: '/login',
                body: credentials
            })
            
        }),
        register: builder.mutation({
            query: (registerInfo) => ({
                method: 'POST',
                url: '/register',
                body: registerInfo
            })
        }),
      })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useLoginMutation, useRegisterMutation } = authApiSlice