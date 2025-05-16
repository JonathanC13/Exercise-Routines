import React from 'react'
import NavbarContainer from './NavbarContainer'
import { useSelector } from 'react-redux'
import { FaDoorOpen } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

const createChildLinks = (linkItems, urlTemplate, onClickHandler, theme) => {
    // console.log(linkItems)
    const comps = []
    for (let i = 0; i < linkItems.length; i ++) {
        const linkTo = urlTemplate.replace('${id}', linkItems[i]?.id)
        comps.push(
            <li className={`navbar-link-items-sub__li navbar-link-items-sub__li--color-${theme} cursor_pointer`} onClick={() => onClickHandler(linkTo)} key={i}>
                {linkItems[i]?.name.length > 20 ? linkItems[i]?.name.slice(0, 21) + '...' : linkItems[i]?.name}
            </li>
        )
    }
    return comps
}

const NavbarContainerItems = ( {category='', linkItems=[], showContainer=false, boundingRect={}} ) => {
    const navigate = useNavigate()

    const { categories } = useSelector((state) => state.nav)
    const theme = useSelector((state) => state.auth.preferredTheme)

    const categoryInfo = categories[category]

    const gotoDestinationHandler = (destination) => {
        navigate(destination)
    }

    const content =
        <ul className='navbar-link-items-main__ul'>
            <li className='link-items-main__li cursor_pointer' onClick={() => gotoDestinationHandler(categoryInfo?.parent?.URL)}>
                <div className={`navbar-link-item-parent-icon__div navbar-link-item-parent-icon__div--color-${theme}`}>
                    <FaDoorOpen className={`navbar-link-item-parent-icon__icon navbar-link-item-parent-icon__icon--color-${theme}`}></FaDoorOpen>
                </div>
                <h2 className={`navbar-nav-link-item__h2 navbar-nav-link-item__h2--color-${theme}`}>{categoryInfo?.parent?.title}</h2>
            </li>
            <ul className='navbar-link-items-sub__ul'>
                {createChildLinks(linkItems, categoryInfo?.children?.URL, gotoDestinationHandler, theme)}
            </ul>
        </ul>

  return (
    <NavbarContainer
        open={showContainer}
        child={content}
        boundingRect={boundingRect}
    ></NavbarContainer>
  )
}

export default NavbarContainerItems