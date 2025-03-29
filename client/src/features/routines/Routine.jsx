import React from 'react'
// import { selectRoutineById } from './routinesApiSlice'
import { memo, useState, useEffect, useRef } from 'react'
import { useGetRoutinesQuery, useUpdateRoutineMutation, useDeleteRoutineMutation } from './routinesApiSlice'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { FaTrashCan, FaDoorOpen, FaCircleInfo } from 'react-icons/fa6'

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

const checkValidName = (name) => {
  return name.length > 0 && name.length <= 50
}

const checkValidDescription = (description) => {
  return description.length >= 0 && description.length <= 500
}

const Routine = ( { routineId = null, isFetching = true } ) => {
    // console.log(`${routineId} has rendered!`)
    const auth = useSelector(state => state.auth)

    const routineNameRef = useRef()
    const msgRef = useRef()

    const { routine } = useGetRoutinesQuery({token: auth?.credentials?.token},
      {
        selectFromResult: ({ data }) => ({
          routine: data?.entities[routineId] ?? {}
      }),
    })

    const [updateRoutine, { isLoading: isLoadingUpdate }] = useUpdateRoutineMutation()
    const [deleteRoutine, { isLoading: isLoadingDelete }] = useDeleteRoutineMutation()

    const [edit, setEdit] = useState(false)    
    const [routineName, setRoutineName] = useState(routine?.name ?? '')
    const [validRoutineName, setValidRoutineName] = useState(routine?.name ? checkValidName(routine.name) : false)
    const [routineNameFocus, setRoutineNameFocus] = useState(false)
    const [routineOrder, setRoutineOrder] = useState(routine?.order ?? '')
    const [routineDescription, setRoutineDescription] = useState(routine?.description ?? '')
    const [validRoutineDescription, setValidRoutineDescription] = useState(routine?.description ? checkValidDescription(routine.description) : false)
    const [routineDescriptionFocus, setRoutineDescriptionFocus] = useState(false)
    const [routineMessage, setRoutineMessage] = useState('')

    const routineFormId = `routine_form_${routine?.id}`

    useEffect(() => {
      if (edit) {
        routineNameRef.current.focus()
      }

      if (routine?.id) {
        const form = document.getElementById(routineFormId)
        // const routineNameInput = form.querySelector('#routine_name__input');
        const routineOrderInput = form.querySelector('#routine_order__input');

        if (edit) {
          // routineNameInput.removeAttribute('disabled')
          routineOrderInput.removeAttribute('disabled')
        } else {
          // routineNameInput.setAttribute('disabled', '')
          routineOrderInput.setAttribute('disabled', '')
        }
    }
    }, [edit])

    useEffect(() => {
      setValidRoutineName(checkValidName(routineName))
    }, [routineName])

    useEffect(() => {
      setValidRoutineDescription(checkValidDescription(routineDescription))
    }, [routineDescription])

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

    const descOverLimit = routineDescription.length > descMaxLength

    const resetInfo = () => {
      if (routine?.id) {
        setRoutineName(routine.name)
        setRoutineOrder(routine.order)
        setRoutineDescription(routine.description)
      }
    }
    
    // initial state of readMore
    useEffect(() => {
      setReadMore(!descOverLimit)
    }, [routineDescription])

    const routineFormSubmitHandler = async(e) => {
      e.preventDefault()
      setRoutineMessage('')
      
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
          const isValidName = checkValidName(routineName)
          const isValidDesc = checkValidDescription(routineDescription)
          if (!isValidName || !isValidDesc) {
            setRoutineMessage('Please provide valid inputs!')
            msgRef.current.focus()
            return
          }
          
          setEdit(false)
          form.classList.add('disabled')
          
          try {
              const body = { 
                  'name': routineName ?? '',
                  'order': routineOrder ?? 0,
                  'description': routineDescription ?? ''
              }
              // console.log(payload)
              const response = await updateRoutine({ routineId: routine.id, body, token: auth?.credentials?.token }).unwrap()
                .then((payload) => {})
                .catch((error) => {
                  msgRef.current.focus()
                  if (!error?.data) {
                    setRoutineMessage('No server response!')
                  } else if (error?.data?.message) {
                    const message = error?.data?.message ?? 'Error!'
                    setRoutineMessage(message)
                  } else {
                    setRoutineMessage('Update routine failed!')
                  }
                })
          } catch (error) {
            setRoutineMessage('Update routine failed!')
            msgRef.current.focus()
          } finally {
            form.classList.remove('disabled')
          }
          
          break
        case 'delete':
          setEdit(false)
          form.classList.add('disabled')

          try {
            const response = await deleteRoutine({routineId: routine.id, token: auth?.credentials?.token }).unwrap()
              .then((payload) => {})
              .catch((error) => {
                msgRef.current.focus()
                if (error?.data) {
                  setRoutineMessage('No server response!')
                } else if (error?.data?.message) {
                    const message = error?.data?.message ?? 'Error!'
                    setRoutineMessage(message)
                } else {
                  setRoutineMessage('Delete routine failed!')
                }
              })
          } catch (error) {
            setRoutineMessage('Delete routine failed!')
            msgRef.current.focus()
          } finally {
            form.classList.remove('disabled')
          }
      
          break
        default:
          break
      }
    }
    
    let content = ''
    if (routine?.id) {
      const description = readMore ? routine.description : `${routine.description.slice(0, descMaxLength)}...`

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
                  Edit Routine
              </button>
          </div>

      const containerClassname = classnames('routine__form', {
        // cursor_pointer: !isFetching
      })

      content = 
        <form id={routineFormId} className={containerClassname} onSubmit={routineFormSubmitHandler}>
          <div className='routine_name__div'>
            { edit ? 
              <div className='routine_name_input__div'>
                <label className='offscreen' htmlFor="routine_name__ta">Name:</label>
                <textarea type="text" id='routine_name__ta' className='routine_name__ta'
                  ref={routineNameRef}
                    onFocus={() => setRoutineNameFocus(true)}
                    onBlur={() => setRoutineNameFocus(false)}
                    aria-invalid={validRoutineName ? "false" : "true"}
                    aria-describedby="nameNote"
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                />
                <p id="nameNote" className={routineNameFocus && routineName && !validRoutineName ? "instructions" : "offscreen"}>
                    <FaCircleInfo /><br/>
                    Please enter a name that is 1 to 50 characters.
                </p>
              </div>
              :
              <h1 id='routine_name__h1' className='routine__h1'>{routineName}</h1>
              }
            <div className="door_open_svg__div cursor_pointer" onClick={() => {routineClickHandler(routine.id)}}> <FaDoorOpen/></div>
          </div>
          
          <section className="routine_info__div">
            <div className='routine__div_info'>
              <label htmlFor='routine_order__input' className='info_label info_text_padding'>Order:</label>
              <input id='routine_order__input' className='info_text_padding routine_order__input'
                value={routineOrder}
                onChange={(e) => setRoutineOrder(e.target.value)}
              />
            </div>
            <div className='routine_desc__div'>
              <label htmlFor='routine_desc__ta' className='routine_desc__label info_label info_text_padding'>Description:</label>
              {
                edit ?
                  <>
                    
                    <textarea id='routine_desc__ta' className='routine_desc__ta' rows={4}
                      onFocus={() => {setRoutineDescriptionFocus(true)}}
                      onBlur={() => {setRoutineDescriptionFocus(false)}}
                      aria-invalid={validRoutineDescription ? "false" : "true"}
                      aria-describedby="descNote"
                      value={ routineDescription }
                      onChange={(e) => {return setRoutineDescription(e.target.value)}}
                    ></textarea>
                    <p id="descNote" className={routineDescriptionFocus && routineDescription && !validRoutineDescription? "instructions" : "offscreen"}>
                        <FaCircleInfo /><br/>
                        Please enter a description that is 0 to 500 characters.
                    </p>
                  </>
                :
                <div id='routine_info_desc__div' className='routine_info_desc__div info_text_padding'>
                  { description }
                  { descOverLimit && 
                      <div className="desc_footer__div">
                          <div className='readMore cursor_pointer' onClick={toggleReadMoreHandler}>{readMore ? 'Show less' : 'Read more'}</div>
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

            { routineOptionButtons }
            <p id='routine_msg__p' ref={msgRef}>{routineMessage}</p>
          </section>
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