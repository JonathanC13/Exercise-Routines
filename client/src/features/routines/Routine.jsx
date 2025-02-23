import React from 'react'
// import { useSelector } from 'react-redux'
// import { selectRoutineById } from './routinesApiSlice'
import { memo, useState, useEffect } from 'react'
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
    const [readMore, setReadMore] = useState(false)
    const descMaxLength = 100

    let navigate = useNavigate()

    const routineClickHandler = (routineIdParam) => {
      if (!isFetching) {
        navigate(`/routines/${routineIdParam}/sessions/`)
      }
    }

    const toggleReadMoreHandler = (event) => {
      event.stopPropagation()
      setReadMore(!readMore)
    }

    // const routine = useSelector(state => selectRoutineById(state, routineId))

    const { routine } = useGetRoutinesQuery('routinesList',
      {
        selectFromResult: ({ data }) => ({
          routine: data?.entities[routineId]
      }),
    })

    const descOverLimit = routine.description.length > descMaxLength
    
    // initial state of readMore
    useEffect(() => {
      setReadMore(!descOverLimit)
    }, [])

    const description = readMore ? routine.description : `${routine.description.slice(0, descMaxLength)}...`
    
    let content = ''
    if (routine) {
      // const routine = useSelector(selectRoutineById(routineId))
      const containerClassname = classnames('routine__div', {
        cursor_pointer: !isFetching
      })

      content = <div className={containerClassname} onClick={() => {routineClickHandler(routine.id)}}>
          <h1 className='routine__h1'>{routine.name}</h1>
          <section className="routine_info__div">
            <div className='routine__div_info'>
              <span className='routine_info_title__span routine_info'>Order:</span>
              <span className='routine_info'>{routine.order}</span>
            </div>
            <div className='routine__div_info'>
              <span className='routine_info_title__span routine_info'>Description:</span>
              <div className='routine_info_desc__div routine_info'>
                { description }
                { descOverLimit && 
                  <div className="desc_footer__div">
                    <div className='readMore' onClick={toggleReadMoreHandler}>{readMore ? 'Show less' : 'Read more'}</div>
                  </div>
                }
              </div>
              
            </div>
            <div className='routine__div_footer'>
              <div className="routine_footer__timestamps">
                <span className='routine_footer__span'>Updated on: {formatDisplayDate(routine.updatedAt)}</span>
                <span className='routine_footer__span'>Created on: {formatDisplayDate(routine.createdAt)}</span>
              </div>
              <button className='routine_footer__editbtn cursor_pointer'>Edit</button>
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