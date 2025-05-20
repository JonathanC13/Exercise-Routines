import React from 'react'
import { useEffect } from 'react'
import { useGetRoutinesQuery } from '../routines/routinesApiSlice'
import { useGetSessionsQuery } from './sessionsApiSlice'
import { useParams, useNavigate, Link, useLocation } from 'react-router'
import Session from './Session'
import { useSelector, useDispatch } from 'react-redux'
import { sessionAddFormOpenChanged } from '../modals/addFormModals/addFormModalsSlice'
import { FaBackwardStep } from 'react-icons/fa6'
import { errorStatusSet, errorStatusCleared } from '../error/errorSlice'
import errorTextConversion from '../../functions/errorTextConversion'

const createSessionComps = (routineId, sessionIds) => {
    const comps = sessionIds.map((sessionId) => {
        return <Session
            key={ sessionId }
            routineId={ routineId }
            sessionId={ sessionId }
            haveLink={true}
        ></Session>
    })

    return comps
}

const Sessions = () => {
    // const navigate = useNavigate()
    const { routineId } = useParams()
    const theme = useSelector(state => state.auth.preferredTheme)
    const dispatch = useDispatch()
    const location = useLocation()
    const from = location.state?.from.pathname ?? '/'

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

    // const toRoutines = () => {
    //     navigate('/routines')
    // }

    let content = ''

    if (isLoading) {
        content = <p>loading...</p>//<PulseLoader color={"#FFF"} />
    } else if (isSuccess && routine) {
        const { ids, entities } = sessions

        content = <>
            <div className='sessions_routine_title__div'>
                {/* <Link to={from} className='info_label_routine__link info_text_padding cursor_pointer'> */}
                <Link to='/routines' className={`info_text_padding cursor_pointer info_label_routine__link info_label_routine__link--color-${theme}`}>
                    <FaBackwardStep className='backward-step__svg'></FaBackwardStep>
                    Routine:
                </Link>
                <h1 className={`info_text_padding info_value info_value--color-${theme}`}>{routine.name}</h1>
            </div>
            <div className="sessions_title__div">
                <h1 className={`sessions_title__h1 sessions_title__h1--color-${theme}`}>Sessions</h1>
                <div className='sessions_title_underline'></div>
            </div>
            <button className='cursor_pointer sessions_add__button' onClick={addSessionHandler}>Add Session</button>
            <div className='sessions__div'>
                {createSessionComps(routineId, ids)}
            </div>
        </>
    } 
    // else if (isError) {
    //     content = <p className="errmsg">hello {error?.data?.message}</p>
    // }

    useEffect(() => {
        if (isError) {
        dispatch(errorStatusSet(errorTextConversion(error)))
        } else {
        dispatch(errorStatusCleared())
        }
    }, [isError])

  return (
    <section className='sessions__section'>
        {content}
        {/* <button onClick={toRoutines}>to Routines</button> */}
    </section>
  )
}

export default Sessions