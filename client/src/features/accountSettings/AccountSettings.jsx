import React from 'react'
import { FaMoon, FaUserGear } from 'react-icons/fa6'
import { useSelector, useDispatch } from 'react-redux'

const AccountSettings = () => {
    const dispatch = useDispatch()
    const {credentials} = useSelector(state => state.auth)

    const moonClass = 'account-settings-moon' + (credentials?.preferredTheme === 'light' ? ' account-settings-moon--light' : '')
  return (
    <div className='account-settings-opt__div'>
        <button className='account-settings__btn cursor_pointer'><FaUserGear className='account-settings-cog'></FaUserGear></button>
        <button className='account-settings__btn cursor_pointer'><FaMoon className={moonClass}></FaMoon></button>
    </div>
  )
}

//https://www.google.com/search?client=firefox-b-d&q=react+apply+dark+mode

export default AccountSettings