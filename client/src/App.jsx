import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Layout from './components/Layout'
import AuthLayout from './features/auth/AuthLayout'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import Dashboard from './components/Dashboard'
import DashboardHome from './components/DashboardHome'
import AddRoutine from './features/routines/AddRoutine'
import RoutineHome from './features/routines/RoutineHome'
import Routine from './features/routines/Routine'
import store from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            <Route index element={<Layout />}> 
              {/* Public */}
              <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              {/* later protected routes, fo valid logged in users. */}
              <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<DashboardHome />}></Route>
                <Route path="/addRoutine" element={<AddRoutine />}></Route>
                <Route path="Routines">
                  <Route index element={<RoutineHome />}></Route>
                  <Route path=":routineId" element={<Routine />}></Route>
                  {/* Route for Sessions within the Routine */}
                    {/* Route for exercises within the session */}
                </Route>
                
              </Route>
            </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
