import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux'
import { exSetAddFormOpenChanged } from './exSetAddFormSlice'
import { FaXmark } from 'react-icons/fa6'
import { useUpdateExerciseMutation } from '../exerciseApiSlice'

const AddSetForm = () => {

    const { exSetAddFormOpen, location, routineId, sessionId, exercise } = useSelector(state => state.exSetAddForm)
    const sets = exercise ? exercise.sets : []
    const exSetAddDivRef = useRef(null)
    const dispatch = useDispatch()
    const [updateExercise, { isLoading }] = useUpdateExerciseMutation()

    const [exSetOrder, setExSetOrder] = useState('')
    const [exSetWeight, setExSetWeight] = useState('')
    const [exSetReps, setExSetReps] = useState('')
    const [exSetRest, setExSetRest] = useState('')

    useEffect(() => {
        if (exSetAddDivRef.current !== null) {
            if (!exSetAddFormOpen) {
                exSetAddDivRef.current.classList.add('offscreen')
            } else {
                exSetAddDivRef.current.classList.remove('offscreen')
            }
        }
    }, [exSetAddFormOpen, location])
    
    const resetControlledInputs = () => {
        setExSetOrder('')
        setExSetWeight('')
        setExSetReps('')
        setExSetRest('')
    }

    const updateExerciseRequestHandler = async(payload) => {
        try {
            if (!routineId || !sessionId || !exercise || !exercise.id) {
                throw new Error('Err: invalid route params.')
            }
            const response = await updateExercise({ routineId, sessionId, exerciseId: exercise.id, body: payload }).unwrap()
            return response
        } catch (err) {
            console.error('Failed to save the exercise: ', err)
        }
        return ''
    }

    const addSetFormHandler = async(e) => {
        e.preventDefault()
        const action = e.nativeEvent.submitter.name;
        const form = e.currentTarget

        switch (action) {
            case 'close_modal__button':
                closeSetAddFormHandler()
                break;
            case 'add_set__button':
                form.classList.add('disabled')

                const addFormData = {
                    'order': exSetOrder ?? '',
                    'weight': exSetWeight ?? '',
                    'repsOrDuration': exSetReps ?? '',
                    'restTimeSeconds': exSetRest ?? ''
                }
        
                const payload = {
                    'sets': [...sets, addFormData]
                }
                // for (let i of payload.sets) {
                //     console.log(i)
                // }
                try {
                    const response = updateExerciseRequestHandler(payload)
                    // console.log(response)
                    resetControlledInputs()
                    closeSetAddFormHandler()
                } catch (err) {
                    console.log('err ', err)
                    document.getElementById('add_set_msg__p').innerText = `Failed to save the exercise (set): ${err}`
                } finally {
                    form.classList.remove('disabled')
                }
                
                break;
            default:
                break;
        }
    }

    const closeSetAddFormHandler = () => {
        resetControlledInputs()
        dispatch(exSetAddFormOpenChanged({exSetAddFormOpen: false, location: {center:-9000, bottom:0}}))
    }

    const grayZoneClickHandler = () => {
        // todo, add stop bubble down
    }

    let content = ''
    if (exercise) {
        content = 
            <div className="modal_bg__div" ref={exSetAddDivRef}>
                <form className="add_set__form" onSubmit={addSetFormHandler}>
                    <div className="add_form_modal_x__div">
                        <button type='button' className='add_form_modal_x__button cursor_pointer' name='close_modal__button' onClick={closeSetAddFormHandler}>
                            <FaXmark></FaXmark>
                        </button>
                    </div>
                    <h1 className="add_set__h1">Add Set</h1>
                    <div className='add_form_assoc__div'>
                        <h1 className='info_label_routine info_text_padding'>Exercise:</h1>
                        <h1 className='info_text_padding'>{exercise.name}</h1>
                    </div>

                    <div className="add_set_input__div">
                        <label id='add_set_order__label' htmlFor="add_set_order__input" className="add_set_order__label">Order</label>
                        <input type="number" id='add_set_order__input' className='add_set_order__input' name='add_set_order__input'
                            value={exSetOrder}
                            onChange={(e) => {setExSetOrder(e.target.value)}}
                        />
                    </div>

                    <div className="add_set_input__div">
                        <label id='add_set_weight__label' htmlFor="add_set_weight__input" className="add_set_weight__label">Weight</label>
                        <input type="text" id='add_set_weight__input' className='add_set_weight__input' name='add_set_weight__input'
                            value={exSetWeight}
                            onChange={(e) => {setExSetWeight(e.target.value)}}
                        />
                    </div>

                    <div className="add_set_input__div">
                        <label id='add_set_reps__label' htmlFor="add_set_reps__input" className="add_set_reps__label">Reps/Duration</label>
                        <input type="text" id='add_set_reps__input' className='add_set_reps__input' name='add_set_reps__input'
                            value={exSetReps}
                            onChange={(e) => {setExSetReps(e.target.value)}}
                        />
                    </div>

                    <div className="add_set_input__div">
                        <label id='add_set_rest__label' htmlFor="add_set_rest__input" className="add_set_rest__label">Rest (seconds)</label>
                        <input type="number" id='add_set_rest__input' className='add_set_rest__input' name='add_set_rest__input'
                            value={exSetRest}
                            onChange={(e) => {setExSetRest(e.target.value)}}
                        />
                    </div>

                    <button type='submit' className='add_set__button cursor_pointer' name='add_set__button'>Add Set</button>

                    <p className="add_set_msg__p" id='add_set_msg__p'></p>
                </form>
            </div>
    }


    // add_set__section for background opague onclick stops bubble down to below coponents = behaviour: closes this form, add_set__form for form container
    return createPortal (
        content,
        document.getElementById('root')
    )
}

export default AddSetForm