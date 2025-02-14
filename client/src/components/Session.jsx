import React from 'react'

const createExerciseComps = (sessionId) => {
    const comps = []

    // iterate the session entity adapter for the exercise IDs and then send each exercise Id to the Exercise component.

    return comps
}

const Session = ( { sessionId }) => {
  return (
    <section className="session__section">
        <h1>session name</h1>
        <h2>Order</h2>
        <p>Description</p>
        <label htmlFor="session__chkbx"></label>
        <input type="checkbox" className="session__chkbx" id="session__chkbx"/>
        <button>Edit icon for session</button>
        {sessionAlone ? <></> : <button>enlarge icon for session into own page</button>}
        

    </section>
  )
}

export default Session