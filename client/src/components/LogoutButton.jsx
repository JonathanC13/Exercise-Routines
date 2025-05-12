import React from 'react'
import { useUserSendLogOutMutation } from '../features/auth/authApiSlice'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
    const navigate = useNavigate()
    const [logOut, {isLoading}] = useUserSendLogOutMutation()

    const logOutHandler = async() => {
        try {
            const response = await logOut().unwrap()
                .then((payload) => {
                })
                .catch((error) => {
                })

        } catch (err) {
            console.log(err)
        } finally {
            navigate('/')
        }
    }

  return (
    <button className='logout__button cursor_pointer' onClick={logOutHandler}>Log out</button>
  )
}

export default LogoutButton