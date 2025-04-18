import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { currentCategorySet, categoriesHiddenSet, screenNavDispaySet, screenNavClosed } from './navbarSlice'
import { useNavigate } from 'react-router-dom'
import ScreenNavbarItems from './ScreenNavbarItems'
import ScreenNavFooter from './ScreenNavFooter'
import { useUserSendLogOutMutation } from '../auth/authApiSlice'

const ScreenNavbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {screenNavOpen} = useSelector((state) => state.nav)
    const auth = useSelector((state) => state.auth.credentials)

    const [logOut, {isLoadingLogOut}] = useUserSendLogOutMutation()

    const screenNavClasses = 'screen-nav__section' + (screenNavOpen ? ' screen-nav__section-show':'')

    const closeScreenNavHandler = () => {
        dispatch(screenNavClosed())
    }

    const authOptionHandler = async(action) => {
        closeScreenNavHandler()
        switch(action) {
            case 'login':
                navigate('/login')
                break
            case 'logout':
                try {
                    const response = await logOut().unwrap()
                        .then((payload) => {
                        })
                        .catch((error) => {
                        })
        
                } catch (err) {
                    setMsg('Log out failed!')
                    msgRef.current.focus()
                } finally {
                }
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
                {auth?.token ? <ScreenNavbarItems></ScreenNavbarItems> : <></>}
            </div>
            <div className="screen-nav__div">
                {authOption}
            </div>
            <ScreenNavFooter></ScreenNavFooter>
        </section>
    )
}

export default ScreenNavbar