import React from 'react'
import { useSelector } from 'react-redux'
import { useGetRoutinesQuery, selectAllRoutines, selectRoutineById, selectRoutineIds } from './routinesApiSlice'
import AddRoutine from './AddRoutine'

const Routines = () => {

  //Calling the `useGetRoutinesQuery()` hook automatically fetches data!
  const {
    data: routines = [],  // data has been transformed and returned to routines
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetRoutinesQuery()

  let content = null

  if (isLoading) {
    content = <h2>Is loading...</h2>
  } else if (routines) {
    console.log('raw: ')
    console.log(routines)
    console.log('selector: ')
    const all = useSelector(selectAllRoutines)
    content = 
      <section>
        <h2>Raw data</h2>
        {all.map((routine) => {return <p key={routine.id}>{routine.name}</p>})}
        {/* <h2>Transformed data</h2>
        <p>{ transformedData }</p> */}
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