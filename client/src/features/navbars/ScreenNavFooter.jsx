import React, { useDebugValue } from 'react'
import navLogo from '../../assets/logoipsum-331.svg'
import { FaXmark, FaChevronLeft } from 'react-icons/fa6'
import { useSelector, useDispatch } from 'react-redux'
import { currentCategorySet, screenNavDispaySet, categoriesHiddenSet, screenNavClosed } from './navbarSlice'

const ScreenNavFooter = () => {
    const dispatch = useDispatch()
    const { categoriesHidden } = useSelector((state) => state.nav)

    const screenNavBackHandler = () => {
        dispatch(currentCategorySet({category: ''}))
        dispatch(categoriesHiddenSet({hidden: false}))
    }

    const closeScreenNavHandler = () => {
        dispatch(screenNavClosed())
    }

  return (
    <div className="screen-nav__footer">
        <div className={'screen-nav-back__div cursor_pointer' + (categoriesHidden ? ' screen-nav-back__div-show' : '')} onClick={screenNavBackHandler}>
            <FaChevronLeft className='back-chevron'></FaChevronLeft>
            <p className='back-text'>Back</p>
        </div>
        <div className={'nav-logo' + (categoriesHidden ? ' nav-logo-hidden' : '')}>
            <a className='nav-logo__a logo cursor_pointer' href="/">
                <img src={navLogo} alt="logo" />
            </a>
        </div>
        
        <button className='screen-nav-close__btn cursor_pointer' onClick={closeScreenNavHandler}>
            <FaXmark className='x-mark'></FaXmark>
        </button>
    </div>
  )
}

export default ScreenNavFooter