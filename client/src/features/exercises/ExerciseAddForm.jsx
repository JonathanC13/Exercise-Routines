import React from 'react'
import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAddExerciseMutation } from './exerciseApiSlice'

const ExerciseAddForm = () => {
    const dispatch = useDispatch()
    const { exerciseAddFormOpen } = useSelector(state => state.exerciseAddFormOpen)
    const { routineId } = useSelector(state => state.routineId)
    const { session } = useSelector(state => state.session)

    const [addExercise, { isLoading }] = useAddExerciseMutation()

    const exerciseAddDivRef = useRef(null)

    // controlled inputs
    const [order, setOrder] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [muscleType, setMuscleType] = useState('')
    
    const resetControlledInputs = () => {
        setOrder('')
        setName('')
        setDescription('')
        setMuscleType('')
    }

    const addExerciseRequestHandler = async(payload) => {
        try {
            if (!routineId || !session) {
                throw new Error('Err: invalid route params.')
            }
            const response = await addExercise({ routineId, sessionId: session.id, body: payload }).unwrap()
            return response
        } catch (err) {
            console.error('Failed to add the exercise: ', err)
        }
        return ''
    }

    const addExerciseFormHandler = async(e) => {
        const form = e.currentTarget
        form.classList.add('disabled')

        try {
            const payload = {
                'order': order ?? '',
                'name': name ?? '',
                'description': description ?? '',
                'muscleType': muscleType ?? null
            }
            
            const response = await addExerciseRequestHandler(payload)
            resetControlledInputs()
            closeExerciseAddFormHandler()
        } catch (err) {
            console.error('Failed to add the exercise: ', err)
            document.getElementById('add_exercise_msg__p').innerText = `Failed to save the exercise (set): ${err}`
        } finally {
            form.classList.remove('disabled')
        }
    }

    const closeExerciseAddFormHandler = (e) => {
        resetControlledInputs()
        dispatch(exSetAddFormOpenChanged({exSetAddFormOpen: false, location: {center:-9000, bottom:0}}))
    }
    
    let content = ''
      if (session) {
          content = 
              <div className="modal_bg__div" ref={exerciseAddDivRef}>
                  <form className="add_exercise__form" onSubmit={addExerciseFormHandler}>
                      <div className="add_form_modal_x__div">
                          <button type='button' className='add_form_modal_x__button cursor_pointer' name='close_modal__button' onClick={closeExerciseAddFormHandler}>
                              <FaXmark></FaXmark>
                          </button>
                      </div>
                      <h1 className="add_exercise__h1">Add Exerecise</h1>
                      <div className='add_form_assoc__div'>
                          <h1 className='info_label_routine info_text_padding'>Session:</h1>
                          <h1 className='info_text_padding'>{session.name}</h1>
                      </div>
  
                      <div className="add_exercise_input__div">
                          <label id='add_exercise_order__label' htmlFor="add_exercise_order__input" className="add_exercise__label">Order</label>
                          <input type="number" id='add_exercise_order__input' className='add_exercise_order__input' name='add_exercise_order__input'
                              value={order}
                              onChange={(e) => {setOrder(e.target.value)}}
                          />
                      </div>
  
                      <div className="add_exercise_input__div">
                          <label id='add_exercise_name__label' htmlFor="add_exercise_name__input" className="add_exercise__label">Weight</label>
                          <input type="text" id='add_exercise_name__input' className='add_exercise_name__input' name='add_exercise_name__input'
                              value={name}
                              onChange={(e) => {setName(e.target.value)}}
                          />
                      </div>
  
                      <div className="add_exercise_input__div">
                          <label id='add_exercise_desc__label' htmlFor="add_exercise_desc__input" className="add_exercise__label">Weight</label>
                          <textarea id='add_exercise_desc__input' className='add_exercise_desc__input' name='add_exercise_desc__input'
                              value={description}
                              onChange={(e) => {setDescription(e.target.value)}}
                          />
                      </div>

                      <div className="add_exercise_input__div">
                          <label id='add_exercise_muscleType__label' htmlFor="add_exercise_muscleType__input" className="add_exercise__label">Weight</label>
                          <input type="text" id='add_exercise_muscleType__input' className='add_exercise_muscleType__input' name='add_exercise_muscleType__input'
                              value={muscleType}
                              onChange={(e) => {setMuscleType(e.target.value)}}
                          />
                      </div>
  
                      <button type='submit' className='add_set__button cursor_pointer' name='add_exercise__button'>Add Exercise</button>
  
                      <p className="add_set_msg__p" id='add_exercise_msg__p'></p>
                  </form>
              </div>
      }
  
  
      // add_exercise__section for background opague onclick stops bubble down to below coponents = behaviour: closes this form, add_exercise__form for form container
      return createPortal (
          content,
          document.getElementById('root')
      )
}

export default ExerciseAddForm