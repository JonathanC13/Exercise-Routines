import { apiSlice } from "../../app/api/apiSlice"
import { logOut } from "./authSlice"

// Define our single API slice object
export const authApiSlice = apiSlice.injectEndpoints({
    // The "endpoints" represent operations and requests for this server
    endpoints: (builder) => ({
        // The `login` endpoint is a "query" operation that returns data in the result object
        login: builder.mutation({
            
            query: (credentials) => ({
                method: 'POST',
                url: '/auth/login',
                body: {...credentials}
            })
            
        }),
        sendLogout: builder.mutation({
            query: () => ({
                method: 'POST',
                url: '/auth/logout',
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                // callback for query
                try {
                    const {data} = await queryFulfilled

                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState()) // clear the cache of this request
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        register: builder.mutation({
            query: (registerInfo) => ({
                method: 'POST',
                url: '/auth/register',
                body: {...registerInfo}
            })
        }),
      })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useLoginMutation, useSendLogoutMutation, useRegisterMutation } = authApiSlice