import React from 'react'
import { NavLink } from 'react-router'
import { useSelector } from 'react-redux'
 
const Home = () => {

  const {id} = useSelector(state => state.auth.credentials) // a user is logged in.
  const theme = useSelector(state => state.auth.preferredTheme)
  
  const content = id ? 
    <div className='home__div'>
      <p className={`home__p home__p--color-${theme}`}>Go create and view your</p>
      <NavLink className='home-routines__nlink cursor_pointer' to='/routines'>Routines</NavLink>
    </div>
    :
    <div className='home__div'>
      <p className={`home__p home__p--color-${theme}`}>To start creating and viewing your routines, you must either:</p>
      <div className="home-auth-options__div">
        <NavLink className='home-signup__nlink cursor_pointer' to='register'>Register</NavLink>
        <NavLink className='home-signup__login cursor_pointer' to='login'>Log in</NavLink>
      </div>
    </div>
    

  return (
    <div className='home__div'>
      <section className={`home__section home__section--color-${theme}`}>
        <h1 className={`home__h1 home__h1--color-${theme}`}>Welcome!</h1>
        <p className={`home__p home__p--color-${theme}`}>This application is for users to create workout routines that include sessions, exercises, and the sets.</p>

        {content}
      </section>
    </div>
  )
}

export default Home