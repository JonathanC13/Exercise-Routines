import React from 'react'
import { useState, useEffect } from 'react'
// import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addFormClosed } from '../modals/addFormModals/addFormModalsSlice'
import { useAddExerciseMutation } from './exerciseApiSlice'

const ExerciseAddForm = () => {
    const dispatch = useDispatch()
    const { routineId, session } = useSelector(state => state.addFormModals.exerciseAddFormData)

    const [addExercise, { isLoading }] = useAddExerciseMutation()

    // controlled inputs
    const [order, setOrder] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
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
        const cleanup = () => {
            resetControlledInputs()
        }
        return () => {
            cleanup()
        };
    }, []);

    const addExerciseRequestHandler = async(payload) => {
        try {
            if (!routineId || !session) {
                throw new Error('Err: invalid route params.')
            }
            const response = await addExercise({ routineId, sessionId: session.id, body: payload })
            return response
        } catch (error) {
            return error
        }
    }

    const addExerciseFormHandler = async(e) => {
        e.preventDefault()
        const form = e.currentTarget
        form.classList.add('disabled')

        
        const payload = {
            'order': order ?? 0,
            'name': name ?? '',
            'description': description ?? '',
            'muscleType': muscleType ?? ''
        }
        // console.log(payload)
        const response = await addExerciseRequestHandler(payload)
        form.classList.remove('disabled')

        if (response?.error) {
            const message = response?.error?.data?.message ?? 'Error'
            setMsg(message)
            return
        }

        closeAddFormHandler()
        return
        
        
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
                        <label id='add_exercise_order__label' htmlFor="add_exercise_order__input" className="add_exercise__label">Order</label>
                        <input type="number" id='add_exercise_order__input' className='add_exercise_order__input' name='add_exercise_order__input'
                            value={order}
                            onChange={(e) => {setOrder(e.target.value)}}
                        />
                    </div>

                    <div className="add_exercise_input__div">
                        <label id='add_exercise_name__label' htmlFor="add_exercise_name__input" className="add_exercise__label">Name</label>
                        <input type="text" id='add_exercise_name__input' className='add_exercise_name__input' name='add_exercise_name__input' required
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                        />
                    </div>

                    <div className="add_exercise_input__div">
                        <label id='add_exercise_desc__label' htmlFor="add_exercise_desc__input" className="add_exercise__label">Description</label>
                        <textarea id='add_exercise_desc__input' className='add_exercise_desc__input' name='add_exercise_desc__input' rows="2"
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)}}
                        />
                    </div>

                    <div className="add_exercise_input__div">
                        <label id='add_exercise_muscleType__label' htmlFor="add_exercise_muscleType__input" className="add_exercise__label">Muscle Type</label>
                        <input type="text" id='add_exercise_muscleType__input' className='add_exercise_muscleType__input' name='add_exercise_muscleType__input'
                            value={muscleType}
                            onChange={(e) => {setMuscleType(e.target.value)}}
                        />
                    </div>

                    <button type='submit' className='add_set__button cursor_pointer' name='add_exercise__button' disabled={isLoading}>Add Exercise</button>

                    <p className="add_set_msg__p" id='add_exercise_msg__p'>{msg}</p>
                </form>
      }
  
  
      // add_exercise__section for background opague onclick stops bubble down to below coponents = behaviour: closes this form, add_exercise__form for form container
    return  <>
                { content }
            </>
}

export default ExerciseAddForm