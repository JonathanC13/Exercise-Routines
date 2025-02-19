import React from 'react'
import { useGetSessionsQuery } from './sessionsApiSlice'

const SessionPage = () => {

    const { routineId, sessionId } = useParams()

    const { session } = useGetSessionsQuery( {routineId: routineId},
        {
            selectFromResult: ({ data }) => ({
            session: data?.entities[sessionId]
        }),
    })

    // page to show single session, if user owned then show edit button -> redirects to editSessionForm


  return (
    <div>SessionPage</div>
  )
}

export default SessionPage