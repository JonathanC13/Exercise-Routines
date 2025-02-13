import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <section className="auth-layout__section">
        <h1>Auth</h1>
        <Outlet/>
    </section>
  )
}

export default AuthLayout