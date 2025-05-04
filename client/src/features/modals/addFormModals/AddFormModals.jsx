import React from 'react'
import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import RoutineAddForm from '../../routines/RoutineAddForm'
import SessionAddForm from '../../sessions/SessionAddForm'
import ExerciseAddForm from '../../exercises/ExerciseAddForm'
import SetAddForm from '../../exercises/sets/SetAddForm'
import { addFormClosed } from './addFormModalsSlice'
import { FaXmark } from 'react-icons/fa6'

const AddFormModals = () => {
    const dispatch = useDispatch()

    const modalBgDiv = useRef(null)

    const { addFormOpen, addFormType } = useSelector(state => state.addFormModals)
    const theme = useSelector(state => state.auth.preferredTheme)

    useEffect(() => {
        if (modalBgDiv.current !== null) {
            if (!addFormOpen) {
                modalBgDiv.current.classList.add('offscreen')
            } else {
                modalBgDiv.current.classList.remove('offscreen')
            }
        }
    }, [addFormOpen, location])

    const closeAddFormHandler = (e) => {
        dispatch(addFormClosed())
    }

    let content = ''
    if (addFormType !== '') {
        let formContent = ''
        switch (addFormType) {
            case 'routineAddForm':
                formContent = <RoutineAddForm theme={theme}></RoutineAddForm>
                break;
            case 'sessionAddForm':
                formContent = <SessionAddForm theme={theme}></SessionAddForm>
                break;
            case 'exerciseAddForm':
                formContent = <ExerciseAddForm theme={theme}></ExerciseAddForm>
                break;
            case 'setAddForm':
                formContent = <SetAddForm theme={theme}></SetAddForm>
                break;
            default:
                // formContent = <p>No matching add form.</p>
                break;
        }
        
        content = 
            <div className="modal_bg__div" ref={modalBgDiv}>
                <section className={`add_form_modal__section add_form_modal__section--color-${theme}`}>
                    <div className="add_form_modal_x__div">
                        <button type='button' className={`cursor_pointer add_form_modal_x__button add_form_modal_x__button--color-${theme}`} name='close_modal__button' onClick={closeAddFormHandler}>
                            <FaXmark></FaXmark>
                        </button>
                    </div>
                    { formContent }
                </section>
            </div>
    }

  return createPortal (
        content,
        document.getElementById('root')
    )
}

export default AddFormModals