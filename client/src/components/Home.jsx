import React from 'react'
import { NavLink } from 'react-router'
 
const Home = () => {
  return (
    <section>
      <p>Home</p>
      <NavLink to='/'>Home</NavLink>
      <br />
      <NavLink to='/login'>Login</NavLink>
      <br />
      <NavLink to='/register'>Register</NavLink>
      <br />
      <NavLink to='/routines'>Routines</NavLink>
    </section>
  )
}

export default Home