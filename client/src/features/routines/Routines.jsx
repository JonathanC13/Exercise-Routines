import React from 'react'
import { useSelector } from 'react-redux'
import { useGetRoutinesQuery } from './routinesApiSlice'
import AddRoutine from './AddRoutine'
import RoutineBrief from './RoutineBrief'

const createRoutineComps = (routineIds) => {
  
  const comps = routineIds.map((routineId) => {
    return <RoutineBrief
        routineId={routineId}
      >
      </RoutineBrief>
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
  } = useGetRoutinesQuery()

  let content = null

  if (isLoading) {
    content = <h2>Is loading...</h2>
  } 
  
  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    console.log('raw: ')
    console.log(routines)
    console.log('selector: ')
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