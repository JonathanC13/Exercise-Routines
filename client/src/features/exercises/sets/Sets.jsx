import React from 'react'
import Set from './Set'
import AddSetForm from './AddSetForm'
import { useDispatch } from 'react-redux'
import { exSetAddFormOpenChanged } from './exSetAddFormSlice'

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
    const dispatch = useDispatch()

    const openSetAddFormHandler = (e) => {
        const rootDoc = document.getElementById('root')
        const buttonDimensions = e.target.getBoundingClientRect()
        const center = buttonDimensions.left + (buttonDimensions.right - buttonDimensions.left) / 2;
        const bottom = buttonDimensions.bottom - 3 + rootDoc.scrollTop
        dispatch(exSetAddFormOpenChanged({ exSetAddFormOpen: true, location: {center:center, bottom:bottom }}))
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
                    { createSetComps(sets, updateExerciseRequestHandler) }
                    <section className="sets_add__section">
                        <button className="sets_add__button" onClick={(e) => openSetAddFormHandler(e)}>Add Set</button>
                    </section>
                </section>
                
            </div>
            <AddSetForm
                sets={sets}
                updateExerciseRequestHandler={updateExerciseRequestHandler}
            ></AddSetForm>
        </>
    }

  return (
    <section className='sets__section'>
        { content }
    </section>
  )
}

export default Sets