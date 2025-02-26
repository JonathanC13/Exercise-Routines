import React from 'react'
import { memo } from 'react'
import { useGetSessionsQuery } from './sessionsApiSlice'
import { useParams } from 'react-router'
import Exercises from '../exercises/Exercises'

const Session = ( { sessionId = null }) => {

    const { routineId } = useParams()

    const { session } = useGetSessionsQuery( {routineId: routineId},
        {
            selectFromResult: ({ data }) => ({
            session: data?.entities[sessionId]
        }),
    })

    let content = ''

    if (session) {
        content = 
            <div className='session__div'>
                <h1 className='session_name__h1'>{ session.name }</h1>
                <div className='session_info__div'>
                    <h2>{ session.order }</h2>
                    <p>{ session.description }</p>
                    <label htmlFor="session__chkbx"></label>
                    <input type="checkbox" className="session__chkbx" id="session__chkbx"/>
                    <button>Edit icon for session</button>
                    {/* {sessionAlone ? <></> : <button>enlarge icon for session into own page</button>} navigate to sessionPage */}
                    {/* below buttons presence controlled by if user id matched createdBy */}
                    {/* Edit button */}
                    {/* delete button */}
                </div>
                <Exercises
                    exercises={session.exercises}
                ></Exercises>

            </div>
    } else {
        <p>Not found</p>
    }

  return (
    <section className="session__section">
        { content }
    </section>
  )
}

const memoizedSession = memo(Session)

export default memoizedSession