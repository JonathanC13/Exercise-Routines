import React from 'react'
// import { selectRoutineById } from './routinesApiSlice'
import { memo, useState, useEffect } from 'react'
import { useGetRoutinesQuery, useUpdateRoutineMutation, useDeleteRoutineMutation } from './routinesApiSlice'
import { useNavigate } from 'react-router'
import classnames from 'classnames'

const months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'Aug',
  8: 'Sept',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec'
}

const formatDisplayDate = (strDate) => {
  const date = new Date(strDate)
  return `${date.getFullYear()}, ${months[date.getMonth()]} ${date.getDate()}`
}

const Routine = ( { routineId = null, isFetching = true } ) => {
    // console.log(`${routineId} has rendered!`)

    const { routine } = useGetRoutinesQuery('routinesList',
      {
        selectFromResult: ({ data }) => ({
          routine: data?.entities[routineId]
      }),
    })

    const [updateRoutine, { isLoading }] = useUpdateRoutineMutation()

    const [edit, setEdit] = useState(false)    
    const [routineName, setRoutineName] = useState(routine?.name ?? '')
    const [routineOrder, setRoutineOrder] = useState(routine?.order ?? '')
    const [routineDescription, setRoutineDescription] = useState(routine?.description ?? '')
    const [routineMessage, setRoutineMessage] = useState('')

    const routineFormId = `routine_form_${routine.id}`

    useEffect(() => {
      if (routine) {
        const form = document.getElementById(routineFormId)
        const routineNameInput = form.querySelector('#routine_name__input');
        const routineOrderInput = form.querySelector('#routine_order__input');

        if (edit) {
          routineNameInput.removeAttribute('disabled')
          routineOrderInput.removeAttribute('disabled')
        } else {
          routineNameInput.setAttribute('disabled', '')
          routineOrderInput.setAttribute('disabled', '')
        }
    }
    }, [edit])

    const [readMore, setReadMore] = useState(false)
    const descMaxLength = 100

    let navigate = useNavigate()

    const routineClickHandler = (routineIdParam) => {
      if (!isFetching) {
        navigate(`/routines/${routineIdParam}/sessions/`)
      }
    }

    const toggleReadMoreHandler = (event) => {
      event.stopPropagation()
      setReadMore(!readMore)
    }

    // const routine = useSelector(state => selectRoutineById(state, routineId))

    const descOverLimit = routine.description.length > descMaxLength
    
    // initial state of readMore
    useEffect(() => {
      setReadMore(!descOverLimit)
    }, [])

    const description = readMore ? routine.description : `${routine.description.slice(0, descMaxLength)}...`

    const updateRoutineRequestHandler = async(payload) => {
      const body = {
        ...payload
      }

      try {
        const response = await updateRoutine({ routine: routine.id, body }).unwrap()
        return {'success': true, response}
      } catch (error) {
        return {'success': false, error}
      }
    }

    const deleteRoutineRequestHandler = async(routine) => {
      try {
        const response = await useDeleteRoutineMutation({routineId: routine.id})
        return {'success': true, response}
      } catch (error) {
        return {'success': false, error}
      }
    }

    const routineFormSubmitHandler = async(e) => {
      e.preventDefault()
      
      const action = e.nativeEvent.submitter.value;
      const form = e.currentTarget
      switch (action) {
        case 'edit':
            setEdit(true)
              break
          case 'cancel':
              form.reset()
              if (routine) {
                  setExerciseName(routine.name)
                  setRoutineOrder(routine.order)
                  setRoutineDescription(routine.description)
              }
              setEdit(false)
              break
          case 'save':
              setEdit(false)
              form.classList.add('disabled')
              
              try {
                  const payload = { 
                      'name': routineName ?? '',
                      'order': routineOrder ?? 0,
                      'description': routineDescription ?? ''
                  }
                  // console.log(payload)
                  const response = await updateRoutineRequestHandler(payload)
                  // console.log(response)
                  if (!response?.success) {
                      throw new Error(response)
                  }
              } catch (error) {
                  setRoutineMessage(error?.data?.message ?? 'Error')
              } finally {
                  form.classList.remove('disabled')
              }
              
              break
          case 'delete':
              setEdit(false)
              form.classList.add('disabled')

              try {
                  const response = await deleteRoutineRequestHandler(routine)
                  if (!response?.success) {
                      throw new Error(response)
                  }
              } catch (error) {
                setRoutineMessage(error?.data?.message ?? 'Error')
              } finally {
                  form.classList.remove('disabled')
              }
          
              break
          default:
              break
      }
    }
    
    let content = ''
    if (routine) {
      // const routine = useSelector(selectRoutineById(routineId))
      let routineOptionButtons =
        edit ?
          <div className='editing__div'>
              <button className="routine_delete__button cursor_pointer" name='delete' value='delete'>
                  <FaTrashCan></FaTrashCan>
              </button>
              <div className="modifyOpts__div">
                  <button className="routine_cancel__button cursor_pointer" name='cancel' value='cancel'>
                      Cancel
                  </button>
                  <button className="routine_save__button cursor_pointer" name='save' value='save'>
                      Save
                  </button>
              </div>
          </div> :
          <div className="edit__div">
              <button className="routine_edit__button cursor_pointer" name='edit' value='edit'>
                  Edit Exercise
              </button>
          </div>

      const containerClassname = classnames('routine__form', {
        cursor_pointer: !isFetching
      })

      content = 
        <form id='routineFormId' className={containerClassname} onClick={() => {routineClickHandler(routine.id)}} onSubmit={routineFormSubmitHandler}>
          <div className='routine_name__div'>
            <label className='offscreen' htmlFor="routine_name__input">Name:</label>
            <input type="text" id='routine_name__input' className='routine_name__input'
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
            />
          </div>
          
          <section className="routine_info__div">
            <div className='routine__div_info'>
              <label htmlFor='routine_order__input' className='info_label info_text_padding'>Order:</label>
              <input id='routine_order__input' className='info_text_padding routine_order__input'>{routine.order}</input>
            </div>
            <div className='routine__div_info'>
              <label htmlFor='routine_desc__ta' className='info_label info_text_padding'>Description:</label>
              {
                edit ?
                  <textarea id='routine_desc__ta' className='routine_desc__ta' rows={4}
                  value={ routineDescription }
                  onChange={(e) => {return setRoutineDescription(e.target.value)}}
                ></textarea>
                :
                <div id='routine_info_desc__div' className='routine_info_desc__div info_text_padding'>
                  { description }
                  { descOverLimit && 
                      <div className="desc_footer__div">
                          <div className='readMore' onClick={toggleReadMoreHandler}>{readMore ? 'Show less' : 'Read more'}</div>
                      </div>
                  }
                </div>
              }
              
            </div>
            <div className='routine__div_footer'>
              <div className="routine_footer__timestamps">
                <span className='routine_footer__span'>Updated on: {formatDisplayDate(routine.updatedAt)}</span>
                <span className='routine_footer__span'>Created on: {formatDisplayDate(routine.createdAt)}</span>
              </div>
            </div>
          </section>
          { routineOptionButtons }
          <p id='routine_msg__p'>{routineMessage}</p>
        </form> 
    } else {
      content = <p>Not found</p>
    }

  return (
    <section className='routine__section'>
        { content }
    </section>
  )
}

const memoizedRoutine = memo(Routine)

export default memoizedRoutine