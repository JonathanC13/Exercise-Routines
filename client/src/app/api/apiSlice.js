import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { loggedOut } from '../../features/auth/authSlice'

const url = 'http://localhost:5000/api/v1/' // import.meta.env.REACT_APP_BE_URL + '/auth' || 

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log('1: ',result)
    if (result.error && result.error.status === 401) {
      // try to get a new token
      const refreshResult = await baseQuery('/userRefreshToken', api, extraOptions)
      console.log('1: ',refreshResult)
      if (refreshResult.data?.token) {
        // store the new token
        api.dispatch(tokenReceived(refreshResult.data.token))
        // retry the initial query
        result = await baseQuery(args, api, extraOptions)
      } else {
        api.dispatch(loggedOut())
      }
    }
    return result
}

const baseQuery = fetchBaseQuery({
    baseUrl: url,
    credentials: 'include'
})

// Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with
    baseQuery: baseQueryWithReauth,
    // For cached data, so when it is invalidated it will retrieve.
    tagTypes: ['Routine', 'Session', 'Exercise', 'Comment'],
    // The "endpoints" represent operations and requests for this server
    endpoints: (builder) => ({})
})