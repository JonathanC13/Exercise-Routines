import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Layout from './components/Layout'
import AuthLayout from './components/AuthLayout'
import Login from './components/Login'
import Register from './components/Register'
import store from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route index element={<Layout />}> 
            {/* Public */}
            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* later protected routes, fo valid logged in users. */}
            {/* Dashboard has the components like header, containers for the data */}
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
