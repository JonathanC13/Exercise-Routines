import { useLocation, Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'

const RequireAuth = () => {
    const location = useLocation()
    // get from store the auth info.
    const auth = useSelector(state => state.auth)
    console.log(auth)
    // show the children if user exists, else go to login page.
    return (
        auth?.credentials?.email
            ? <Outlet />
            :
            <Navigate to='/login' state={{from: location}} replace></Navigate>
    )
}

export default RequireAuth