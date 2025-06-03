import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import NavbarItem from './NavbarItem'
import NavbarManageAccountItem from './NavbarManageAccountItem'
import NavbarGeneralItem from './NavbarGeneralItem'

const createNavItems = (navItems) => {

  const comps = []

  for (let i = 0; i < navItems.length; i ++) {
    comps.push(<NavbarItem key={i} item={navItems[i]}></NavbarItem>)
  }

  return comps
}

const NavbarItems = () => {
    const creds = useSelector(state => state.auth.credentials)

    // depending on page value in redux store, populate the nav bar items
    // const navItems = []
    let content = <></>
    
    if (creds?.id) {
        // navItems.push(['Routines', {action: 'redirect', to: '/routines'}])
        // navItems.push(['Log out', {action: 'dispatch', query: 'logout'}])
        content = <>
            <NavbarGeneralItem category='routines'></NavbarGeneralItem>
            <NavbarGeneralItem category='account'></NavbarGeneralItem>
            {/* <NavbarManageAccountItem></NavbarManageAccountItem> */}
          </>
    } else {
        // navItems.push(['Log in', {action: 'redirect', to: '/login'}])
        content =
          <li className='navbar-item__li cursor_pointer'>
            <NavLink className='navbar-login' to='/login'>Log in</NavLink>
          </li>
    }

  return (
    <ul className="navbar-items__ul">
        {content}
    </ul>
  )
}

export default NavbarItems