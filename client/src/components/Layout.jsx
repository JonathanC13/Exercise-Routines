import React from 'react'
import NavBar from '../features/navbars/Navbar';
import { Outlet } from 'react-router-dom';
import SideNavbar from '../features/navbars/ScreenNavbar';

const Layout = () => {

    // put navdata into a redux slice
    const navData = {home: {to: '/', text: 'Home'}}

  return (
    <section className="Layout__section">
        <SideNavbar></SideNavbar>
        <div className='content__div'>
          <Outlet />
        </div>
        <NavBar></NavBar>
    </section>
  )
}

export default Layout