import React from 'react'
import { useRef, useState, useEffect } from 'react'
import useGetSortedRoutines from '../../hooks/useGetSortedRoutines'
import NavbarManageAccountContainer from './NavbarManageAccountContainer'
import NavbarContainerItems from './NavbarContainerItems'
import NavbarContainer from './NavbarContainer'
import { FaCircleUser } from 'react-icons/fa6'

const NavbarGeneralItem = ( {category=''} ) => {

    const itemRef = useRef(null)
    const [showContainer, setShowContainer] = useState()
    const [boundingRect, setBoundingRect] = useState()
    const {sortedRoutines} = useGetSortedRoutines()

    let navTitle = ''
    // let linkItems = new Array()
    let containerContent = <></>
    switch(category) {
        case 'account':
            navTitle = <FaCircleUser></FaCircleUser>
            containerContent = <NavbarManageAccountContainer showContainer={showContainer} boundingRect={boundingRect}></NavbarManageAccountContainer>
            break
        case 'routines':
            navTitle = category.charAt(0).toUpperCase() + category.slice(1)
            // linkItems = sortedRoutines;
            containerContent = <NavbarContainerItems category={category} linkItems={sortedRoutines} showContainer={showContainer} boundingRect={boundingRect}></NavbarContainerItems>
            break;
        default:
            break
    }

    const enableContainer = () => {
        setShowContainer(true)
    }

    const disableContainer = () => {
        setShowContainer(false)
    }

    useEffect(() => {
        if (itemRef.current !== null) {
            setBoundingRect(itemRef.current.getBoundingClientRect())
        }
    }, [showContainer])

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
        {containerContent}
        <li 
            ref={itemRef}
            className='navbar-item__li cursor_pointer'
        >
            {navTitle}
        </li>
    </>
  )
}

export default NavbarGeneralItem