import React from 'react'
import { memo, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useUpdateExerciseMutation, useDeleteExerciseMutation } from './exerciseApiSlice'
import Sets from './sets/Sets.jsx'
import { FaTrashCan } from 'react-icons/fa6'

const Exercise = ( { exercise = null } ) => {
    const { routineId } = useParams()

    const [edit, setEdit] = useState(false)
    const [exerciseName, setExerciseName] = useState(exercise ? exercise.name ?? '' : '')
    const [exerciseOrder, setExerciseOrder] = useState(exercise ? exercise.order ?? '' : '')
    const [exerciseDesc, setExerciseDesc] = useState(exercise ? exercise.description ?? '' : '')
    const [exerciseMuscleType, setExerciseMuscleType] = useState(exercise ? exercise.muscleType ?? '' : '')
    const [exerciseCompleted, setExerciseCompleted] = useState(exercise ? exercise.completed ?? '' : '')
    const [exerciseMessage, setExerciseMessage] = useState('')

    const [updateExercise, { isLoading }] = useUpdateExerciseMutation()
    const [deleteExercise, { isLoadingDelete }] = useDeleteExerciseMutation()

    // Read more
    const [readMore, setReadMore] = useState(false)
    const descMaxLength = 100

    const toggleReadMoreHandler = (event) => {
        event.stopPropagation()
        setReadMore(!readMore)
    }

    const descOverLimit = exercise.description.length > descMaxLength
    // initial state of readMore
    useEffect(() => {
        setReadMore(!descOverLimit)
    }, [])

    const exerciseFormId = `exercise_form_${exercise.id}`

    useEffect(() => {
        if (exercise) {
            const form = document.getElementById(exerciseFormId)
            const exerciseNameInput = form.querySelector('#exercise_name__input');
            const exerciseMuscleTypeInput = form.querySelector('#exercise_muscType__input');
            const exerciseOrderInput = form.querySelector('#exercise_order__input');

            if (edit) {
                exerciseNameInput.removeAttribute('disabled')
                exerciseMuscleTypeInput.removeAttribute('disabled')
                exerciseOrderInput.removeAttribute('disabled')
            } else {
                exerciseNameInput.setAttribute('disabled', '')
                exerciseMuscleTypeInput.setAttribute('disabled', '')
                exerciseOrderInput.setAttribute('disabled', '')
            }
        }
    }, [edit])

    const description = readMore ? exercise.description : `${exercise.description.slice(0, descMaxLength)}...`

    // console.log('re-render: ', exercise.id)

    const updateExerciseRequestHandler = async(payload) => {
        const body = {
            ...payload
        }

        try {
            const response = await updateExercise({ routineId, sessionId: exercise.sessionId, exerciseId: exercise.id, body }).unwrap()
            return {'success': true, response}
        } catch (error) {
            return {'success': false, error}
        }
        return null
    }

    const deleteExerciseRequestHandler = async(exercise) => {
        try {
            const response = await deleteExercise({ routineId, sessionId: exercise.sessionId, exerciseId: exercise.id }).unwrap()
            return {'success': true, response}
        } catch (error) {
            return {'success': false, error}
        }
        return null
    }

    const exerciseFormSubmitHandler = async(e) => {
        e.preventDefault()

        const action = e.nativeEvent.submitter.value;
        const form = e.currentTarget
        switch (action) {
            case 'edit':
                setEdit(true)
                break
            case 'cancel':
                form.reset()
                if (exercise) {
                    setExerciseName(exercise.name)
                    setExerciseMuscleType(exercise.muscleType)
                    setExerciseOrder(exercise.order)
                    setExerciseDesc(exercise.description)
                }
                setEdit(false)
                break
            case 'save':
                setEdit(false)
                form.classList.add('disabled')
                
                try {
                    const payload = { 
                        'name': exerciseName ?? '',
                        'muscleType': exerciseMuscleType ?? '',
                        'order': exerciseOrder ?? 0,
                        'description': exerciseDesc ?? ''
                    }
                    // console.log(payload)
                    const response = await updateExerciseRequestHandler(payload)
                    // console.log(response)
                    if (!response?.success) {
                        throw new Error(response)
                    }
                } catch (error) {
                    setExerciseMessage(error?.data?.message ?? 'Error')
                } finally {
                    form.classList.remove('disabled')
                }
                
                break
            case 'delete':
                setEdit(false)
                form.classList.add('disabled')

                try {
                    const response = await deleteExerciseRequestHandler(exercise)
                    if (!response?.success) {
                        throw new Error(response)
                    }
                } catch (err) {
                    setExerciseMessage(error?.data?.message ?? 'Error')
                } finally {
                    form.classList.remove('disabled')
                
                }
            
                break
            default:
                break
        }
    }

    let content = ''
    
    if (exercise) {
        let exerciseOptionButtons =
            edit ?
                <div className='editing__div'>
                    <button className="exercise_delete__button cursor_pointer" name='delete' value='delete'>
                        <FaTrashCan></FaTrashCan>
                    </button>
                    <div className="modifyOpts__div">
                        <button className="exercise_cancel__button cursor_pointer" name='cancel' value='cancel'>
                            Cancel
                        </button>
                        <button className="exercise_save__button cursor_pointer" name='save' value='save'>
                            Save
                        </button>
                    </div>
                </div> :
                <div className="edit__div">
                    <button className="exercise_edit__button cursor_pointer" name='edit' value='edit'>
                        Edit Exercise
                    </button>
                </div>
        
        content =
            <div className="exercise_info__div">
                <form id={exerciseFormId} onSubmit={(e) => exerciseFormSubmitHandler(e)} className='exercise_info__form'>
                    <div className='ex_form_info__div'>
                        <label htmlFor='exercise_name__input' className='info_label info_text_padding offscreen'>Name:</label>
                        <input id='exercise_name__input' className='exercise_name__h1 exercise_form__inputs'
                            value={ exerciseName }
                            onChange={(e) => {return setExerciseName(e.target.value)}}
                        ></input>
                    </div>

                    <div className='ex_form_info__div'>
                        <label htmlFor='exercise_muscType__input' className='info_label info_text_padding'>Muscle Type:</label>
                        <input id='exercise_muscType__input' className='exercise_form__inputs'
                            value={ exerciseMuscleType }
                            onChange={(e) => {return setExerciseMuscleType(e.target.value)}}
                        ></input>
                    </div>

                    <div className='ex_form_info__div'>
                        <label htmlFor='exercise_order__input' className='info_label info_text_padding'>Order:</label>
                        <input id='exercise_order__input' className='exercise_form__inputs'
                            value={ exerciseOrder }
                            onChange={(e) => {return setExerciseOrder(e.target.value)}}
                        ></input>
                    </div>

                    <div className='ex_form_desc_info__div'>
                        <div className='ex_form_desc_label__div'>
                            <label htmlFor='exercise_desc__ta' className='info_label info_text_padding'>Description:</label>
                        </div>
                        { edit ? 
                            <textarea id='exercise_desc__ta' className='exercise_desc__ta' rows={4}
                                value={ exerciseDesc }
                                onChange={(e) => {return setExerciseDesc(e.target.value)}}
                            ></textarea>
                            :
                            <div id='exercise_desc__div' className='routine_info_desc__div info_text_padding'>
                                { description }
                                { descOverLimit && 
                                    <div className="desc_footer__div">
                                        <div className='readMore' onClick={toggleReadMoreHandler}>{readMore ? 'Show less' : 'Read more'}</div>
                                    </div>
                                }
                            </div>
                        }
                        
                    </div>
                    { exerciseOptionButtons }
                    <p id='exercise_msg__p'>{exerciseMessage}</p>
                </form>
                <Sets
                    exercise={exercise}
                    updateExerciseRequestHandler={updateExerciseRequestHandler}
                ></Sets>
                

                {/* Edit moved to Exercise Page */}
                {/* <form onSubmit={(e) => {updateExerciseHandler(e)}}>
                    <label htmlFor="update-ex-name__input">Name:</label>
                    <input type="text" id="update-ex-name__input" defaultValue="" required />
                    <button type='submit'>UPDATE</button>
                </form> */}
            </div>
    }

  return (
    <section className='exercise__section'>
        {content}
    </section>
  )
}

const memoizedExercise = memo(Exercise)

export default memoizedExercise