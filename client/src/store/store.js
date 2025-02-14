import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import { apiSlice } from './slices/api/apiSlice'
import { authApiSlice } from './slices/api/authApiSlice'


export default configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware()
      .prepend(apiSlice.middleware)
      .concat(authApiSlice.middleware)
})