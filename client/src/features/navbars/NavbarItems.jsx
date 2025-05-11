import React from 'react'
import { useSelector } from 'react-redux'
import NavbarItem from './NavbarItem'

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
    const navItems = []
    
    if (creds?.id) {
        // navItems.push(['Routines', {action: 'container'}])
        navItems.push(['Routines', {action: 'redirect', to: '/routines'}])
        navItems.push(['Log out', {action: 'dispatch', query: 'logout'}])
        
    } else {
        navItems.push(['Log in', {action: 'redirect', to: '/login'}])
    }

  return (
    <ul className="navbar-items__ul">
        {createNavItems(navItems)}
    </ul>
  )
}

export default NavbarItems