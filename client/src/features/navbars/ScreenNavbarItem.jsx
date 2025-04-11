import React from 'react'
import { FaChevronRight } from 'react-icons/fa6'

const ScreenNavbarItem = ( {title=null} ) => {

    const content = title ?
        <div className='screen-nav-item__div cursor_pointer'>
            <p className='screen-nav-item__p'>{title}</p>
            <FaChevronRight className='screen-nav-item__icon'></FaChevronRight>
        </div>
        :
        <></>

  return (
    content
  )
}

export default ScreenNavbarItem