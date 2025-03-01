import React from 'react'
import { memo } from 'react'
import { useParams } from 'react-router'
import { useUpdateExerciseMutation, useDeleteExerciseMutation } from './exerciseApiSlice'
import Sets from './sets/Sets.jsx'

const Exercise = ( { exercise = null } ) => {

    const { routineId } = useParams()

    const [updateExercise, { isLoading }] = useUpdateExerciseMutation()

    // console.log('re-render: ', exercise.id)

    const updateExerciseHandler = async(e) => {
        e.preventDefault()
        const form = e.currentTarget

        const { elements } = e.currentTarget
        const name = elements['update-ex-name__input'].value

        const body = {
            name
        }

        try {
            await updateExercise({ routineId, sessionId: exercise.sessionId, exerciseId: exercise.id, body }).unwrap()
            
            form.reset()
        } catch (err) {
            console.error('Failed to save the post: ', err)
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
                <Sets
                    sets={exercise.sets}
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