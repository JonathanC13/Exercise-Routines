import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { categoriesHiddenSet, screenNavDispaySet } from './navbarSlice'
import { useNavigate } from 'react-router-dom'
import ScreenNavbarItems from './ScreenNavbarItems'
import ScreenNavFooter from './ScreenNavFooter'

const ScreenNavbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {screenNavOpen} = useSelector((state) => state.nav)
    const {auth} = useSelector((state) => state.auth.credentials)

    const screenNavClasses = 'screen-nav__section' + (screenNavOpen ? ' screen-nav__section-show':'')

    const authOptionHandler = (action) => {
        closeScreenNavHandler()
        switch(action) {
            case 'login':
                navigate('/login')
                break
            case 'logout':
                dispatch(categoriesHiddenSet({hidden: false}))
                dispatch(screenNavDispaySet({dispalyState: false}))
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
                {/* {auth?.token ? <ScreenNavbarItems></ScreenNavbarItems> : <></>} */}
                <ScreenNavbarItems></ScreenNavbarItems>
            </div>
            <div className="screen-nav__div">
                {authOption}
            </div>
            <ScreenNavFooter></ScreenNavFooter>
        </section>
    )
}

export default ScreenNavbar