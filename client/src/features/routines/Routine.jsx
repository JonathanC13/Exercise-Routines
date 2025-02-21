import React from 'react'
// import { useSelector } from 'react-redux'
// import { selectRoutineById } from './routinesApiSlice'
import { memo } from 'react'
import { useGetRoutinesQuery } from './routinesApiSlice'
import { useNavigate } from 'react-router'

const Routine = ( { routineId = null } ) => {

    let navigate = useNavigate()

    const handleRoutineClick = (routineIdParam) => {
      navigate(`/routines/${routineIdParam}/sessions/`)
    }

    // const routine = useSelector(state => selectRoutineById(state, routineId))

    const { routine } = useGetRoutinesQuery('routinesList',
      {
        selectFromResult: ({ data }) => ({
          routine: data?.entities[routineId]
      }),
    })

    let content = ''

    if (routine) {
      // const routine = useSelector(selectRoutineById(routineId))
      content = <div onClick={() => {handleRoutineClick(routine.id)}}>{routine.id}, {routine.name}</div> 
    } else {
      content = <p>Not found</p>
    }

  return (
    <section>
        { content }
    </section>
  )
}

const memoizedRoutine = memo(Routine)

export default memoizedRoutine