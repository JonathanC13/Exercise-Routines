import React from 'react'
import { useState, useEffect, useRef } from 'react'
// import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addFormClosed } from '../modals/addFormModals/addFormModalsSlice'
import { useAddExerciseMutation } from './exerciseApiSlice'
import { FaCircleInfo } from 'react-icons/fa6'
import FormInput from '../../components/FormInput'

const checkValidName = (name) => {
    return name.length > 0 && name.length <= 50
}

const checkValidDescription = (description) => {
    return description.length >= 0 && description.length <= 500
}

const ExerciseAddForm = () => {

    const nameRef = useRef()
    const msgRef = useRef()

    const dispatch = useDispatch()
    const { routineId, session } = useSelector(state => state.addFormModals.exerciseAddFormData)

    const [addExercise, { isLoading }] = useAddExerciseMutation()

    // controlled inputs
    const [order, setOrder] = useState('')
    const [name, setName] = useState('')
    const [validName, setValidName] = useState(false)
    const [nameFocus, setNameFocus] = useState(false)
    const [description, setDescription] = useState('')
    const [validDescription, setValidDescription] = useState(true)
    const [descriptionFocus, setDescriptionFocus] = useState(false)
    const [muscleType, setMuscleType] = useState('')
    const [msg, setMsg] = useState('')

    const resetControlledInputs = () => {
        setOrder('')
        setName('')
        setDescription('')
        setMuscleType('')
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

    const addExerciseFormHandler = async(e) => {
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
            'muscleType': muscleType ?? ''
        }
      
        try {
            const response = await addExercise({ routineId, sessionId: session.id, body: body }).unwrap()
                .then((payload) => {closeAddFormHandler()})
                .catch((error) => {
                    msgRef.current.focus()
                    if (!error?.data) {
                        setMsg('No Server Response!');
                    } else if (error?.data) {
                        const message = error?.data?.message ?? 'Error!'
                        setMsg(message)
                    } else {
                        setMsg('Add exercise failed!')
                    }
                })
        } catch (error) {
            setMsg('Add exercise failed!')
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
      if (session) {
          content = 
                <form className="add_exercise__form" onSubmit={addExerciseFormHandler}>
                    <h1 className="add_exercise__h1">Add Exerecise</h1>
                    <div className='add_form_assoc__div'>
                        <p className='info_label_session info_text_padding'>Session:</p>
                        <p className='info_value info_text_padding'>{session.name}</p>
                    </div>

                    <div className="add_exercise_input__div">
                        {/* <label id='add_exercise_name__label' htmlFor="add_exercise_name__input" className="add_exercise__label">Name</label>
                        <input type="text" id='add_exercise_name__input' className='add_exercise_name__input' name='add_exercise_name__input' required
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
                            labelId = 'add_exercise_name__label'
                            labelText = 'Name*'
                            inputType = 'text'
                            inputId = 'add_exercise_name__input'
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
                        ></FormInput>
                    </div>

                    <div className="add_exercise_input__div">
                        <label id='add_exercise_order__label' htmlFor="add_exercise_order__input" className="add_exercise__label">Order</label>
                        <input type="number" id='add_exercise_order__input' className='add_exercise_order__input' name='add_exercise_order__input'
                            value={order}
                            onChange={(e) => {setOrder(e.target.value)}}
                        />

                        <FormInput
                            required = {false}
                            labelId = 'add_exercise_order__label'
                            labelText = 'Order'
                            inputType = 'number'
                            inputId = 'add_exercise_order__input'
                            onFocusCB = {(e) => {}}
                            onBlurCB = {(e) => {}}
                            inputRef = {null}
                            inputValueState = {order}
                            inputOnChangeCB = {setOrder}
                            aria = {false}
                        ></FormInput>
                    </div>

                    <div className="add_exercise_input__div">
                        <label id='add_exercise_desc__label' htmlFor="add_exercise_desc__input" className="add_exercise__label">Description</label>
                        <textarea id='add_exercise_desc__input' className='add_exercise_desc__input' name='add_exercise_desc__input' rows="2"
                            onFocus={() => setDescriptionFocus(true)}
                            onBlur={() => setDescriptionFocus(false)}
                            aria-invalid={validDescription ? "false" : "true"}
                            aria-describedby="descNote"
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)}}
                        />
                        <p id="descNote" className={descriptionFocus && description && !validDescription? "instructions" : "offscreen"}>
                            <FaCircleInfo /><br/>
                            Please enter a description that is 0 to 500 characters.
                        </p>
                    </div>

                    <div className="add_exercise_input__div">
                        <label id='add_exercise_muscleType__label' htmlFor="add_exercise_muscleType__input" className="add_exercise__label">Muscle Type</label>
                        <input type="text" id='add_exercise_muscleType__input' className='add_exercise_muscleType__input' name='add_exercise_muscleType__input'
                            value={muscleType}
                            onChange={(e) => {setMuscleType(e.target.value)}}
                        />
                    </div>

                    <button type='submit' className='add_set__button cursor_pointer' name='add_exercise__button' disabled={isLoading}>Add Exercise</button>

                    <p className="add_set_msg__p" id='add_exercise_msg__p' ref={msgRef}>{msg}</p>
                </form>
      }
  
  
      // add_exercise__section for background opague onclick stops bubble down to below coponents = behaviour: closes this form, add_exercise__form for form container
    return  <>
                { content }
            </>
}

export default ExerciseAddForm