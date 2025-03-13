import React from 'react'
import { useState, useEffect } from 'react'
// import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addFormClosed } from '../../modals/addFormModals/addFormModalsSlice'
import { useUpdateExerciseMutation } from '../exerciseApiSlice'

const SetAddForm = () => {

    const { routineId, sessionId, exercise } = useSelector(state => state.addFormModals.setAddFormData)
    const sets = exercise ? exercise.sets ?? [] : []

    const dispatch = useDispatch()
    const [updateExercise, { isLoading }] = useUpdateExerciseMutation()

    const [exSetOrder, setExSetOrder] = useState('')
    const [exSetWeight, setExSetWeight] = useState('')
    const [exSetReps, setExSetReps] = useState('')
    const [exSetRest, setExSetRest] = useState('')
    
    const resetControlledInputs = () => {
        setExSetOrder('')
        setExSetWeight('')
        setExSetReps('')
        setExSetRest('')
    }

    useEffect(() => {
        const cleanup = () => {
            resetControlledInputs()
        }
        return () => {
            cleanup()
        };
    }, []);

    const updateExerciseRequestHandler = async(payload) => {
        try {
            if (!routineId || !sessionId || !exercise || !exercise.id) {
                throw new Error('Err: invalid route params.')
            }
            const response = await updateExercise({ routineId, sessionId, exerciseId: exercise.id, body: payload }).unwrap()
            return { success: true, response }
        } catch (error) {
            return { success: false, error }
        }
        return ''
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
                    'order': exSetOrder ?? 0,
                    'weight': exSetWeight ?? '',
                    'repsOrDuration': exSetReps ?? 0,
                    'restTimeSeconds': exSetRest ?? ''
                }
        
                const payload = {
                    'sets': [...sets, addFormData]
                }
                // for (let i of payload.sets) {
                //     console.log(i)
                // }
                
                const response = await updateExerciseRequestHandler(payload)
                form.classList.remove('disabled')
                
                if (response?.success) {
                    closeAddFormHandler()
                    return
                } 

                const message = response?.error?.data?.message ?? 'Error'
                
                document.getElementById('add_set_msg__p').innerText = `Failed to save the exercise (set): ${message}`
                
             
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

                <button type='submit' className='add_set__button cursor_pointer' name='add_set__button' disabled={isLoading}>Add Set</button>

                <p className="add_set_msg__p" id='add_set_msg__p'></p>
            </form>
    }


    // add_set__section for background opague onclick stops bubble down to below coponents = behaviour: closes this form, add_set__form for form container
    return  <>
                { content }
            </>
}

export default SetAddForm