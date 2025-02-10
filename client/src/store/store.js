import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import { authApiSlice } from './slices/api/authApiSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware()
      .prepend(authApiSlice.middleware)
})