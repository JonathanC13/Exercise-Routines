import React from 'react'
import { memo, useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { useUpdateExerciseMutation, useDeleteExerciseMutation } from './exerciseApiSlice'
import Sets from './sets/Sets.jsx'
import { FaTrashCan, FaCircleInfo } from 'react-icons/fa6'

const checkValidName = (name) => {
    return name.length > 0 && name.length <= 50
}

const checkValidDescription = (description) => {
    return description.length >= 0 && description.length <= 500
}

const Exercise = ( { exercise = null } ) => {
    const { routineId } = useParams()

    const nameRef = useRef()
    const msgRef = useRef()

    const [edit, setEdit] = useState(false)
    const [exerciseName, setExerciseName] = useState(exercise?.name ?? '')
    const [validExerciseName, setValidExerciseName] = useState(exercise?.name ? checkValidName(exercise.name) : false)
    const [exerciseNameFocus, setExerciseNameFocus] = useState(false)
    const [exerciseOrder, setExerciseOrder] = useState(exercise?.order ?? '')
    const [exerciseDesc, setExerciseDesc] = useState(exercise?.description ? checkValidDescription(exercise.description) : false)
    const [validExerciseDesc, setValidExerciseDesc] = useState(true)
    const [exerciseDescFocus, setExerciseDescFocus] = useState(false)
    const [exerciseMuscleType, setExerciseMuscleType] = useState(exercise?.muscleType ?? '')
    const [exerciseCompleted, setExerciseCompleted] = useState(exercise?.completed ?? '')
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

    const descOverLimit = exerciseDesc.length > descMaxLength
    // initial state of readMore
    useEffect(() => {
        setReadMore(!descOverLimit)
    }, [exerciseDesc])

    useEffect(() => {
        setValidExerciseName(checkValidName(exerciseName))
    }, [exerciseName])

    useEffect(() => {
        setValidExerciseDesc(checkValidDescription(exerciseDesc))
    }, [exerciseDesc])

    const resetInfo = () => {
        if (exercise) {
            setExerciseName(exercise.name)
            setExerciseMuscleType(exercise.muscleType)
            setExerciseOrder(exercise.order)
            setExerciseDesc(exercise.description)
        }
    }

    const exerciseFormId = `exercise_form_${exercise.id}`

    useEffect(() => {
        if (edit) {
            nameRef.current.focus()
        }
        
        if (exercise) {
            const form = document.getElementById(exerciseFormId)
            // const exerciseNameInput = form.querySelector('#exercise_name__input');
            const exerciseMuscleTypeInput = form.querySelector('#exercise_muscType__input');
            const exerciseOrderInput = form.querySelector('#exercise_order__input');

            if (edit) {
                // exerciseNameInput.removeAttribute('disabled')
                exerciseMuscleTypeInput.removeAttribute('disabled')
                exerciseOrderInput.removeAttribute('disabled')
            } else {
                // exerciseNameInput.setAttribute('disabled', '')
                exerciseMuscleTypeInput.setAttribute('disabled', '')
                exerciseOrderInput.setAttribute('disabled', '')
            }
        }
    }, [edit])

    // console.log('re-render: ', exercise.id)

    const exerciseFormSubmitHandler = async(e) => {
        e.preventDefault()
        setExerciseMessage('')

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
                const isNameValid = checkValidName(exerciseName)
                const isDescValid = checkValidDescription(exerciseDesc)
                if (!isNameValid || !isDescValid) {
                    setExerciseMessage('Please provide valid inputs!')
                    msgRef.current.focus()
                    return
                }

                setEdit(false)
                form.classList.add('disabled')
                
                try {
                    const body = { 
                        'name': exerciseName ?? '',
                        'muscleType': exerciseMuscleType ?? '',
                        'order': exerciseOrder === '' ? 0 : exerciseOrder ?? 0,
                        'description': exerciseDesc ?? ''
                    }
                    // console.log(payload)
                    const response = await updateExercise({ routineId, sessionId: exercise.sessionId, exerciseId: exercise.id, body }).unwrap()
                        .then((payload) => {
                            // setExerciseMessage('Success!');
                        })
                        .catch((error) => {
                            msgRef.current.focus()
                            if (!error?.data) {
                                setExerciseMessage('No Server Response!');
                            } else if (error?.data) {
                                const message = error?.data?.message ?? 'Error!'
                                setExerciseMessage(message)
                            } else {
                                setExerciseMessage('Edit exercise failed!')
                            }
                        })
                } catch (error) {
                    setExerciseMessage('Edit exercise failed!')
                    msgRef.current.focus()
                } finally {
                    form.classList.remove('disabled')
                }
                
                break
            case 'delete':
                setEdit(false)
                form.classList.add('disabled')

                try {
                    const response = await deleteExercise({ routineId, sessionId: exercise.sessionId, exerciseId: exercise.id }).unwrap()
                        .then((payload) => {
                            // setExerciseMessage('Success!');
                        })
                        .catch((error) => {
                            msgRef.current.focus()
                            if (!error?.data) {
                                setExerciseMessage('No Server Response!');
                            } else if (error?.data) {
                                const message = error?.data?.message ?? 'Error!'
                                setExerciseMessage(message)
                            } else {
                                setExerciseMessage('Delete exercise failed!')
                            }
                        })
                } catch (error) {
                    setExerciseMessage('Delete exercise failed!')
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
    
    if (exercise?.id) {
        const description = readMore ? exerciseDesc : `${exerciseDesc.slice(0, descMaxLength)}...`

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
                        
                        { edit ? 
                            <>
                                <label htmlFor='exercise_name__ta' className='info_label info_text_padding offscreen'>Name:</label>
                                <textarea id='exercise_name__ta' className='exercise_name__ta'
                                    ref={nameRef}
                                    onFocus={() => setExerciseNameFocus(true)}
                                    onBlur={() => setExerciseNameFocus(false)}
                                    aria-invalid={validExerciseName ? "false" : "true"}
                                    aria-describedby="nameNote"
                                    value={ exerciseName }
                                    onChange={(e) => {return setExerciseName(e.target.value)}}
                                ></textarea>
                                <p id="nameNote" className={exerciseNameFocus && exerciseName && !validExerciseName ? "instructions" : "offscreen"}>
                                    <FaCircleInfo /><br/>
                                    Please enter a name that is 1 to 50 characters.
                                </p>
                            </>
                            :
                            <h1 className='exercise_name__h1'>{ exerciseName }</h1>
                        }
                        
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
                            <>
                                <textarea id='exercise_desc__ta' className='exercise_desc__ta' rows={4}
                                    onFocus={() => setExerciseDescFocus(true)}
                                    onBlur={() => setExerciseDescFocus(false)}
                                    aria-invalid={validExerciseDesc ? "false" : "true"}
                                    aria-describedby="descNote"
                                    value={ exerciseDesc }
                                    onChange={(e) => {return setExerciseDesc(e.target.value)}}
                                ></textarea>
                                <p id="descNote" className={exerciseDescFocus && exerciseDesc && !validExerciseDesc? "instructions" : "offscreen"}>
                                    <FaCircleInfo /><br/>
                                    Please enter a description that is 0 to 500 characters.
                                </p>
                            </>
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
                    <p id='exercise_msg__p' ref={msgRef}>{exerciseMessage}</p>
                </form>
                <Sets
                    exercise={exercise}
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