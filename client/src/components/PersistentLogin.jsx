import React from 'react'
import { useState, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useRefreshToken from '../hooks/useRefreshToken'
import { useSelector, useDispatch } from 'react-redux'
import { errorStatusSet, errorStatusCleared } from '../features/error/errorSlice'
import errorTextConversion from '../functions/errorTextConversion'

const PersistentLogin = () => {
    const dispatch = useDispatch()
    const {credentials, persistLogin} = useSelector(state => state.auth)
    const {trigger, token, isError, error, isFetching, isLoadingRefresh} = useRefreshToken()
    const { status } = useSelector(state => state.errorState)

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
            dispatch(errorStatusSet(errorTextConversion(error)))
        } else {
            dispatch(errorStatusCleared())
        }
    }, [isError])
    // console.log(status)
    // useEffect(() => {
    //     console.log(`isLoadingRefresh ${isLoadingRefresh}`)
    //     console.log(`token: ${token}`)
    //     console.log('persistent: ', credentials)
    // }, [isLoadingRefresh])

    // console.log(isLoadingRefresh, ' ', isFetching)
  return (
    <>
        {status === 'Server error' ?
            <Navigate to="/error" replace />
            :
            persistLogin && (isLoadingRefresh || isFetching) ?
                <div className='persistent-login-loading__div'>
                    <section className='persistent-login-loading__section'>
                        <h1 className='persistent-login-loading__h1'>Is loading...</h1>
                    </section>
                </div>
                :
                <Outlet></Outlet>
        }
    </>
  )
}

export default PersistentLogin