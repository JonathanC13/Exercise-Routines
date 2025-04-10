import React from 'react'
import navLogo from '../../assets/logoipsum-331.svg'
import { FaBars } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { screenNavDispaySet } from './navbarSlice'

const createNavItems = (navData) => {

  const comps = []

  for (let [key, val] of Object.entries(navData)) {
    comps.push(
      <NavLink to={val.to}
          key={key}
          className='navbar-nav__navLink'
      >{val.text}</NavLink>
    )
  }
  return comps
}

const NavBar = () => {
  const dispatch = useDispatch()
      // depending on page value in redux store, populate the nav bar items
  const navData = {home: {to: '/', text: 'Home'}}

  const openScreenNavHandler = () => {
    dispatch(screenNavDispaySet({displayState: true}))
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <a className='nav-logo__a logo cursor_pointer' href="/">
            <img src={navLogo} alt="logo" />
        </a>
      </div>
      <nav className="navbar__nav nav-items">
        <ul className="nav-items__ul">
          {createNavItems(navData)}
        </ul>
      </nav>
      <div className="screen-nav-btn__div">
        <button className='cursor_pointer screen-nav__btn' onClick={openScreenNavHandler}>
          <FaBars className='hamburger'/>
        </button>
      </div>
    </div>
  )
}

export default NavBar