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

const Exercises = ( {exercises = null} ) => {

    let content = ''
    
    if (exercises) {
        content = <>{createExerciseComps(exercises)}</>
    }

  return (
    <section>
        <h1>Exercises</h1>
        { content }
    </section>
  )
}

export default Exercises