import React from 'react'
import { useGetRoutinesQuery } from '../routines/routinesApiSlice'
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

    const { routine } = useGetRoutinesQuery('routinesList',
        {
        selectFromResult: ({ data }) => ({
            routine: data?.entities[routineId]
        }),
    })

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

    if (isSuccess && routine) {
        const { ids, entities } = sessions
        content = <>
            <div className="sessions_routine_title__div">
                <h1 className='sessions_routine_name__h1'>{routine.name}</h1>
            </div>
            <div className="sessions_title__div">
                <h1 className='sessions_title__h1'>Sessions</h1>
                <div className='sessions_title_underline'></div>
            </div>
            <div className='sessions__div'>
                {createSessionComps(routineId, ids)}
            </div>
        </>
    } else {
        content = <h2>Something has gone wrong!</h2>
    }

  return (
    <section className='sessions__section'>
        {content}
    </section>
  )
}

export default Sessions