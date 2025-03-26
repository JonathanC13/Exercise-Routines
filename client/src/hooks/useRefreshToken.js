import { useUserRefreshTokenMutation } from "../features/auth/authApiSlice"
import { credentialsSet } from '../features/auth/authSlice'
import { useSelector, useDispatch } from "react-redux"

const useRefreshToken = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [refreshToken, {isLoading}] = useUserRefreshTokenMutation()

    const refresh = async() => {
        try {
            const response = await refreshToken().unwrap()
                .then((payload) => {
                    console.log('previous token: ', auth.token)
                    console.log('new token ', payload.token)
                    dispatch(credentialsSet({...auth, token: payload?.token}))
                    return payload?.token
                })
                .error((error) => {
                    if (!error?.data) {
                        console.log('No server response!')
                    } else if (error?.data?.message) {
                        const message = error?.data?.message ?? 'Error!'
                        console.log(message)
                    } else {
                        console.log('Refresh failed!')
                    }
                    return null
                })
        } catch (error) {
            console.log('refresh err: ', error)
            return null
        }
    }

    return refresh
}

export default useRefreshToken