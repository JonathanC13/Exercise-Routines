import React from 'react'
import Set from './Set'
import { useDispatch } from 'react-redux'
import { exSetAddFormOpenChanged } from '../../modals/addFormModals/addFormModalsSlice'
import { useParams } from 'react-router'

const createSetComps = (sessionId, exerciseId, sets) => {
    const comps = sets.map((set) => {
        return <Set
            key={set.id}
            sessionId={sessionId}
            exerciseId={exerciseId}
            sets={sets}
            setId={set.id}
        ></Set>
    })

    return comps
}

const Sets = ( { exercise = {} } ) => {

    const { routineId } = useParams()

    const dispatch = useDispatch()
    const sets = exercise.sets || []

    const openSetAddFormHandler = (e) => {
        const rootDoc = document.getElementById('root')
        const buttonDimensions = e.target.getBoundingClientRect()
        const center = buttonDimensions.left + (buttonDimensions.right - buttonDimensions.left) / 2;
        const bottom = buttonDimensions.bottom - 3 + rootDoc.scrollTop
        dispatch(exSetAddFormOpenChanged({ addFormOpen: true, addFormType: 'setAddForm', routineId: routineId, sessionId: exercise.sessionId, exercise: exercise}))
    }

    let content = ''

    if (sets) {
        content = 
        <>
            <div className='sets__div'>
                <div className='info__div'>
                    <span className='info_label info_text_padding'>Sets:</span>
                </div>
                <section className="set_items__section">
                    { createSetComps(exercise.sessionId, exercise.id, sets) }
                    <section className="sets_add__section">
                        <button className="sets_add__button cursor_pointer" onClick={(e) => openSetAddFormHandler(e)}>Add Set</button>
                    </section>
                </section>
                
            </div>
        </>
    }

  return (
    <section className='sets__section'>
        { content }
    </section>
  )
}

export default Sets