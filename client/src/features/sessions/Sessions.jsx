import React from 'react'
import { useGetRoutinesQuery } from '../routines/routinesApiSlice'
import { useGetSessionsQuery } from './sessionsApiSlice'
import { useParams } from 'react-router'
import Session from './Session'
import { useDispatch } from 'react-redux'
import { sessionAddFormOpenChanged } from '../modals/addFormModals/addFormModalsSlice'

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
    const dispatch = useDispatch()

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
            pollingInterval: 30000, //30000
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        }
    )

    const addSessionHandler = () => {
        dispatch(sessionAddFormOpenChanged({ addFormOpen: true, addFormType: 'sessionAddForm', routine: routine }))
    }

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
            <button className='cursor_pointer sessions_add__button' onClick={addSessionHandler}>Add Session</button>
            <div className='sessions__div'>
                {createSessionComps(routineId, ids)}
            </div>
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