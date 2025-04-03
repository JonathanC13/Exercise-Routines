import React from 'react'
import { Outlet, NavLink } from 'react-router'

const AuthLayout = () => {

  return (
    <div className="auth-layout__div">
      <section className="auth-layout__section">
        <div className='auth-options__container'>
          <ul className="auth-options__ul">
            <li className='auth-options__li'>
              <NavLink className='auth__navlink login__navlink' to="/login" end>
                Login
              </NavLink>
            </li>
            <li className='auth-options__li'>
              <NavLink className='auth__navlink register__navlink' to="/register" end>
                Register
              </NavLink>
            </li>
          </ul>
        </div>
        <Outlet/>
      </section>
    </div>
  )
}

export default AuthLayout