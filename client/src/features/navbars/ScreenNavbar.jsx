import React from 'react'
import navLogo from '../../assets/logoipsum-331.svg'
import { useSelector, useDispatch } from 'react-redux'
import { screenNavDispaySet } from './navbarSlice'
import { FaXmark } from 'react-icons/fa6'

const ScreenNavbar = () => {
    const dispatch = useDispatch()
    const {screenNavOpen} = useSelector((state) => state.nav)
    const {auth} = useSelector((state) => state.auth.credentials)

    const screenNavClasses = 'screen-nav__section' + (screenNavOpen ? ' screen-nav__section-show':'')

    const closeScreenNavHandler = () => {
        dispatch(screenNavDispaySet({displayState: false}))
    }

  return (
        <section className={screenNavClasses}>
            
            <div className="screen-nav__div">
                <p>aaaaaaaaaaaaaaa</p>
            </div>
            <div className="screen-nav__footer">
                <div className="nav-logo">
                    <a className='nav-logo__a logo cursor_pointer' href="/">
                        <img src={navLogo} alt="logo" />
                    </a>
                </div>
                <button className='screen-nav-close__btn cursor_pointer' onClick={closeScreenNavHandler}>
                    <FaXmark className='x-mark'></FaXmark>
                </button>
            </div>
        </section>
    )
}

export default ScreenNavbar