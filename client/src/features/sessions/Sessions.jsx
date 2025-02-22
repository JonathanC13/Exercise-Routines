import React from 'react'
import { useGetSessionsQuery } from './sessionsApiSlice'
import { useParams } from 'react-router'
import Session from './Session'

const createSessionComps = (routineId, sessionIds) => {
    const comps = sessionIds.map((sessionId) => {
        return <Session
            key={ sessionId }
            routineId={ routineId }
            sessionId={ sessionId }
        ></Session>
    })

    return comps
}

const Sessions = () => {

    const { routineId } = useParams()

    const {
        data: sessions = {id:[], entities:{}},  // data has been transformed
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSessionsQuery( {routineId: routineId},
        {
            pollingInterval: 30000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        }
    )

    let content = ''

    if (isLoading) {
        content = <p>loading...</p>//<PulseLoader color={"#FFF"} />
    }

    if (isError) {
        content = <p className="errmsg">hello {error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = sessions
        content = <>
            {createSessionComps(routineId, ids)}
        </>
    } else {
        content = <h2>Something has gone wrong!</h2>
    }

  return (
    <section>
        <h1>Sessions</h1>
        {content}
    </section>
  )
}

export default Sessions