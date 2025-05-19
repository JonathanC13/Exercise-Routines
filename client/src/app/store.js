import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension';
import authReducer from '../features/auth/authSlice'
import navbarReducer from '../features/navbars/navbarSlice'
import { apiSlice } from './api/apiSlice'
// import { apiAuthSlice } from './api/apiAuthSlice';
import { authApiSlice } from '../features/auth/authApiSlice'
import { routinesApiSlice } from '../features/routines/routinesApiSlice'
import errorReducer from '../features/error/errorSlice';
import addFormModalsReducer from '../features/modals/addFormModals/addFormModalsSlice'

const composedEnhancer = composeWithDevTools({
})

export default configureStore({
  reducer: {
    auth: authReducer,
    nav: navbarReducer,
    addFormModals: addFormModalsReducer,
    errorState: errorReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    // [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [routinesApiSlice]: routinesApiSlice.reducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      // .concat(apiAuthSlice.middleware)
      .concat(authApiSlice.middleware)
      .concat(routinesApiSlice.middleware),
  devTools: true
}, composedEnhancer)