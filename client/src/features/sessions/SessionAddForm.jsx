import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addFormClosed } from '../modals/addFormModals/addFormModalsSlice'
import { useAddSessionMutation } from './sessionsApiSlice'

const SessionAddForm = () => {

    const dispatch = useDispatch()
    const { routine } = useSelector(state => state.addFormModals.sessionAddFormData)

    const [addSession, { isLoading }] = useAddSessionMutation()

    const [order, setOrder] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [msg, setMsg] = useState('')

    const resetControlledInputs = () => {
        setOrder('')
        setName('')
        setDescription('')
        setMsg('')
    }

    const closeAddFormHandler = (e) => {
        resetControlledInputs()
        dispatch(addFormClosed())
    }

    useEffect(() => {
        const cleanup = () => {
            resetControlledInputs()
        }
        return () => {
            cleanup()
        };
    }, []);

    const addSessionRequestHandler = async(body) => {
        try {
            const response = await addSession({ routineId: routine.id, body})
            return response
        } catch (error) {
            return error
        }
    }

    const addSessionHandler = async(e) => {
        e.preventDefault()

        if (name.length === 0) {
            setMsg('Please provide a name!')
            return
        }
        
        const form = e.currentTarget
        form.classList.add('disabled')
        
        const payload = {
            'order': order ?? 0,
            'name': name ?? '',
            'description': description ?? '',
        }
        
        const response = await addSessionRequestHandler(payload)
        form.classList.remove('disabled')
        if (response?.error) {
            const message = response?.error?.data?.message ?? 'Error'
            setMsg(message)
            return
        }

        closeAddFormHandler()
        return

        
    }

    let content = ''
    if (routine) {
        content = 
            <form onSubmit={(e) => {addSessionHandler(e)}} className="add_session__form">
                <h1 className="add_session__h1">Add Session</h1>
                <div className='add_form_assoc__div'>
                    <p className='info_label_routine info_text_padding'>Routine:</p>
                    <p className='info_value info_text_padding'>{routine.name}</p>
                </div>

                <div className="add_session_input__div">
                    <label htmlFor="add_session_order__input" className="add_session__label">Order</label>
                    <input type="number" className="add_session_order__input" id="add_routine_session__input" 
                        value={order}
                        onChange={(e) => {setOrder(e.target.value)}}
                    />
                </div>
                <div className="add_session_input__div">
                    <label htmlFor="add_session_name__input" className="add_session__label">Name</label>
                    <input required type="text" className="add_session_name__input" id="add_session_name__input"
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                    />
                </div>
                <div className="add_session_input__div">
                    <label htmlFor="add_session_desc__ta" className="add_session__label">Description</label>
                    <textarea className="add_session_desc__ta" id="add_session_desc__ta" name="add_session_desc__ta" rows='2'
                        value={description}
                        onChange={(e) => {setDescription(e.target.value)}}
                    ></textarea>
                </div>
                <div className="add_session_input__div">
                    <button className="add_session__button cursor_pointer" type="submit" disabled={isLoading}>
                        Add Routine
                    </button>
                </div>
                <div className="add_session__div">
                    <p className="add_session__p">{msg}</p>
                </div>
            </form>
    }

  return (
    <>
        { content }
    </>
  )
}

export default SessionAddForm