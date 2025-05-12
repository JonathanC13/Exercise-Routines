import React from 'react'
import { memo, useState, useEffect, useRef } from 'react'
import { useGetSessionsQuery, useUpdateSessionMutation, useDeleteSessionMutation } from './sessionsApiSlice'
import { useParams, useNavigate } from 'react-router'
import Exercises from '../exercises/Exercises'
import { FaTrashCan, FaDoorOpen, FaCircleInfo } from 'react-icons/fa6'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'

const checkValidName = (name) => {
    return name.length > 0 && name.length <= 50
}

const checkValidDescription = (description) => {
    return description.length >= 0 && description.length <= 500
}

const Session = ( { sessionId = null, haveLink = false }) => {
    const navigate = useNavigate()

    const theme = useSelector(state => state.auth.preferredTheme)

    const { routineId } = useParams()

    const nameRef = useRef()
    const msgRef = useRef()

    const [updateSession, { isLoading }] = useUpdateSessionMutation()
    const [deleteSession, { isLoading: isLoadingDelete }] = useDeleteSessionMutation()

    const { session } = useGetSessionsQuery( {routineId: routineId},
        {
            selectFromResult: ({ data }) => ({
            session: data?.entities[sessionId]
        }),
    })

    const [sessionFormId, setSessionFormId] = useState(`session_form_${sessionId}`)
    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)
    const [order, setOrder] = useState('')
    const [desc, setDesc] = useState('')
    const [validDesc, setValidDesc] = useState(false)
    const [descFocus, setDescFocus] = useState(false)
    const [edit, setEdit] = useState(false)
    const [msg, setMsg] = useState('')

    const link = `/routines/${routineId}/sessions/${sessionId}`

    useEffect(() => {
        if (session?.id) {
            setSessionFormId(`session_form_${session?.id}`)
            setName(session?.name ?? '')
            setValidName(session?.name ? checkValidName(session.name) : false)
            setOrder(session?.order ?? '')
            setDesc(session?.description ?? '')
            setValidDesc(session?.description ? checkValidDescription(session.description) : false)
        }
    }, [session])

    const resetInfo = () => {
        if (session) {
            setName(session?.name ?? '')
            setOrder(session?.order ?? '')
            setDesc(session?.description ?? '')
        }
    }
    
    useEffect(() => {
        if (edit) {
            nameRef.current.focus()
        }

        if (session?.id && document.getElementById(sessionFormId)) {
            const form = document.getElementById(sessionFormId)
            const sessionOrderInput = form.querySelector('#session_order__input');

            if (edit) {
                sessionOrderInput.removeAttribute('disabled')
            } else {
                sessionOrderInput.setAttribute('disabled', '')
            }
        }
    }, [edit])

    useEffect(() => {
        setValidName(checkValidName(name))
    }, [name])

    useEffect(() => {
        setValidDesc(checkValidDescription(desc))
    }, [desc])


    // Read more
    const [readMore, setReadMore] = useState(false)
    const descMaxLength = 100

    const toggleReadMoreHandler = (event) => {
        event.stopPropagation()
        setReadMore(!readMore)
    }

    const descOverLimit = desc.length > descMaxLength
        
    // initial state of readMore
    useEffect(() => {
        setReadMore(!descOverLimit)
    }, [desc])

    // /Read more

    const validateNumber = (val) => {
        if (isNaN(Number(val))) {
            return
        } else {
            setOrder(val)
        }
    }

    const sessionUpdateFunc = async(body) => {
        try {
            
            const response = await updateSession({routineId: routineId, sessionId: sessionId, body: body}).unwrap()
                .then((payload) => {})
                .catch((error) => {
                    msgRef.current.focus()
                    if (!error?.data) {
                        setMsg('No server response!')
                    } else if (error?.data?.message) {
                        const message = error?.data?.message ?? 'Error!'
                        setMsg(message)
                    } else {
                        setMsg('Update session failed!')
                    }
                })
        } catch (error) {
            setMsg('Update session failed!')
            msgRef.current.focus()
        } 
        // finally {
        //     form.classList.remove('disabled')
        // }
    }

    const sessionDeleteFunc = async(body) => {
        try {
            const response = await deleteSession({routineId: routineId, sessionId: sessionId}).unwrap()
                .then((payload) => {})
                .catch((error) => {
                    msgRef.current.focus()
                    if (error?.data) {
                        setMsg('No server response!')
                    } else if (error?.data?.message) {
                        const message = error?.data?.message ?? 'Error!'
                        setMsg(message)
                    } else {
                        setMsg('Update session failed!')
                    }
                })
        } catch (error) {
            setMsg('Delete session failed!')
            msgRef.current.focus()
        }
    }

    const sessionFormSubmitHandler = async(e) => {
        e.preventDefault()

        setMsg('')
      
        const action = e.nativeEvent.submitter.value;
        const form = e.currentTarget

        switch (action) {
            case 'edit':
                setEdit(true)
                break
            case 'cancel':
                form.reset()
                resetInfo()
                setEdit(false)
                break
            case 'save':
                const isValidName = checkValidName(name)
                const isValidDesc = checkValidDescription(desc)
                if (!isValidName || !isValidDesc) {
                    setMsg('Please provide valid inputs!')
                    msgRef.current.focus()
                    return
                }

                setEdit(false)
                form.classList.add('disabled')

                const body = { 
                    'name': name ?? '',
                    'order': order ?? 0,
                    'description': desc ?? ''
                }
                
                await sessionUpdateFunc(body)

                form.classList.remove('disabled')
                
                break
            case 'delete':
                setEdit(false)
                form.classList.add('disabled')

                await sessionDeleteFunc()
                
                form.classList.remove('disabled')

                if (!haveLink) {
                    navigate(`/routines/${routineId}/sessions/`)
                }
                
                break
            default:
                break
        }
    }

    let content = ''

    if (session?.id) {
        
        const description = readMore ? desc : `${desc.slice(0, descMaxLength)}...`

        let sessionOptionButtons =
            edit ? 
                <div className='editing__div'>
                    <button className="session_delete__button cursor_pointer" name='delete' value='delete'>
                        <FaTrashCan></FaTrashCan>
                    </button>
                    <div className="modifyOpts__div">
                        <button className="session_cancel__button cursor_pointer" name='cancel' value='cancel'>
                            Cancel
                        </button>
                        <button className="session_save__button cursor_pointer" name='save' value='save'>
                            Save
                        </button>
                    </div>
                </div> :
                <div className="edit__div">
                    <button className="session_edit__button cursor_pointer" name='edit' value='edit'>
                        Edit Session
                    </button>
                </div>
            

        content = 
            <div className="session__div">
                {/* {haveLink ? <Link to={link}>single page</Link> : <></>} */}
                <form id={sessionFormId} className='session__form' onSubmit={sessionFormSubmitHandler}>
                    <div className='session_name__div'>
                        { edit ? 
                            <>
                                <label className='offscreen' htmlFor="session_name__ta">Name:</label>
                                <textarea type="text" id='session_name__ta' className={`session_name__ta session_name__ta--color-${theme}`}
                                    ref={nameRef}
                                    onFocus={() => setNameFocus(true)}
                                    onBlur={() => setNameFocus(false)}
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="nameNote"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <p id="nameNote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                                    <FaCircleInfo /><br/>
                                    Please enter a name that is 1 to 50 characters.
                                </p>
                            </>
                            :
                                <h1 id='session_name__h1' className={`session__h1 session__h1--color-${theme}`}>{name}</h1>
                        }
                        {haveLink ? 
                            <Link to={link} className="door_open_svg_sess__link cursor_pointer">
                                <FaDoorOpen className='fa-door-open_sess__svg'/>
                            </Link>
                            :
                            <></>
                        }
                    </div>

                    <div className={`session_info__div session_info__div--color-${theme}`}>
                        <div className='session__div_info'>
                            <label htmlFor='session_order__input' className='info_label info_text_padding'>Order:</label>
                            <input id='session_order__input' className={`info_text_padding session_order__input session_order__input--color-${theme}`} disabled
                                value={order}
                                onChange={(e) => validateNumber(e.target.value)}
                            />
                        </div>
                        <div className='session_desc__div'>
                            <label htmlFor='session_desc__ta' className='session_desc__label info_label info_text_padding'>Description:</label>
                            {
                                edit ?
                                    <>                                   
                                        <textarea id='session_desc__ta' className={`session_desc__ta session_desc__ta--color-${theme}`} rows={4}
                                            onFocus={() => setDescFocus(true)}
                                            onBlur={() => setDescFocus(false)}
                                            aria-invalid={validDesc ? "false" : "true"}
                                            aria-describedby="descNote"
                                            value={ desc }
                                            onChange={(e) => {return setDesc(e.target.value)}}
                                        ></textarea>
                                        <p id="descNote" className={descFocus && desc && !validDesc? "instructions" : "offscreen"}>
                                            <FaCircleInfo /><br/>
                                            Please enter a description that is 0 to 500 characters.
                                        </p>
                                    </>
                                    :
                                    <div id='session_info_desc__div' className={`info_text_padding session_info_desc__div session_info_desc__div--color-${theme}`}>
                                    { description }
                                    { descOverLimit && 
                                        <div className="desc_footer__div">
                                            <div className='readMore' onClick={toggleReadMoreHandler}>{readMore ? 'Show less' : 'Read more'}</div>
                                        </div>
                                    }
                                    </div>
                            }
                        </div>
                        { sessionOptionButtons }
                        <p id='session_msg__p' ref={msgRef}>{msg}</p>
                        {/* <label htmlFor="session__chkbx"></label>
                        <input type="checkbox" className="session__chkbx" id="session__chkbx"/> */}
                    </div>
                    
                </form>
                <hr />
                <Exercises
                    session={session}
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