import React from 'react'
import Session from './Session'
import { useParams, Link } from 'react-router-dom'
import { FaBackwardStep } from 'react-icons/fa6'

const SessionPage = () => {

    const { routineId } = useParams()
    const { sessionId } = useParams()

    const link = `/routines/${routineId}/sessions/`

    let content = 
      <section className='sessions__section'>
        <div className='sessions_routine_title__div'>
            <Link to={link} className='info_label_routine__link info_text_padding cursor_pointer'>
                <FaBackwardStep className='backward-step__svg'></FaBackwardStep>
                Sessions
            </Link>
        </div>
        <div className='sessions__div'>
          <Session
            sessionId={sessionId}
            haveLink={false}
          ></Session>
        </div>
      </section>

  return (
    content
  )
}

export default SessionPage