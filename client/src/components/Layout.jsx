import React from 'react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

const Layout = () => {
    let navigate = useNavigate();

    // useEffect(() => {
    //     if (false) {
    //         navigate('/login')
    //     } else {
    //         navigate('/register')
    //     }
    // }, [])
    

  return (
    <section className="Home__section">
        <Outlet />
    </section>
  )
}

export default Layout