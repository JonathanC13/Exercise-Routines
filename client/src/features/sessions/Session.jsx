import React from 'react'
import { memo, useState, useEffect } from 'react'
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

    // Read more
    const [readMore, setReadMore] = useState(false)
    const descMaxLength = 100

    const toggleReadMoreHandler = (event) => {
        event.stopPropagation()
        setReadMore(!readMore)
    }

    const descOverLimit = session.description.length > descMaxLength
        
    // initial state of readMore
    useEffect(() => {
        setReadMore(!descOverLimit)
    }, [])

    const description = readMore ? session.description : `${session.description.slice(0, descMaxLength)}...`
    // /Read more

    let content = ''

    if (session) {
        content = 
            <div className='session__div'>
                <h1 className='session_name__h1'>{ session.name }</h1>
                <div className='session_info__div'>
                    <div className='info__div'>
                        <span className='info_label info_text_padding'>Order:</span>
                        <span className='info_text_padding'>{session.order}</span>
                    </div>
                    <div className='info__div'>
                        <span className='info_label info_text_padding'>Description:</span>
                        <div className='routine_info_desc__div info_text_padding'>
                            { description }
                            { descOverLimit && 
                                <div className="desc_footer__div">
                                    <div className='readMore' onClick={toggleReadMoreHandler}>{readMore ? 'Show less' : 'Read more'}</div>
                                </div>
                            }
                        </div>
                    </div>

                    <label htmlFor="session__chkbx"></label>
                    <input type="checkbox" className="session__chkbx" id="session__chkbx"/>
                    <button>Edit icon for session</button>
                    {/* {sessionAlone ? <></> : <button>enlarge icon for session into own page</button>} navigate to sessionPage */}
                    {/* below buttons presence controlled by if user id matched createdBy */}
                    {/* Edit button */}
                    {/* delete button */}
                </div>
                <hr />
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