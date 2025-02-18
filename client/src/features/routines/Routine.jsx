import React from 'react'
import { useParams } from "react-router";
// import Session from '../sessions/Sessions';

// const createSessionComps = (routineId) => {
//     const comps = []

//     // iterate the Routine with the routineId entity adapter and send the session Ids to the component that will render each session
//     const sessionId = 13213114
//     comps.push(<Session routineId={ sessionId }></Session>)

//     return comps
// }

const Routine = () => {
    // For specific Routine. Displays all the sessions.

    const params = useParams()
    const { routineId } = params

  return (
    <section>
        <h1>The routine's name</h1>
        <h2>The order</h2>
        <p>The description</p>
        <button>To navigate to edit Routine page</button>


    </section>
  )
}

export default Routine