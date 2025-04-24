import React from 'react'
import { useState, useEffect, useRef } from 'react'
// import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addFormClosed } from '../../modals/addFormModals/addFormModalsSlice'
import { useUpdateExerciseMutation } from '../exerciseApiSlice'
import FormInput from '../../../components/FormInput'

const SetAddForm = () => {

    const orderRef = useRef()
    const msgRef = useRef()

    const { routineId, sessionId, exercise } = useSelector(state => state.addFormModals.setAddFormData)
    const sets = exercise ? exercise.sets ?? [] : []

    const dispatch = useDispatch()
    const [updateExercise, { isLoading }] = useUpdateExerciseMutation()

    const [exSetOrder, setExSetOrder] = useState('')
    const [exSetWeight, setExSetWeight] = useState('')
    const [exSetReps, setExSetReps] = useState('')
    const [exSetRest, setExSetRest] = useState('')
    const [msg, setMsg] = useState('')
    
    const resetControlledInputs = () => {
        setExSetOrder('')
        setExSetWeight('')
        setExSetReps('')
        setExSetRest('')
        setMsg('')
    }

    useEffect(() => {
        if (orderRef) {
            orderRef.current.focus()
        }

        const cleanup = () => {
            resetControlledInputs()
        }
        return () => {
            cleanup()
        };
    }, []);

    const validateNumber = (val, cb) => {
        if (isNaN(Number(val))) {
            return
        } else {
            cb(val)
        }
    }

    const addSetFormHandler = async(e) => {
        e.preventDefault()

        const action = e.nativeEvent.submitter.name;
        const form = e.currentTarget

        switch (action) {
            case 'close_modal__button':
                closeAddFormHandler()
                break;
            case 'add_set__button':
                form.classList.add('disabled')

                const addFormData = {
                    'order': exSetOrder === '' ? 0 : exSetOrder ?? 0,
                    'weight': exSetWeight ?? '',
                    'repsOrDuration': exSetReps ?? 0,
                    'restTimeSeconds': exSetRest ?? ''
                }
        
                const body = {
                    'sets': [...sets, addFormData]
                }
                
                try {
                
                    const response = await updateExercise({ routineId, sessionId, exerciseId: exercise.id, body: body }).unwrap()
                        .then((payload) => {
                            // console.log('success')
                            closeAddFormHandler()
                        })
                        .catch((error) => {
                            msgRef.current.focus()
                            if (!error?.data) {
                                setMsg('No Server Response!');
                            } else if (error?.data) {
                                const message = error?.data?.message ?? 'Error!'
                                setMsg(message)
                            } else {
                                setMsg('Add set failed!')
                            }
                        })
                } catch (error) {
                    setMsg('Add set failed!')
                    msgRef.current.focus()
                } finally {
                    form.classList.remove('disabled')
                }
             
                break;
            default:
                break;
        }
    }

    const closeAddFormHandler = (e) => {
        resetControlledInputs()
        dispatch(addFormClosed())
    }

    const grayZoneClickHandler = () => {
        // todo, add stop bubble down
    }

    let content = ''
    if (exercise) {
        content = 
            <form className="add_set__form" onSubmit={addSetFormHandler}>
                <h1 className="add_set__h1">Add Set</h1>
                <div className='add_form_assoc__div'>
                    <p className='info_label_exercise info_text_padding'>Exercise:</p>
                    <p className='info_value info_text_padding'>{exercise.name}</p>
                </div>

                <div className="add_set_input__div">
                    {/* <label id='add_set_order__label' htmlFor="add_set_order__input" className="add_set_order__label">Order</label>
                    <input type="number" id='add_set_order__input' className='add_set_order__input' name='add_set_order__input'
                        ref={orderRef}
                        value={exSetOrder}
                        onChange={(e) => {setExSetOrder(e.target.value)}}
                    /> */}

                    <FormInput
                        required = {false}
                        labelId = 'add_set_order__label'
                        labelText = 'Order'
                        inputType = 'text'
                        inputId = 'add_set_order__input'
                        onFocusCB = {(e) => {}}
                        onBlurCB = {(e) => {}}
                        inputRef = {orderRef}
                        inputValueState = {exSetOrder}
                        inputOnChangeCB = {validateNumber}
                        inputValueSetter = {setExSetOrder}
                        aria = {false}
                    ></FormInput>
                </div>

                <div className="add_set_input__div">
                    {/* <label id='add_set_weight__label' htmlFor="add_set_weight__input" className="add_set_weight__label">Weight</label>
                    <input type="text" id='add_set_weight__input' className='add_set_weight__input' name='add_set_weight__input'
                        value={exSetWeight}
                        onChange={(e) => {setExSetWeight(e.target.value)}}
                    /> */}

                    <FormInput
                        required = {false}
                        labelId = 'add_set_weight__label'
                        labelText = 'Weight'
                        inputType = 'text'
                        inputId = 'add_set_weight__input'
                        onFocusCB = {(e) => {}}
                        onBlurCB = {(e) => {}}
                        inputRef = {null}
                        inputValueState = {exSetWeight}
                        inputOnChangeCB = {setExSetWeight}
                        aria = {false}
                    ></FormInput>
                </div>

                <div className="add_set_input__div">
                    {/* <label id='add_set_reps__label' htmlFor="add_set_reps__input" className="add_set_reps__label">Reps/Duration</label>
                    <input type="text" id='add_set_reps__input' className='add_set_reps__input' name='add_set_reps__input'
                        value={exSetReps}
                        onChange={(e) => {setExSetReps(e.target.value)}}
                    /> */}

                    <FormInput
                        required = {false}
                        labelId = 'add_set_reps__label'
                        labelText = 'Reps/Duration'
                        inputType = 'text'
                        inputId = 'add_set_reps__input'
                        onFocusCB = {(e) => {}}
                        onBlurCB = {(e) => {}}
                        inputRef = {null}
                        inputValueState = {exSetReps}
                        inputOnChangeCB = {setExSetReps}
                        aria = {false}
                    ></FormInput>
                </div>

                <div className="add_set_input__div">
                    {/* <label id='add_set_rest__label' htmlFor="add_set_rest__input" className="add_set_rest__label">Rest (seconds)</label>
                    <input type="number" id='add_set_rest__input' className='add_set_rest__input' name='add_set_rest__input'
                        value={exSetRest}
                        onChange={(e) => {setExSetRest(e.target.value)}}
                    /> */}

                    <FormInput
                        required = {false}
                        labelId = 'add_set_rest__label'
                        labelText = 'Rest (seconds)'
                        inputType = 'text'
                        inputId = 'add_set_rest__input'
                        onFocusCB = {(e) => {}}
                        onBlurCB = {(e) => {}}
                        inputRef = {null}
                        inputValueState = {exSetRest}
                        inputOnChangeCB = {validateNumber}
                        inputValueSetter = {setExSetRest}
                        aria = {false}
                    ></FormInput>
                </div>

                <div className="add_set_input__div">
                    <button type='submit' className='add_set__button cursor_pointer' name='add_set__button' disabled={isLoading}>Add Set</button>
                </div>

                <p className="add_set_msg__p" id='add_set_msg__p' ref={msgRef}>{msg}</p>
            </form>
    }


    // add_set__section for background opague onclick stops bubble down to below coponents = behaviour: closes this form, add_set__form for form container
    return  <>
                { content }
            </>
}

export default SetAddForm