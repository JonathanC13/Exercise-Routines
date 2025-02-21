import React from 'react'
import { useGetSessionsQuery } from './sessionsApiSlice'
import { Session } from './Session'

const SessionPage = () => {

    const { sessionId } = useParams()

    let content = <Session
        sessionId={sessionId}
    ></Session>

  return (
    <div>{content}</div>
  )
}

export default SessionPage