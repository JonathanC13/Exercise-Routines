import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Layout from './components/Layout'
import AuthLayout from './features/auth/AuthLayout'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import Routines from './features/routines/Routines'
import Sessions from './features/sessions/Sessions'
import SessionPage from './features/sessions/SessionPage'
import AddFormModals from './features/modals/addFormModals/AddFormModals'
import Missing from './components/Missing'
// import Home from './components/Home'
import RequireAuth from './components/RequireAuth'
import store from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router";
import PersistentLogin from './components/PersistentLogin'

function App() {

  return (
    <div className="App background-image">
      <Provider store={store}>
        <BrowserRouter>
            <Routes>
              {/* Public */}
              {/* <Route index element={<Home />}></Route> */}
              <Route path='/' element={<Layout/>}>
                <Route element={<AuthLayout />}>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </Route>

                {/* protected routes valid logged in users. */}
                <Route element={<PersistentLogin></PersistentLogin>}>
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
                  </Route>
                </Route>

                {/* catach all */}
                <Route path='*' element={<Missing/>}></Route>
              </Route>
            </Routes>
        </BrowserRouter>
        <AddFormModals></AddFormModals>
      </Provider>
    </div>
  )
}

export default App
