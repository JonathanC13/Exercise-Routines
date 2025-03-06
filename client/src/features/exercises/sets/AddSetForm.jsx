import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { exSetAddFormOpenChanged } from './exSetAddFormSlice'
import { FaXmark } from 'react-icons/fa6'

const AddSetForm = ( {exerciseName = '', sets={}, updateExerciseRequestHandler = () => {} }) => {
    const exSetAddFormRef = useRef(null)

    const { exSetAddFormOpen, location } = useSelector(state => state.exSetAddForm)
    const dispatch = useDispatch()

    const [exSetOrder, setExSetOrder] = useState('')
    const [exSetWeight, setExSetWeight] = useState('')
    const [exSetReps, setExSetReps] = useState('')
    const [exSetRest, setExSetRest] = useState('')

    useEffect(() => {
        if (exSetAddFormOpen) {
            exSetAddFormRef.current.classList.add('height_100')
        } else {
            exSetAddFormRef.current.classList.remove('height_100')
        }
        const form = exSetAddFormRef.current
        const formDimensions = form.getBoundingClientRect()
        const {center, bottom} = location
        // form.style.left = `${center}px`
        // form.style.top = `${bottom}px`
    }, [exSetAddFormOpen, location])

    const addSetHandler = async(e) => {
        const form = e.currentTarget
        // form.classList.add('disabled')

        const addFormData = {
            'order': exSetOrder,
            'weight': exSetWeight,
            'repsOrDuration': exSetReps,
            'restTimeSeconds': exSetRest
        }

        const payload = {
            'sets': [...sets, addFormData]
        }
        for (let i of payload.sets) {
            console.log(i)
        }
        // try {
        //     const response = updateExerciseRequestHandler(payload)
        //     form.reset()
        // } catch (err) {
        //     document.getElementById('add_set_msg__p').innerText = `Failed to save the exercise (set): ${err}`
        // }

        // form.classList.remove('disabled')
    }

    const closeSetAddFormHandler = () => {
        dispatch(exSetAddFormOpenChanged({exSetAddFormOpen: false, location: {center:-9000, bottom:0}}))
    }

    const grayZoneClickHandler = () => {
        // todo, add stop bubble down
    }


    // add_set__section for background opague onclick stops bubble down to below coponents = behaviour: closes this form, add_set__form for form container
  return (
    <>
        <div className="add_set_bg__div">
            <form className="add_set__form" onSubmit={addSetHandler} ref={exSetAddFormRef}>
                <div className="add_set_x__div">
                    <button onClick={closeSetAddFormHandler}>
                        <FaXmark></FaXmark>
                    </button>
                </div>
                <h1 className="add_set__h1">Add Set</h1>
                <div className='add_set_ex__div'>
                    <h1 className='info_label_routine info_text_padding'>Exercise:</h1>
                    <h1 className='info_text_padding'>{exerciseName}</h1>
                </div>

                <div className="add_set_input__div">
                    <label id='add_set_order__label' htmlFor="add_set_order__input" className="add_set_order__label">Order</label>
                    <input type="number" id='add_set_order__input' className='add_set_order__input' name='add_set_order__input'
                        value={exSetOrder}
                        onChange={(e) => {setExSetOrder(e.target.value)}}
                    />
                </div>

                <div className="add_set_input__div">
                    <label id='add_set_weight__label' htmlFor="add_set_weight__input" className="add_set_order__label">Weight</label>
                    <input type="text" id='add_set_weight__input' className='add_set_weight__input' name='add_set_weight__input'
                        value={exSetWeight}
                        onChange={(e) => {setExSetWeight(e.target.value)}}
                    />
                </div>

                <div className="add_set_input__div">
                    <label id='add_set_reps__label' htmlFor="add_set_reps__input" className="add_set_order__label">Reps/Duration</label>
                    <input type="text" id='add_set_reps__input' className='add_set_reps__input' name='add_set_reps__input'
                        value={exSetReps}
                        onChange={(e) => {setExSetReps(e.target.value)}}
                    />
                </div>

                <div className="add_set_input__div">
                    <label id='add_set_rest__label' htmlFor="add_set_rest__input" className="add_set_order__label">Rest (seconds)</label>
                    <input type="number" id='add_set_rest__input' className='add_set_rest__input' name='add_set_rest__input'
                        value={exSetRest}
                        onChange={(e) => {setExSetRest(e.target.value)}}
                    />
                </div>

                <button type='submit' name='add_set__button'>Add Set</button>

                <p className="add_set_msg__p" id='add_set_msg__p'></p>
            </form>
        </div>
    </>
  )
}

export default AddSetForm