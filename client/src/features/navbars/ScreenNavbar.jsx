import React from 'react'
import navLogo from '../../assets/logoipsum-331.svg'
import { useSelector, useDispatch } from 'react-redux'
import { screenNavDispaySet } from './navbarSlice'
import { FaXmark } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import ScreenNavbarItems from './ScreenNavbarItems'

const ScreenNavbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {screenNavOpen} = useSelector((state) => state.nav)
    const {auth} = useSelector((state) => state.auth.credentials)

    const screenNavClasses = 'screen-nav__section' + (screenNavOpen ? ' screen-nav__section-show':'')

    const closeScreenNavHandler = () => {
        dispatch(screenNavDispaySet({displayState: false}))
    }

    const authOptionHandler = (action) => {
        closeScreenNavHandler()
        switch(action) {
            case 'login':
                navigate('/login')
                break
            case 'logout':
                dispatch(userSendLogOut())
                navigate('/')
                break
            default:
                break
        }
    }

    const authOption = auth?.token ?
        <div className='auth-option__div'>
            <button className='logout__button cursor_pointer' onClick={() => authOptionHandler('logout')}>Log out</button>
        </div>
        :
        <div className='auth-option__div'>
            <button className='login__button cursor_pointer' onClick={() => authOptionHandler('login')}>Log in</button>
        </div>



  return (
        <section className={screenNavClasses}>
            <div className='screen-nav-content__div'>
                <ScreenNavbarItems></ScreenNavbarItems>
                <div className="screen-nav__div">
                    {authOption}
                </div>
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