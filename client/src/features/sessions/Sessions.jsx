import React from 'react'
import { useGetRoutinesQuery } from '../routines/routinesApiSlice'
import { useGetSessionsQuery } from './sessionsApiSlice'
import { useParams } from 'react-router'
import Session from './Session'
import AddSetForm from '../exercises/sets/AddSetForm'

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
    } else if (isSuccess && routine) {
        const { ids, entities } = sessions
        content = <>
            <div className='sessions_routine_title__div'>
              <h1 className='info_label_routine info_text_padding'>Routine:</h1>
              <h1 className='info_value info_text_padding'>{routine.name}</h1>
            </div>
            <div className="sessions_title__div">
                <h1 className='sessions_title__h1'>Sessions</h1>
                <div className='sessions_title_underline'></div>
            </div>
            <div className='sessions__div'>
                {createSessionComps(routineId, ids)}
            </div>
            <AddSetForm></AddSetForm>
        </>
    } else if (isError) {
        content = <p className="errmsg">hello {error?.data?.message}</p>
    }

  return (
    <section className='sessions__section'>
        {content}
    </section>
  )
}

export default Sessions