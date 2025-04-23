import React from 'react'
// import { useGetSessionsQuery } from '../sessions/sessionsApiSlice'
import { useParams } from 'react-router'
import Exercise from './Exercise'
import { useDispatch } from 'react-redux'
import { exerciseAddFormOpenChanged } from '../modals/addFormModals/addFormModalsSlice'

const createExerciseComps = (exercises) => {

    const comps = exercises.map((ex) => {
        return <Exercise
                key={ex.id}
                exercise={ex}
            ></Exercise>
    })

    return comps
}

const Exercises = ( {session = {}, sessionUpdateFunc = () => {}} ) => {

    const { routineId } = useParams()

    const exercises = session ? session.exercises ?? [] : []
    const dispatch = useDispatch()

    const openExercisesAddFormHandler = (e) => {
        const rootDoc = document.getElementById('root')
        const buttonDimensions = e.target.getBoundingClientRect()
        const center = buttonDimensions.left + (buttonDimensions.right - buttonDimensions.left) / 2;
        const bottom = buttonDimensions.bottom - 3 + rootDoc.scrollTop
        dispatch(exerciseAddFormOpenChanged({ addFormOpen: true, addFormType: 'exerciseAddForm', routineId: routineId, session: session}))
    }

    let content = ''
    
    if (exercises) {
        content = 
        <>
            <div className="exercises_title__div">
                <h1 className='exercises_title__h1'>Exercises</h1>
                <div className='exercises_title_underline'></div>
            </div>
            <section className="exercises_add__section">
                <button className="exercises_add__button cursor_pointer" onClick={(e) => openExercisesAddFormHandler(e)}>Add Exercise</button>
            </section>
            {createExerciseComps(exercises)}
        </>
    }

  return (
    <section className='exercises__section'>
        { content }
    </section>
  )
}

export default Exercises