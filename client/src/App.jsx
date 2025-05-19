import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
// console.log(import.meta.env.VITE_BACKEND_URL) // remove this after you've confirmed it is working

import Layout from './components/Layout'
import AuthLayout from './features/auth/AuthLayout'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import Routines from './features/routines/Routines'
import Sessions from './features/sessions/Sessions'
import SessionPage from './features/sessions/SessionPage'
import AddFormModals from './features/modals/addFormModals/AddFormModals'
import Missing from './components/Missing'
import Home from './components/Home'
import RequireAuth from './components/RequireAuth'
import store from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router";
import PersistentLogin from './components/PersistentLogin'
import EditAccountSettings from './features/accountSettings/EditAccountSettings'
import Error from './features/error/Error'

function App() {

  return (
    <div className="App background-image">
      <Provider store={store}>
        <BrowserRouter>
            <Routes>
              {/* Public */}
              {/* <Route index element={<Home />}></Route> */}
              <Route element={<PersistentLogin></PersistentLogin>}>
                <Route path='/' element={<Layout/>}>
                  <Route index element={<Home/>}></Route>

                  <Route element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                  </Route>

                  {/* protected routes valid logged in users. */}
                  <Route element={<RequireAuth />}>
                    <Route path="routines">
                      <Route index element={<Routines />}></Route>
                      {/* <Route path=":routineId" element={<Routine />}></Route> */}
                      <Route path=":routineId/sessions">
                        <Route index element={<Sessions />}></Route>
                        <Route path=":sessionId" element={<SessionPage />}></Route>
                        {/* Route for exercises within the session */}
                      </Route>
                    </Route>

                    <Route path="/editAccountSettings" element={<EditAccountSettings></EditAccountSettings>}></Route>
                  </Route>
                </Route>
              </Route>

              <Route path='/error' element={<Error/>}></Route>

              {/* catach all */}
              <Route path='*' element={<Missing/>}></Route>
              
            </Routes>
        </BrowserRouter>
        <AddFormModals></AddFormModals>
      </Provider>
    </div>
  )
}

export default App
