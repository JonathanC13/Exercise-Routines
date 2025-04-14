import React from 'react'
import { FaChevronRight } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { currentCategorySet, categoriesHiddenSet } from './navbarSlice'

const ScreenNavbarItem = ( {title=null} ) => {
  const dispatch = useDispatch()

  const itemSelectedHandler = () => {
    dispatch(currentCategorySet({category: title}))
    dispatch(categoriesHiddenSet({hidden: true}))
  }

    const content = title ?
        <div className='screen-nav-item__div cursor_pointer' onClick={itemSelectedHandler}>
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