import React from 'react'
import NavbarContainer from './NavbarContainer'

const NavbarManageAccountContainer = ( {showContainer=false, boundingRect={}} ) => {

    const content = <p>hello</p>

  return (
    <NavbarContainer
        open={showContainer}
        child={content}
        boundingRect={boundingRect}
    ></NavbarContainer>
  )
}

export default NavbarManageAccountContainer