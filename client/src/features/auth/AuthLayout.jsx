import React from 'react'
import { Outlet, NavLink } from 'react-router'
import { useSelector } from 'react-redux'

const AuthLayout = () => {

  const theme = useSelector((state) => state.auth.preferredTheme)

  return (
    <div className="auth-layout__div">
      <section className={`auth-layout__section auth-layout__section--color-${theme}`}>
        <div className='auth-options__container'>
          <ul className={`auth-options__ul auth-options__ul--color-${theme}`}>
            <li className='auth-options__li'>
              <NavLink className={` auth__navlink auth__navlink--color-${theme} login__navlink`} to="/login" end>
                Log in
              </NavLink>
            </li>
            <li className='auth-options__li'>
              <NavLink className={` auth__navlink auth__navlink--color-${theme} login__navlink`} to="/register" end>
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