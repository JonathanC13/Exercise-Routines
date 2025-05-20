import React from 'react'
import { useState, useCallback } from 'react'
import { useDispatch } from "react-redux"
import { errorStatusSet, errorStatusCleared } from "../features/error/errorSlice"

const useErrorManagement = () => {
    const dispatch = useDispatch()
    const [serverDown, setServerDown] = useState(false)
    
    const clearError = useCallback(() => {
        // setServerDown(false)
        dispatch(errorStatusCleared())
        return
    }, [setServerDown])

    const acknowledgeError = useCallback((error) => {
        if (error?.status === 'FETCH_ERROR' || error?.status('NO_RESP')) {
            // setServerDown(true)
        } else {
            // setServerDown(false)
        }
        dispatch(errorStatusSet({newStatus: error?.status ?? 'error', newMessage: error?.error ?? 'Something has gone wrong!'}))
        return
    }, [setServerDown])

  return { clearError, acknowledgeError, serverDown }
}

export default useErrorManagement



