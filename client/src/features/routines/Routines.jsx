import React from 'react'
import { useSelector } from 'react-redux'
import { useGetRoutinesQuery } from './routinesApiSlice'
import AddRoutine from './AddRoutine'
import Routine from './Routine'

const createRoutineComps = (routineIds) => {
  
  const comps = routineIds.map((routineId) => {
    return <Routine
        key={ routineId }
        routineId={ routineId }
      >
      </Routine>
  })

  return comps
} 

const Routines = () => {

  //Calling the `useGetRoutinesQuery()` hook automatically fetches data!
  const {
    data: routines,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetRoutinesQuery('routinesList',
      {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
      }
    )

  let content = null

  if (isLoading) {
    content = <h2>Is loading...</h2>
  } 
  
  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids, entities } = routines
    content = 
      <section>
        <h2>Routines</h2>
        {createRoutineComps(ids)}
      </section>
  } else {
    content = <h2>Something has gone wrong!</h2>
  }

  return (
    <section>
        <h1>Routines</h1>
        { content }
        {/* Include add Routines comp later */}
    </section>
  )
}

export default Routines