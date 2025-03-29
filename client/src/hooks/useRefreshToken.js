import { useLazyUserRefreshTokenQuery } from "../features/auth/authApiSlice"
import { credentialsSet } from '../features/auth/authSlice'
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react'

const useRefreshToken = () => {
    const auth = useSelector(state => state.auth.credentials)
    const dispatch = useDispatch()

    const [refreshToken, { data, isLoading, isSuccess }] = useLazyUserRefreshTokenQuery()

    useEffect(() => {
        if (isSuccess) {
            console.log('prev token: ', auth?.token)
            dispatch(credentialsSet({...auth, token: data?.token}))
            console.log('new token: ', data?.token)
        }
    }, [data, isSuccess])

    return refreshToken
}

export default useRefreshToken