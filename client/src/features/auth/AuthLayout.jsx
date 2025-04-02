import React from 'react'
import { Outlet, NavLink } from 'react-router'

const AuthLayout = () => {

  console.log('rerender')

  return (
    <section className="auth-layout__section">
      <div className='auth-options__container'>
        <span className='slider'></span>
        <ul className="auth-options__ul">
          <li className='auth-options__li'>
            <NavLink className='auth__navlink login__navlink' to="/login" end>
              Login
            </NavLink>
          </li>
          <li className='auth-options__li'>
            <NavLink className='auth__navlink' to="/register" end>
              Register
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet/>
    </section>
  )
}

export default AuthLayout