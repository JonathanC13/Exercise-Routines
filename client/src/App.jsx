import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Login from './components/Login'
import store from './store/store'
import { Provider } from 'react-redux'

function App() {


  return (
    <Provider store={store}>
      {/* <NavBar></NavBar> */}
      <Login></Login>
    </Provider>
  )
}

export default App
