import React from 'react'
import { memo } from 'react'
import { useGetSessionsQuery } from './sessionsApiSlice'
import { useParams } from 'react-router'

const createExerciseComps = (sessionId) => {
    const comps = []

    // iterate the session entity adapter for the exercise IDs and then send each exercise Id to the Exercise component.

    return comps
}

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
            <>
                <h1>{ session.name }</h1>
                <h2>{ session.order }</h2>
                <p>{ session.description }</p>
                <label htmlFor="session__chkbx"></label>
                <input type="checkbox" className="session__chkbx" id="session__chkbx"/>
                <button>Edit icon for session</button>
                {/* {sessionAlone ? <></> : <button>enlarge icon for session into own page</button>} */}
                
                {/* exercises -> exercise */}
            </>
    } else {
        <p>Something has gone wrong!</p>
    }

  return (
    <section className="session__section">
        { content }
    </section>
  )
}

const memoizedSession = memo(Session)

export default memoizedSession