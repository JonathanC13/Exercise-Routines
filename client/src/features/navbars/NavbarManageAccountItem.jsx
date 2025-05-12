import React from 'react'
import { useRef, useState, useEffect } from 'react'
import NavbarManageAccountContainer from './NavbarManageAccountContainer'
import { FaCircleUser } from 'react-icons/fa6'

const NavbarManageAccountItem = () => {

  const itemRef = useRef(null)
  const [showContainer, setShowContainer] = useState()
  const [boundingRect, setBoundingRect] = useState()

  const enableContainer = () => {
    setShowContainer(true)
  }

  const disableContainer = () => {
    setShowContainer(false)
  }

  useEffect(() => {
    if (itemRef.current !== null) {
      itemRef.current.addEventListener('mouseenter', enableContainer)
      itemRef.current.addEventListener('focusin', enableContainer)
      itemRef.current.addEventListener('mouseleave', disableContainer)
      itemRef.current.addEventListener('focusout', disableContainer)

      setBoundingRect(itemRef.current.getBoundingClientRect())
    }

    const cleanUp = () => {
      if (itemRef.current !== null) {
        itemRef.current.removeEventListener('mouseenter', enableContainer)
        itemRef.current.removeEventListener('focusin', enableContainer)
        itemRef.current.removeEventListener('mouseleave', disableContainer)
        itemRef.current.removeEventListener('focusout', disableContainer)
      }
    }
    return cleanUp
  }, [itemRef.current])

  return (
    <>
      <NavbarManageAccountContainer showContainer={showContainer} boundingRect={boundingRect}></NavbarManageAccountContainer>
      <li 
        ref={itemRef}
        className='navbar-item__li cursor_pointer'
      >
        <FaCircleUser></FaCircleUser>
      </li>
    </>
  )
}

export default NavbarManageAccountItem