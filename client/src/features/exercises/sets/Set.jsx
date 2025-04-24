import React from 'react'
import { useState, useEffect, memo, useRef } from 'react'
import { FaTrashCan } from 'react-icons/fa6'
// import { useUpdateExerciseMutation } from '../exerciseApiSlice'
import { useParams } from 'react-router-dom'
import TimerBox from '../../timerBox/TimerBox'

const Set = ( { sessionId = null, exerciseId = null, sets = [], setId = null, exerciseUpdateFunc = () => {} } ) => {
    // console.log('set rerender')

    const { routineId } = useParams()

    const orderRef = useRef()
    const msgRef = useRef()
    
    const set = sets.find((set) => {
        return set.id === setId
    })

    // const [updateExercise, { isLoading }] = useUpdateExerciseMutation()
    
    const [edit, setEdit] = useState(false)
    const [exSetOrder, setExSetOrder] = useState(set?.order ?? '')
    const [exSetWeight, setExSetWeight] = useState(set?.weight ?? '')
    const [exSetReps, setExSetReps] = useState(set?.repsOrDuration ?? '')
    const [exSetRest, setExSetRest] = useState(set?.restTimeSeconds ?? '')
    // const [exSetCompleted, setExSetCompleted] = useState(set?.completed ?? false)
    const [exSetMessage, setExSetMessage] = useState('')

    // useEffect(() => {
    //     setExSetOrder(set.order)
    //     setExSetWeight(set.weight)
    //     setExSetReps(set.repsOrDuration)
    //     setExSetRest(set.restTimeSeconds)
    // }, [])

    const resetInfo = () => {
        if (set?.id) {
            setExSetOrder(set.order)
            setExSetWeight(set.weight)
            setExSetReps(set.repsOrDuration)
            setExSetRest(set.restTimeSeconds ?? '')
        }
    }

    const exSetFormId = `set_form_${setId}`

    useEffect(() => {
        if (edit) {
            orderRef.current.focus()
        }

        if (set) {
            const form = document.getElementById(exSetFormId)
            const exSetOrderInput = form.querySelector('#set_order');
            const exSetWeightInput = form.querySelector('#set_weight');
            const exSetRepsInput = form.querySelector('#set_reps');
            const exSetRestInput = form.querySelector('#set_rest');

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
        }
    }, [edit])

    const validateNumber = (val, cb) => {
        if (isNaN(Number(val))) {
            return
        } else {
            cb(val)
        }
    }

    const buildSetBody = () => {
        return { 
            'sets': sets.map((set) => {
                if (set.id === setId) {
                    const newObj = {}
                    for (let [key, val] of Object.entries(set)) {
                        switch(key) {
                            case ('order'):
                                newObj.order = exSetOrder
                                break
                            case ('weight'):
                                newObj.weight = exSetWeight
                                break
                            case ('repsOrDuration'):
                                newObj.repsOrDuration = exSetReps
                                break
                            case ('restTimeSeconds'):
                                newObj.restTimeSeconds = exSetRest
                                break
                            // case ('completed'):
                            //     newObj.completed = exSetCompleted
                            //     break
                            default:
                                newObj[key] = val
                                break
                        }
                    }
                    return newObj
                }
                return set
            })
        }
    }

    const updateSetFunc = async() => {
        const body = buildSetBody()
        // console.log(body)
        await exerciseUpdateFunc(body)
    }
    
    const updateSetCompletedFunc = async(completed) => {

        const body = {'sets': sets.map((set) => {
                if (set.id === setId) {
                    const newObj = {}
                    for (let [key, val] of Object.entries(set)) {
                        switch(key) {
                            case ('completed'):
                                newObj.completed = completed
                                break
                            default:
                                newObj[key] = val
                                break
                        }
                    }
                    return newObj
                }
                return set
            })
        }

        await exerciseUpdateFunc(body)
    }

    const exSetFormSubmitHandler = async(e) => {
        e.preventDefault();
        setExSetMessage('')
        const action = e.nativeEvent.submitter.value;
        const form = e.currentTarget
        switch (action) {
            case 'edit':
                setEdit(true)
                break
            case 'cancel':
                form.reset()
                resetInfo()
                setEdit(false)
                break
            case 'save':
                setEdit(false)
                form.classList.add('disabled')

                await updateSetFunc()

                form.classList.remove('disabled')
                
                break
            case 'delete':
                setEdit(false)
                form.classList.add('disabled')

                const payloadDel = {
                    'sets': sets.filter((set) => {return set.id !== setId})
                }

                await exerciseUpdateFunc(payloadDel)

                form.classList.remove('disabled')

                break
            default:
                break
        }
    }


    let content = ''

    if (set?.id) {
        const setOptionButtons = 
            edit ?
                <div className='editing__div'>
                    <button className="set_delete__button cursor_pointer" name='delete' value='delete'>
                        <FaTrashCan></FaTrashCan>
                    </button>
                    <div className="modifyOpts__div">
                        <button className="set_cancel__button cursor_pointer" name='cancel' value='cancel'>
                            Cancel
                        </button>
                        <button className="set_save__button cursor_pointer" name='save' value='save'>
                            Save
                        </button>
                    </div>
                </div> :
                <div className="edit__div">
                    <button className="set_edit__button cursor_pointer" name='edit' value='edit'>
                        Edit Set
                    </button>
                </div>

        content = <form id={exSetFormId} className='set__form' onSubmit={exSetFormSubmitHandler}>
            <div className="set_header__div">
                <div className="order_info">
                    <label className='set_desc_order__label' htmlFor='set_order'><span className='center_text_vert'>Order:</span></label>
                    <input className='set_order_value__input' id="set_order" name="set_order" disabled
                        ref={orderRef}
                        value={exSetOrder}
                        onChange={e => validateNumber(e.target.value, setExSetOrder)}
                    ></input>
                </div>
                <div className="set_complete__div">
                    <TimerBox
                        timerSeconds={exSetRest}
                        completedInit={set?.completed}
                        updateCallback={updateSetCompletedFunc}
                    ></TimerBox>
                    {/* complete check has animation of timed filling based on rest number in seconds. box always on right*/}
                    {/* below is edit button, will change edit state = true and will load setEditForm from this component */}
                </div>
            </div>
            <div className="set_info__div">
                <div className="set_desc__div">
                    <div className="set_desc_itm__div">
                        <label className='set_desc_title__label' htmlFor='set_weight'>Weight</label>
                        <input className='set_desc_value__input' id="set_weight" name="set_weight" disabled
                            value={exSetWeight}
                            onChange={e => setExSetWeight(e.target.value)}
                        ></input>
                    </div>
                    <div className="set_desc_itm__div">
                        <label className='set_desc_title__label' htmlFor='set_reps'>Reps/Dur</label>
                        <input className='set_desc_value__input' id="set_reps" name="set_reps" disabled
                            value={exSetReps}
                            onChange={e => setExSetReps(e.target.value)}
                        ></input>
                    </div>
                    <div className="set_desc_itm__div">
                        <label className='set_desc_title__label' htmlFor='set_rest'>Rest (sec)</label>
                        <input className='set_desc_value__input' id="set_rest" name="set_rest" disabled
                            value={exSetRest}
                            onChange={e => validateNumber(e.target.value, setExSetRest)}
                        ></input>
                    </div>
                </div>
            </div>
            { setOptionButtons }
            <p id='set_msg__p' ref={msgRef}>{exSetMessage}</p>
        </form>
    }

  return (
    <section className='set__section'>
        { content }
    </section>
  )
}

const memoizedSet = memo(Set)

export default memoizedSet