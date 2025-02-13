import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
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
        {/* <NavBar></NavBar> */}
        <Routes>
          <Route index element={<h1>Hello</h1>}></Route>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
