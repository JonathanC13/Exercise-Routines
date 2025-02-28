import React from 'react'
// import { useGetSessionsQuery } from '../sessions/sessionsApiSlice'
import Exercise from './Exercise'

const createExerciseComps = (exercises) => {

    const comps = exercises.map((ex) => {
        return <Exercise
                key={ex.id}
                exercise={ex}
            ></Exercise>
    })

    return comps
}

const Exercises = ( {exercises = []} ) => {

    let content = ''
    
    if (exercises) {
        content = 
        <>
            <div className="exercises_title__div">
                <h1 className='exercises_title__h1'>Exercises</h1>
                <div className='exercises_title_underline'></div>
            </div>
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