import React from 'react'
import { memo, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useUpdateExerciseMutation, useDeleteExerciseMutation } from './exerciseApiSlice'
import Sets from './sets/Sets.jsx'

const Exercise = ( { exercise = null } ) => {
    const { routineId } = useParams()

    const [updateExercise, { isLoading }] = useUpdateExerciseMutation()

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

    const description = readMore ? exercise.description : `${exercise.description.slice(0, descMaxLength)}...`

    // console.log('re-render: ', exercise.id)

    const updateExerciseRequestHandler = async(payload) => {
        const body = {
            ...payload
        }

        try {
            const response = await updateExercise({ routineId, sessionId: exercise.sessionId, exerciseId: exercise.id, body }).unwrap()
            return response
        } catch (err) {
            console.error('Failed to save the exercise: ', err)
        }
        return null
    }

    const updateExerciseHandler = async(e, payload) => {
        e.preventDefault()
        const form = e.currentTarget

        // const { elements } = e.currentTarget
        // const name = elements['update-ex-name__input'].value
        try {
            const response = await updateExerciseRequestHandler(payload)
            form.reset()
        } catch (err) {
            console.error('Failed to save the exercise: ', err)
        }
    }

    let content = ''
    
    if (exercise) {
        
        content = <div className='exercise__div'>
            <div className="exercise_info__div">
                {/* <h1 className='exercise_title__h1'>Exercise</h1> */}
                <h1 className='exercise_name__h1'>{ exercise.name }</h1>
                <div className='info__div'>
                    <span className='info_label info_text_padding'>Order:</span>
                    <span className='info_text_padding'>{exercise.order}</span>
                </div>
                <div className='info__div'>
                        <span className='info_label info_text_padding'>Description:</span>
                        <div className='routine_info_desc__div info_text_padding'>
                            { description }
                            { descOverLimit && 
                                <div className="desc_footer__div">
                                    <div className='readMore' onClick={toggleReadMoreHandler}>{readMore ? 'Show less' : 'Read more'}</div>
                                </div>
                            }
                        </div>
                    </div>
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