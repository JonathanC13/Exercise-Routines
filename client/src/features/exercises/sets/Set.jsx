import React from 'react'
import { useState, useEffect } from 'react'

const Set = ( { set = null } ) => {

    const [edit, setEdit] = useState(false)
    const [exSetOrder, setExSetOrder] = useState(set ? set.order : '')
    const [exSetWeight, setExSetWeight] = useState(set ? set.weight : '')
    const [exSetReps, setExSetReps] = useState(set ? set.repsOrDuration : '')
    const [exSetRest, setExSetRest] = useState(set ? set.restTimeSeconds : '')

    const setFormHandler = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        switch (action) {
            case 'edit':
                setEdit(true)
                break
            case 'save':
                console.log('sent save')
                setEdit(false)
                break
            case 'delete':
                console.log('send delete')
                setEdit(false)
                break
            default:
                break
        }
    }

    useEffect(() => {
        const exSetOrderInput = document.getElementById('set_order');
        const exSetWeightInput = document.getElementById('set_weight');
        const exSetRepsInput = document.getElementById('set_reps');
        const exSetRestInput = document.getElementById('set_rest');

        if (edit) {
            exSetOrderInput.removeAttribute('disabled')
            exSetWeightInput.removeAttribute('disabled')
            exSetRepsInput.removeAttribute('disabled')
            exSetRestInput.removeAttribute('disabled')
        } else {
            exSetOrderInput.setAttribute('disabled', '')
            exSetWeightInput.setAttribute('disabled', '')
            exSetRepsInput.setAttribute('disabled', '')
            exSetRestInput.setAttribute('disabled', '')
        }
    }, [edit])

    let content = ''

    if (set) {
        content = <form className='set__form' onSubmit={setFormHandler}>
            <div className="set_header__div">
                <div className="order_info">
                    <label className='set_desc_order__label' htmlFor='set_order'><span className='center_text_vert'>Order:</span></label>
                    <input className='set_order_value__input' id="set_order" name="set_order" 
                        value={exSetOrder}
                        onChange={e => setExSetOrder(e.target.value)}
                    ></input>
                </div>
                <div className="set_complete__div">
                    <span className='set_complete__box'>L  l</span>
                    {/* complete check has animation of timed filling based on rest number in seconds. box always on right*/}
                    {/* below is edit button, will change edit state = true and will load setEditForm from this component */}
                </div>
            </div>
            <div className="set_info__div">
                <div className="set_desc__div">
                    <div className="set_desc_itm__div">
                        <label className='set_desc_title__label' htmlFor='set_weight'>Weight</label>
                        <input className='set_desc_value__input' id="set_weight" name="set_weight"
                            value={exSetWeight}
                            onChange={e => setExSetWeight(e.target.value)}
                        ></input>
                    </div>
                    <div className="set_desc_itm__div">
                        <label className='set_desc_title__label' htmlFor='set_reps'>Reps/Dur</label>
                        <input className='set_desc_value__input' id="set_reps" name="set_reps"
                            value={exSetReps}
                            onChange={e => setExSetReps(e.target.value)}
                        ></input>
                    </div>
                    <div className="set_desc_itm__div">
                        <label className='set_desc_title__label' htmlFor='set_rest'>Rest (sec)</label>
                        <input className='set_desc_value__input' id="set_rest" name="set_rest"
                            value={exSetRest}
                            onChange={e => setExSetRest(e.target.value)}
                        ></input>
                    </div>
                </div>
            </div>
            <div className="edit__div">
                <button className="set_edit__button cursor_pointer" name='edit' value='edit'>
                    Edit
                </button>
                <button className="set_edit__button cursor_pointer" name='delete' value='delete'>
                    Delete
                </button>
                <button className="set_edit__button cursor_pointer" name='save' value='save'>
                    Save
                </button>
            </div>
        </form>
    }

  return (
    <section className='set__section'>
        { content }
    </section>
  )
}

export default Set