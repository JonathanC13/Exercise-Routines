import React from 'react'
// import { useSelector } from 'react-redux'
// import { selectRoutineById } from './routinesApiSlice'
import { memo } from 'react'
import { useGetRoutinesQuery } from './routinesApiSlice'
import { useNavigate, navLink } from 'react-router'

const Routine = ( { routineId = null } ) => {

    let navigate = useNavigate()

    const routineClickHandler = (routineIdParam) => {
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
      content = <div className='routine__div' onClick={() => {routineClickHandler(routine.id)}}>
          <h1 className='routine__h1'>{routine.name}</h1>
          <p>{routine.id}</p>
        </div> 
    } else {
      content = <p>Not found</p>
    }

  return (
    <section className='routine__section'>
        { content }
    </section>
  )
}

const memoizedRoutine = memo(Routine)

export default memoizedRoutine