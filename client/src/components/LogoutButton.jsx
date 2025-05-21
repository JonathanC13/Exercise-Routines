import React from 'react'
import { useUserSendLogOutMutation } from '../features/auth/authApiSlice'
import { useNavigate } from 'react-router-dom'
import { errorStatusSet, errorStatusCleared } from '../features/error/errorSlice'
import errorTextConversion from '../functions/errorTextConversion'
import { useDispatch } from 'react-redux'

const LogoutButton = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logOut, {isLoading}] = useUserSendLogOutMutation()

    const logOutHandler = async(e) => {
        e.currentTarget.classList.add('disabled')
        try {
            const response = await logOut().unwrap()
                .then((payload) => {
                    dispatch(errorStatusCleared())
                })
                .catch((error) => {
                    dispatch(errorStatusSet(errorTextConversion(error)))
                })

        } catch (err) {
            // console.log(err)
        } finally {
            if (e.currentTarget !== null) {
                e.currentTarget.remove('disabled')
            }
            navigate('/')
        }
    }

  return (
    <button className='logout__button cursor_pointer' onClick={logOutHandler}>Log out</button>
  )
}

export default LogoutButton