import React from 'react'
import { memo, useState, useEffect, useRef } from 'react'
import { useGetSessionsQuery, useUpdateSessionMutation, useDeleteSessionMutation } from './sessionsApiSlice'
import { useParams } from 'react-router'
import Exercises from '../exercises/Exercises'
import { FaTrashCan, FaDoorOpen, FaCircleInfo } from 'react-icons/fa6'

const checkValidName = (name) => {
    return name.length > 0 && name.length <= 50
}

const checkValidDescription = (description) => {
    return description.length >= 0 && description.length <= 500
}

const Session = ( { sessionId = null }) => {

    const { routineId } = useParams()

    const nameRef = useRef()
    const msgRef = useRef()

    const [updateSession, { isLoading }] = useUpdateSessionMutation()
    const [deleteSession, { isLoadingDelete }] = useDeleteSessionMutation()

    const { session } = useGetSessionsQuery( {routineId: routineId},
        {
            selectFromResult: ({ data }) => ({
            session: data?.entities[sessionId]
        }),
    })

    const [name, setName] = useState(session?.name ?? '')
    const [validName, setValidName] = useState(session?.name ? checkValidName(session.name) : false)
    const [nameFocus, setNameFocus] = useState(false)
    const [order, setOrder] = useState(session?.order ?? '')
    const [desc, setDesc] = useState(session?.description ?? '')
    const [validDesc, setValidDesc] = useState(session?.description ? checkValidDescription(session.description) : false)
    const [descFocus, setDescFocus] = useState(false)
    const [edit, setEdit] = useState(false)
    const [msg, setMsg] = useState('')

    const resetInfo = () => {
        if (session) {
            setName(session?.name ?? '')
            setOrder(session?.order ?? '')
            setDesc(session?.description ?? '')
        }
    }

    const sessionFormId = `session_form_${session.id}`
    
    useEffect(() => {
        if (edit) {
            nameRef.current.focus()
        }

        if (session) {
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

    const descOverLimit = session.description.length > descMaxLength
        
    // initial state of readMore
    useEffect(() => {
        setReadMore(!descOverLimit)
    }, [session])

    const description = readMore ? session.description : `${session.description.slice(0, descMaxLength)}...`
    // /Read more

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
                
                try {
                    const body = { 
                        'name': name ?? '',
                        'order': order ?? 0,
                        'description': desc ?? ''
                    }
                    
                    const response = await updateSession({routineId: routineId, sessionId: session.id, body: body}).unwrap()
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
                    setMsg('Update session failed!')
                    msgRef.current.focus()
                } finally {
                    form.classList.remove('disabled')
                }
                
                break
            case 'delete':
                setEdit(false)
                form.classList.add('disabled')

                try {
                    const response = await deleteSession({routineId: routineId, sessionId: session.id}).unwrap()
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
                } finally {
                    form.classList.remove('disabled')
                }
            
                break
            default:
                break
        }
    }

    let content = ''

    if (session) {
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
                <form id={sessionFormId} className='session__form' onSubmit={sessionFormSubmitHandler}>
                    <div className='session_name__div'>
                        { edit ? 
                            <>
                                <label className='offscreen' htmlFor="session_name__ta">Name:</label>
                                <textarea type="text" id='session_name__ta' className='session_name__ta'
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
                            <h1 id='session_name__h1' className='session__h1'>{name}</h1>
                            }
                        {/* <div className="door_open_svg__div cursor_pointer" onClick={() => {sessionClickHandler(session.id)}}> <FaDoorOpen/></div> */}
                    </div>

                    <div className='session_info__div'>
                        <div className='session__div_info'>
                            <label htmlFor='session_order__input' className='info_label info_text_padding'>Order:</label>
                            <input id='session_order__input' className='info_text_padding session_order__input'
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                            />
                        </div>
                        <div className='session_desc__div'>
                            <label htmlFor='session_desc__ta' className='session_desc__label info_label info_text_padding'>Description:</label>
                            {
                                edit ?
                                    <>                                   
                                        <textarea id='session_desc__ta' className='session_desc__ta' rows={4}
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
                                    <div id='session_info_desc__div' className='session_info_desc__div info_text_padding'>
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