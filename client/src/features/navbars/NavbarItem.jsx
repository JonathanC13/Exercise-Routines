import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {useUserSendLogOutMutation} from '../auth/authApiSlice'

const NavbarItem = ( {item = []} ) => {
    if (item.length === 0) {
        return <></>
    }

    // const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logOut, {isLoading}] = useUserSendLogOutMutation()

    const itemOnClickHandler = async() => {
        switch (item[1].action) {
            case ('dispatch'):
                switch (item[1].query) {
                    case ('logout'):
                        try {
                            const response = await logOut().unwrap()
                                .then((payload) => {
                                })
                                .catch((error) => {
                                })
                
                        } catch (err) {
                            console.log('error logout')
                            // setMsg('Log out failed!')
                            // msgRef.current.focus()
                        } finally {
                            navigate('/')
                        }
                        break;
                    default:
                        break;
                }
                break;
            case ('redirect'):
                navigate(item[1].to)
                break;
            default:
                break;
        }
    }


  return (
    <li className='navbar-item__li cursor_pointer' onClick={itemOnClickHandler}>
        {item[0]}
    </li>
  )
}

export default NavbarItem