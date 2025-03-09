import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension';
import authReducer from '../features/auth/authSlice'
import { apiSlice } from './api/apiSlice'
import { authApiSlice } from '../features/auth/authApiSlice'
import { routinesApiSlice } from '../features/routines/routinesApiSlice'
import addFormModalsReducer from '../features/modals/addFormModals/addFormModalsSlice'

const composedEnhancer = composeWithDevTools({
})

export default configureStore({
  reducer: {
    auth: authReducer,
    addFormModals: addFormModalsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [routinesApiSlice]: routinesApiSlice.reducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(authApiSlice.middleware)
      .concat(routinesApiSlice.middleware),
  devTools: true
}, composedEnhancer)