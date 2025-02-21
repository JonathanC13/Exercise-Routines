import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import NavBar from './components/NavBar'
import Layout from './components/Layout'
import AuthLayout from './features/auth/AuthLayout'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import Dashboard from './components/Dashboard'
import DashboardHome from './components/DashboardHome'
import Routines from './features/routines/Routines'
import Routine from './features/routines/Routine'
import Sessions from './features/sessions/Sessions'
import SessionPage from './features/sessions/SessionPage'
import store from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
            <Routes>
              <Route index element={<h1>hello</h1>}></Route>
              <Route element={<Layout />}> 
                {/* Public */}
                <Route element={<AuthLayout />}>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </Route>

                {/* later protected routes, for valid logged in users. */}
                <Route path="routines">
                  <Route index element={<Routines />}></Route>
                  {/* <Route path=":routineId" element={<Routine />}></Route> */}
                  <Route path=":routineId/sessions">
                    <Route index element={<Sessions />}>
                      <Route path=":sessionId" element={<SessionPage />}></Route>
                    </Route>
                    {/* Route for exercises within the session */}
                  </Route>
                  
                </Route>
                  
              </Route>
            </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
