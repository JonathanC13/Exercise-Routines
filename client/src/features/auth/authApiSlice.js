import { apiSlice } from "../../app/api/apiSlice"
import { loggedOut, credentialsSet } from "./authSlice"

// Define our single API slice object
export const authApiSlice = apiSlice.injectEndpoints({
    // The "endpoints" represent operations and requests for this server
    endpoints: (builder) => ({
        // The `login` endpoint is a "query" operation that returns data in the result object
        userSendLogin: builder.mutation({
            
            query: (credentials) => ({
                method: 'POST',
                url: '/auth/login',
                body: {...credentials}
            })
            
        }),
        userRefreshToken: builder.query({
            query: () => ({
                method: 'GET',
                url: '/auth/refreshToken'
            }),
        }),
        userSendLogOut: builder.mutation({
            query: () => ({
                method: 'POST',
                url: '/auth/logout'
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                // callback for query
                try {
                    const {data} = await queryFulfilled

                    dispatch(loggedOut())
                    dispatch(authApiSlice.util.resetApiState()) // clear the cache of this request
                } catch (err) {
                    // console.log(err)
                }
            }
        }),
        userSendRegister: builder.mutation({
            query: (registerInfo) => ({
                method: 'POST',
                url: '/auth/register',
                body: {...registerInfo}
            })
        }),
        userSendInfoUpdate: builder.mutation({
            query: (updateInfo) => ({
                method: 'PATCH',
                url: `/auth/updateUserInfo/${updateInfo.id}`,
                body: updateInfo.body
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                // callback for query
                try {
                    const {data} = await queryFulfilled
                    // console.log(data.user)

                    dispatch(credentialsSet(data.user))
                    dispatch(authApiSlice.util.resetApiState()) // clear the cache of this request
                } catch (err) {
                    // console.log(err)
                }
            }
        }),
        userSendPasswordUpdate: builder.mutation({
            query: (updateInfo) => ({
                method: 'PATCH',
                url: `/auth/updatePassword/${updateInfo.id}`,
                body: updateInfo.body
            })
        })
      })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useUserSendLoginMutation, useLazyUserRefreshTokenQuery, useUserSendLogOutMutation, useUserSendRegisterMutation, useUserSendInfoUpdateMutation, useUserSendPasswordUpdateMutation } = authApiSlice