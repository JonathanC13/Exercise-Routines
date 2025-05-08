import React from 'react'
import { FaMoon, FaUserGear } from 'react-icons/fa6'
import { useSelector, useDispatch } from 'react-redux'
import { useUserSendInfoUpdateMutation } from '../auth/authApiSlice'
import { useNavigate } from 'react-router-dom'
import { screenNavClosed } from '../navbars/navbarSlice'

const AccountSettings = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useSelector(state => state.auth.credentials)
    const {preferredTheme} = useSelector(state => state.auth)

    const [updateUserInfo, {isLoading}] = useUserSendInfoUpdateMutation()

    const moonClass = 'account-settings-moon' + (preferredTheme === 'light' ? '--light' : '--dark')

    const togglePreferredTheme = () => {
      const body = {preferredTheme: preferredTheme === 'light' ? 'dark' : 'light', email: 'JOn@joN.com'}
      updateUserInfoHandler(body)
    }
    const updateUserInfoHandler = (body) => {
      try {
        const response = updateUserInfo({id, body: body})
      } catch (err) {
        console.log(err)
      }
    }

    const goToEditAccountSettings = () => {
      dispatch(screenNavClosed())
      navigate('/editAccountSettings')
    }

  return (
    <div className='account-settings-opt__div'>
        <button className='account-settings__btn cursor_pointer'><FaUserGear className='account-settings-cog' onClick={goToEditAccountSettings}></FaUserGear></button>
        <button className='account-settings__btn cursor_pointer' onClick={togglePreferredTheme}><FaMoon className={moonClass}></FaMoon></button>
    </div>
  )
}

//https://www.google.com/search?client=firefox-b-d&q=react+apply+dark+mode

export default AccountSettings