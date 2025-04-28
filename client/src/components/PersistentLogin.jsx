import React from 'react'
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useRefreshToken from '../hooks/useRefreshToken'
import { useSelector, useDispatch } from 'react-redux'
// import { persistLoginSet } from '../features/auth/authSlice'

const PersistentLogin = () => {

    const dispatch = useDispatch()
    const {credentials, persistLogin} = useSelector(state => state.auth)
    const {trigger, token, isError, error, isFetching, isLoadingRefresh} = useRefreshToken()

    useEffect(() => {
        let isMounted = true

        const verifyRefreshToken = () => {
            trigger()
        }

        // console.log(persistLogin, credentials)
        // console.log('p: ', credentials)
        if (persistLogin && !credentials?.token) {
            verifyRefreshToken()
        }

        const cleanUp = () => {
            isMounted = false
        }
        return cleanUp
    }, [])

    // useEffect(() => {
    //     console.log(`isLoadingRefresh ${isLoadingRefresh}`)
    //     console.log(`token: ${token}`)
    //     console.log('persistent: ', credentials)
    // }, [isLoadingRefresh])

    // console.log(isLoadingRefresh, ' ', isFetching)
  return (
    <>
        {persistLogin && (isLoadingRefresh || isFetching) ?
            <p>Is loading</p>
            :
            <Outlet></Outlet>
        }
    </>
  )
}

export default PersistentLogin