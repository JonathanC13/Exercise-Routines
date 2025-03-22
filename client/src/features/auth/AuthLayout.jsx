import React from 'react'
import { Outlet, NavLink } from 'react-router'

const AuthLayout = () => {
  return (
    <section className="auth-layout__section">
        <h1>Auth</h1>
        <NavLink to="/login" end>
          Login
        </NavLink>
        <NavLink to="/register" end>
          Register
        </NavLink>
        <Outlet/>
    </section>
  )
}

export default AuthLayout