import React from 'react'
// import { useSelector } from 'react-redux'
// import { selectRoutineById } from './routinesApiSlice'
import { memo } from 'react'
import { useGetRoutinesQuery } from './routinesApiSlice'
import { useNavigate } from 'react-router'
import classnames from 'classnames'

const months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'Aug',
  8: 'Sept',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec'
}

const formatDisplayDate = (strDate) => {
  const date = new Date(strDate)
  return `${date.getFullYear()}, ${months[date.getMonth()]} ${date.getDate()}`
}

const Routine = ( { routineId = null, isFetching = true } ) => {
    // console.log(`${routineId} has rendered!`)

    let navigate = useNavigate()

    const routineClickHandler = (routineIdParam) => {
      if (!isFetching) {
        navigate(`/routines/${routineIdParam}/sessions/`)
      }
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
      const containerClassname = classnames('routine__div', {
        cursor_pointer: !isFetching
      })

      content = <div className={containerClassname} onClick={() => {routineClickHandler(routine.id)}}>
          <h1 className='routine__h1'>{routine.name}</h1>
          <section className="routine_info__div">
            <p className='routine__p_info routine_info'>
              <span className='routine_info_title__span'>Order:</span>
              {routine.order}
            </p>
            <p className='routine__p_info'>
              <span className='routine_info_title__span'>Description:</span> 
              {routine.description}
            </p>
            <div className='routine__div_footer'>
              <span className='routine_footer__span'>Updated on: {formatDisplayDate(routine.updatedAt)}</span>
              <span className='routine_footer__span'>Created on: {formatDisplayDate(routine.createdAt)}</span>
            </div>
          </section>
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