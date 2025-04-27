import { useLazyUserRefreshTokenQuery } from "../features/auth/authApiSlice"
import { credentialsSet } from '../features/auth/authSlice'
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from 'react'

const useRefreshToken = () => {
    const auth = useSelector(state => state.auth.credentials)
    const dispatch = useDispatch()
    const [isLoadingRefresh, setIsLoadingRefresh] = useState(true)

    const [trigger, {
          data,
          refetch,
          isLoading,
          isFetching,
          isSuccess,
          isError,
          error
        }] = useLazyUserRefreshTokenQuery()

    // useEffect(() => {
    //     if (isFetching) {
    //         console.log('fetcjing')
    //         setIsLoadingRefresh(true)
    //     }
    // }, [isFetching])

    useEffect(() => {
        setIsLoadingRefresh(true)
        if (!isFetching && isSuccess) {
            // console.log('prev token: ', auth?.token)
            const credentials = {
                name: data?.user?.name,
                email: data?.user?.email,
                id: data?.user?.id,
                preferredTheme: data?.user?.preferredTheme,
                token: data?.token,
                
            }
            dispatch(credentialsSet(credentials))
            console.log('new token: ', data?.token)
        }
        if (!isFetching) {
            setIsLoadingRefresh(false)
        }
    }, [isFetching, setIsLoadingRefresh])

    return {trigger, token: data?.token, isError, error, isFetching, refetch, isLoadingRefresh} 
}

export default useRefreshToken