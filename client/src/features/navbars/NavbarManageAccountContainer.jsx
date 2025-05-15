import React from 'react'
import NavbarContainer from './NavbarContainer'
import LogoutButton from '../../components/LogoutButton'
import AccountSettings from '../accountSettings/AccountSettings'

const NavbarManageAccountContainer = ( {showContainer=false, boundingRect={}} ) => {

    const content = <div className='nav-manage-acc__div'>
      <AccountSettings></AccountSettings>
      <LogoutButton></LogoutButton>
    </div>

  return (
    <NavbarContainer
        open={showContainer}
        child={content}
        boundingRect={boundingRect}
    ></NavbarContainer>
  )
}

export default NavbarManageAccountContainer