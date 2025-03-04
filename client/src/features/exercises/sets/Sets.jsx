import React from 'react'
import Set from './Set'

const createSetComps = (sets, updateExerciseRequestHandler) => {
    const comps = sets.map((set) => {
        return <Set
            key={set.id}
            sets={sets}
            setId={set.id}
            updateExerciseRequestHandler={updateExerciseRequestHandler}
        ></Set>
    })

    return comps
}

const Sets = ( { sets = [], updateExerciseRequestHandler = () => {} } ) => {
    let content = ''

    if (sets) {
        content = 
        <div className='sets__div'>
            <div className='info__div'>
                <span className='info_label info_text_padding'>Sets:</span>
            </div>
            <section className="set_items__section">
                { createSetComps(sets, updateExerciseRequestHandler) }
            </section>
        </div>
    }

  return (
    <section className='sets__section'>
        { content }
    </section>
  )
}

export default Sets