import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useAddRoutineMutation } from './routinesApiSlice'
import { addFormClosed } from '../modals/addFormModals/addFormModalsSlice'
import { FaCircleInfo } from 'react-icons/fa6'
import FormInput from '../../components/FormInput'

const checkValidName = (name) => {
    return name.length > 0 && name.length <= 50
}

const checkValidDescription = (description) => {
    return description.length >= 0 && description.length <= 500
}

const RoutineAddForm = () => {

    const dispatch = useDispatch()

    const nameRef = useRef()
    const msgRef = useRef()

    const [addRoutine, { isLoading }] = useAddRoutineMutation()

    // controlled inputs
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

    const validateNumber = (val, cb) => {
        if (isNaN(Number(val))) {
            return
        } else {
            cb(val)
        }
    }

    const addRoutineHandler = async(e) => {
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
            const response = await addRoutine({ body }).unwrap()
                .then((payload) => {closeAddFormHandler()})
                .catch((error) => {
                    msgRef.current.focus()
                    if (!error?.data) {
                        setMsg('No Server Response!');
                    } else if (error?.data) {
                        const message = error?.data?.message ?? 'Error!'
                        setMsg(message)
                    } else {
                        setMsg('Add routine failed!')
                    }
                })
        } catch (error) {
            setMsg('Add routine failed!')
            msgRef.current.focus()
        } finally {
            form.classList.remove('disabled')
        }
    }

    const closeAddFormHandler = (e) => {
        resetControlledInputs()
        dispatch(addFormClosed())
    }

    let content = 
        <form onSubmit={(e) => {addRoutineHandler(e)}} className="add_routine__form">
            <h1 className="add_routine__h1">Add Routine</h1>
            <div className="add_routine_input__div">
                {/* <label htmlFor="add_routine_name__input" className="add_routine__label">Name</label>
                <input required type="text" className="add_routine_name__input" id="add_routine_name__input"
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
                    labelId = 'add_routine_name__label'
                    labelText = 'Name'
                    inputType = 'text'
                    inputId = 'add_routine_name__input'
                    onFocusCB = {(e) => setNameFocus(true)}
                    onBlurCB = {(e) => setNameFocus(false)}
                    inputRef = {nameRef}
                    inputValueState = {name}
                    inputOnChangeCB = {setName}
                    aria = {true}
                    ariaValidState = {validName}
                    ariaDescribedby = 'nameNote'
                    ariaInfoCond = {nameFocus && name && !validName}
                    ariaInfoText = 'Please enter a name that is 1 to 50 characters.'
                ></FormInput>
            </div>
            <div className="add_routine_input__div">
                {/* <label htmlFor="add_routine_order__input" className="add_routine__label">Order</label>
                <input type="number" className="add_routine_order__input" id="add_routine_order__input" 
                    value={order}
                    onChange={(e) => {setOrder(e.target.value)}}
                /> */}
                {/* inputType = 'Number' */}
                <FormInput
                    required = {false}
                    labelId = 'add_routine_order__label'
                    labelText = 'Order'
                    inputType = 'text' 
                    inputId = 'add_routine_order__input'
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
                ></FormInput>
            </div>
            <div className="add_routine_input__div">
                <label htmlFor="add_routine_desc__ta" className="add_routine__label">Description</label>
                <textarea className="add_routine_desc__ta" id="add_routine_desc__ta" name="add_routine_desc__ta" rows='2'
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
            <div className="add_routine_input__div">
                <button className="add_routine__button cursor_pointer" type="submit" disabled={isLoading}>
                    Add Routine
                </button>
            </div>
            <p className="add_routine__p" ref={msgRef}>{msg}</p>
        </form>


  return    <>
                {content}
            </>
}

export default RoutineAddForm