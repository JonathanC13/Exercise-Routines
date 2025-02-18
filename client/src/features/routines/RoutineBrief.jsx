import React from 'react'
import { useSelector } from 'react-redux'
import { selectRoutineById } from './routinesApiSlice'

const RoutineBrief = ( {routineId = null} ) => {

    const routine = useSelector(state => selectRoutineById(state, routineId))

    let content = ''

    if (!routineId) {
        content = <p>Error</p>
    } else {
        // const routine = useSelector(selectRoutineById(routineId))
        content = <h1>{routine.id}, {routine.name}</h1>
    }

  return (
    <section>
        { content }
    </section>
  )
}

export default RoutineBrief