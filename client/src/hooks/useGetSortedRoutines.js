import React from 'react'
import { useSelector } from 'react-redux'
import { useGetRoutinesQuery } from '../features/routines/routinesApiSlice'

const useGetSortedRoutines = () => {

    const auth = useSelector((state) => state.auth)

    const {
        data: routines = {ids:[], entities:{}},
        refetch,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error
    } = useGetRoutinesQuery({token: auth?.credentials?.token})

    // const sortedRoutines = useMemo(() => {
    const sortedRoutines = []
    for (let [key, val] of Object.entries(routines.entities)) {
        sortedRoutines.push(val)
    } 
    // Sort in ascending 'order', if same then descending updatedAt order
    sortedRoutines.sort((a, b) => 
    {
        const ord = a.order - b.order
        if (ord === 0) {
        return b.updatedAt.localeCompare(a.updatedAt)
        }
        return ord
    }
    )

  return {sortedRoutines} 
}

export default useGetSortedRoutines