import React from 'react'
import { memo } from 'react'
import { useParams } from 'react-router'
import { useUpdateExerciseMutation, useDeleteExerciseMutation } from './exerciseApiSlice'

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
        content = <>
            <h2>{exercise.name}</h2>
            <p>{exercise.order}</p>
            <p>{exercise.description}</p>

            <form onSubmit={(e) => {updateExerciseHandler(e)}}>
                <label htmlFor="update-ex-name__input">Name:</label>
                <input type="text" id="update-ex-name__input" defaultValue="" required />
                <button type='submit'>UPDATE</button>
            </form>
            
        </>
    }

  return (
    <section>
        <h1>Exercise</h1>
        {content}
    </section>
  )
}

const memoizedExercise = memo(Exercise)

export default memoizedExercise