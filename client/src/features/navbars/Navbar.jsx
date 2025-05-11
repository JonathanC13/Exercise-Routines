import React from 'react'
import navLogo from '../../assets/logoipsum-331.svg'
import { FaBars } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { screenNavDispaySet } from './navbarSlice'
import NavbarItems from './NavbarItems'

const NavBar = () => {
  const dispatch = useDispatch()

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
        <NavbarItems/>
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