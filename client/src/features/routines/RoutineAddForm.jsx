import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAddRoutineMutation } from './routinesApiSlice'
import { addFormClosed } from '../modals/addFormModals/addFormModalsSlice'

const RoutineAddForm = () => {
    const dispatch = useDispatch()

    const [addRoutine, { isLoading }] = useAddRoutineMutation()

    // controlled inputs
    const [order, setOrder] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [msg, setMsg] = useState('')

    const resetControlledInputs = () => {
        setOrder('')
        setName('')
        setDescription('')
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

    const addRoutineRequestHandler = async(body) => {
        try {
            const response = await addRoutine({ body }).unwrap()
            return { success: true, response }
        } catch (error) {
            return { success: false, error}
        }
    }

    const addRoutineHandler = async(e) => {
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
        
        const response = await addRoutineRequestHandler(payload)
        form.classList.remove('disabled')

        if (response?.success) {
            closeAddFormHandler()
            return
        }
        
        const message = response?.error?.data?.message ?? 'Error'
        setMsg(message)
    }

    let content = 
        <form onSubmit={(e) => {addRoutineHandler(e)}} className="add_routine__form">
            <h1 className="add_routine__h1">Add Routine</h1>
            <div className="add_routine_input__div">
                <label htmlFor="add_routine_order__input" className="add_routine__label">Order</label>
                <input type="number" className="add_routine_order__input" id="add_routine_order__input" 
                    value={order}
                    onChange={(e) => {setOrder(e.target.value)}}
                />
            </div>
            <div className="add_routine_input__div">
                <label htmlFor="add_routine_name__input" className="add_routine__label">Name</label>
                <input required type="text" className="add_routine_name__input" id="add_routine_name__input"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                />
            </div>
            <div className="add_routine_input__div">
                <label htmlFor="add_routine_desc__ta" className="add_routine__label">Description</label>
                <textarea className="add_routine_desc__ta" id="add_routine_desc__ta" name="add_routine_desc__ta" rows='2'
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
                ></textarea>
            </div>
            <div className="add_routine_input__div">
                <button className="add_routine__button cursor_pointer" type="submit" disabled={isLoading}>
                    Add Routine
                </button>
            </div>
            <div className="add_routine__div">
                <p className="add_routine__p">{msg}</p>
            </div>
        </form>


  return    <>
                {content}
            </>
}

export default RoutineAddForm