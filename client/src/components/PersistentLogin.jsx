import React from 'react'
import { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useRefreshToken from '../hooks/useRefreshToken'
import { useSelector, useDispatch } from 'react-redux'
import useErrorManagement from '../hooks/useErrorManagement'

const PersistentLogin = () => {
    const dispatch = useDispatch()
    const {credentials, persistLogin} = useSelector(state => state.auth)
    const {trigger, token, isError, error, isFetching, isLoadingRefresh} = useRefreshToken()
    const { clearError, acknowledgeError, serverDown } = useErrorManagement()

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

    useEffect(() => {
        if (isError) {
            acknowledgeError(error)
        } else {
            clearError()
        }
    }, [isError])

    // useEffect(() => {
    //     console.log(`isLoadingRefresh ${isLoadingRefresh}`)
    //     console.log(`token: ${token}`)
    //     console.log('persistent: ', credentials)
    // }, [isLoadingRefresh])

    // console.log(isLoadingRefresh, ' ', isFetching)
  return (
    <>
        {isError && serverDown ?
            <Navigate to="/error" replace />
            :
            persistLogin && (isLoadingRefresh || isFetching) ?
                <p>Is loading</p>
                :
                <Outlet></Outlet>
        }
    </>
  )
}

export default PersistentLogin