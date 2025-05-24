import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addFormClosed } from '../modals/addFormModals/addFormModalsSlice'
import { useAddSessionMutation } from './sessionsApiSlice'
import { FaCircleInfo } from 'react-icons/fa6'
import FormInput from '../../components/FormInput'

const checkValidName = (name) => {
    return name.length > 0 && name.length <= 50
}

const checkValidDescription = (description) => {
    return description.length >= 0 && description.length <= 500
}

const SessionAddForm = ({theme = 'light'}) => {

    const nameRef = useRef()
    const msgRef = useRef()

    const dispatch = useDispatch()
    const { routine } = useSelector(state => state.addFormModals.sessionAddFormData)

    const [addSession, { isLoading }] = useAddSessionMutation()

    const [order, setOrder] = useState('')
    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)
    const [description, setDescription] = useState('')
    const [validDescription, setValidDescription] = useState(true)
    const [descriptionFocus, setDescriptionFocus] = useState(false)
    const [msg, setMsg] = useState('')

    const resetControlledInputs = () => {
        setOrder('')
        setName('')
        setDescription('')
        setMsg('')
    }

    useEffect(() => {
        if (nameRef) {
            nameRef.current.focus()
        }

        const cleanup = () => {
            resetControlledInputs()
        }
        return () => {
            cleanup()
        };
    }, []);

    useEffect(() => {
        setValidName(checkValidName(name))
    }, [name])

    useEffect(() => {
        setValidDescription(checkValidDescription(description))
    }, [description])

    const validateNumber = (val) => {
        if (isNaN(Number(val))) {
            return
        } else {
            setOrder(val)
        }
    }

    const addSessionHandler = async(e) => {
        e.preventDefault()

        const isValidName = checkValidName(name)
        const isValidDescription = checkValidDescription(description)
        if (!isValidName || !isValidDescription) {
            setMsg('Please provide valid inputs!')
            msgRef.current.focus()
            return
        }
        
        const form = e.currentTarget
        form.classList.add('disabled')
        
        const body = {
            'order': order === '' ? 0 : order ?? 0,
            'name': name ?? '',
            'description': description ?? '',
        }
        
        try {
            const response = await addSession({ routineId: routine.id, body}).unwrap()
                .then((payload) => {closeAddFormHandler()})
                .catch((error) => {
                    msgRef.current.focus()
                    if (!error?.data) {
                        // setMsg('No Server Response!');   // since render will spin down the server after 50 seconds of inactivity, just close the form. The routines component will re-fetch and will detect server down.
                        closeAddFormHandler()
                    } else if (error?.data) {
                        const message = error?.data?.message ?? 'Error!'
                        setMsg(message)
                    } else {
                        setMsg('Add session failed!')
                    }
                })
        } catch (error) {
            setMsg('Add session failed!')
            msgRef.current.focus()
        } finally {
            form.classList.remove('disabled')
        }
    }

    const closeAddFormHandler = (e) => {
        resetControlledInputs()
        dispatch(addFormClosed())
    }

    let content = ''
    if (routine) {
        content = 
            <form onSubmit={(e) => {addSessionHandler(e)}} className="add_session__form">
                <h1 className={`add_session__h1 add_session__h1--color-${theme}`}>Add Session</h1>
                <div className='add_form_assoc__div'>
                    <p className='info_label_routine info_text_padding'>Routine:</p>
                    <p className={`info_text_padding info_value info_value--color-${theme}`}>{routine.name}</p>
                </div>

                <div className="add_session_input__div">
                    {/* <label htmlFor="add_session_name__input" className="add_session__label">Name</label>
                    <input required type="text" className="add_session_name__input" id="add_session_name__input"
                        ref={nameRef}
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="nameNote"
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                    />
                    <p id="nameNote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                        <FaCircleInfo /><br/>
                        Please enter a name that is 1 to 50 characters.
                    </p> */}

                    <FormInput
                        required = {true}
                        labelId = 'add_session_name__label'
                        labelText = 'Name'
                        inputType = 'text'
                        inputId = 'add_session_name__input'
                        onFocusCB = {(e) => {setNameFocus(true)}}
                        onBlurCB = {(e) => {setNameFocus(false)}}
                        inputRef = {nameRef}
                        inputValueState = {name}
                        inputOnChangeCB = {setName}
                        aria = {true}
                        ariaValidState = {validName}
                        ariaDescribedby = 'nameNote'
                        ariaInfoCond = {nameFocus && name && !validName}
                        ariaInfoText = 'Please enter a name that is 1 to 50 characters.'
                        theme={theme}
                    ></FormInput>
                </div>
                <div className="add_session_input__div">
                    {/* <label htmlFor="add_session_order__input" className="add_session__label">Order</label>
                    <input type="number" className="add_session_order__input" id="add_routine_session__input" 
                        value={order}
                        onChange={(e) => {setOrder(e.target.value)}}
                    /> */}

                    <FormInput
                        required = {false}
                        labelId = 'add_session_order__label'
                        labelText = 'Order'
                        inputType = 'text'
                        inputId = 'add_session_order__input'
                        onFocusCB = {(e) => {}}
                        onBlurCB = {(e) => {}}
                        inputRef = {null}
                        inputValueState = {order}
                        inputOnChangeCB = {validateNumber}
                        inputValueSetter = {setOrder}
                        aria = {false}
                        ariaValidState = {true}
                        ariaDescribedby = ''
                        ariaInfoCond = {false}
                        ariaInfoText = ''
                        theme={theme}
                    ></FormInput>
                </div>
                <div className="add_session_input__div">
                    <label htmlFor="add_session_desc__ta" className={`add_session__label add_session__label--color-${theme}`}>Description</label>
                    <textarea className={`add_session_desc__ta add_session_desc__ta--color-${theme}`} id="add_session_desc__ta" name="add_session_desc__ta" rows='2'
                        onFocus={() => setDescriptionFocus(true)}
                        onBlur={() => setDescriptionFocus(false)}
                        aria-invalid={validDescription ? "false" : "true"}
                        aria-describedby="descNote"
                        value={description}
                        onChange={(e) => {setDescription(e.target.value)}}
                    ></textarea>
                    <p id="descNote" className={descriptionFocus && description && !validDescription? "instructions" : "offscreen"}>
                        <FaCircleInfo /><br/>
                        Please enter a description that is 0 to 500 characters.
                    </p>
                </div>
                <div className="add_session_input__div">
                    <button className="add_session__button cursor_pointer" type="submit" disabled={isLoading}>
                        Add Session
                    </button>
                </div>
                <p className="add_session__p" ref={msgRef}>{msg}</p>
            </form>
    }

  return (
    <>
        { content }
    </>
  )
}

export default SessionAddForm