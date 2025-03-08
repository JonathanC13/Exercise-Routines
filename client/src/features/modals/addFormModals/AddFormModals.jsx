import React from 'react'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'
import SetAddForm from '../../exercises/sets/setAddForm'
import ExerciseAddForm from '../../exercises/ExerciseAddForm'
import { addFormClosed } from './addFormModalsSlice'
import { FaXmark } from 'react-icons/fa6'

const AddFormModals = () => {
    const dispatch = useDispatch()

    const modalBgDiv = useRef(null)

    const { addFormOpen, addFormType } = useSelector(state => state.addFormModals)

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
        const formContent = ''
        switch (addFormType) {
            case 'addSetForm':
                formContent = <SetAddForm></SetAddForm>
                break;
            case 'addExerciseForm':
                formContent = <ExerciseAddForm></ExerciseAddForm>
                break;
            default:
                break;
        }

        content = 
            <div className="modal_bg__div" ref={modalBgDiv}>
                <div className="add_form_modal_x__div">
                    <button type='button' className='add_form_modal_x__button cursor_pointer' name='close_modal__button' onClick={closeAddFormHandler}>
                        <FaXmark></FaXmark>
                    </button>
                </div>
                { formContent }
            </div>
    }

  return createPortal (
        content,
        document.getElementById('root')
    )
}

export default AddFormModals