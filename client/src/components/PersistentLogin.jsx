import React from 'react'
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useRefreshToken from '../hooks/useRefreshToken'
import { useSelector, useDispatch } from 'react-redux'

const PersistentLogin = () => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth.credentials)
    const {token, isError, error, isFetching, refetch, isLoadingRefresh} = useRefreshToken()

    useEffect(() => {
        const verifyRefreshToken = () => {
            refetch()
        }
        // console.log('p: ', auth)
        if (!auth?.token) {
            verifyRefreshToken()
        }
    }, [])

    // useEffect(() => {
    //     console.log(`isLoadingRefresh ${isLoadingRefresh}`)
    //     console.log(`token: ${token}`)
    //     console.log('persistent: ', auth)
    // }, [isLoadingRefresh])

    // console.log(isLoadingRefresh, ' ', isFetching)
  return (
    <>
        {isLoadingRefresh || isFetching ?
            <p>Is loading</p>
            :
            isError ?
                <p>{error}</p>
                :
                <Outlet></Outlet>
        }
    </>
  )
}

export default PersistentLogin