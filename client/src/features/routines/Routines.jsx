import React from 'react'
import { useMemo, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetRoutinesQuery } from './routinesApiSlice'
import Routine from './Routine'
import classnames from 'classnames'
import { routineAddFormOpenChanged } from '../modals/addFormModals/addFormModalsSlice'
import { useNavigate, Navigate } from 'react-router-dom'
import { errorStatusSet, errorStatusCleared } from '../error/errorSlice'
import errorTextConversion from '../../functions/errorTextConversion'

const createRoutineComps = (sortedRoutines, isFetching) => {
  const comps = sortedRoutines.map((routine) => {
    return <Routine
        key={ routine.id }
        routineId={ routine.id }
        isFetching={ isFetching }
      >
      </Routine>
  })

  return comps
} 

const Routines = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const theme = useSelector(state => state.auth.preferredTheme)
    // const { status } = useSelector(state => state.errorState)

    const addRoutineHandler = () => {
      // open set state to open routine add form modal
      dispatch(routineAddFormOpenChanged({ addFormOpen: true, addFormType: 'routineAddForm' }))
    }

    //Calling the `useGetRoutinesQuery()` hook automatically fetches data!
    const {
      data: routines = {ids:[], entities:{}},
      refetch,
      isLoading,
      isFetching,
      isSuccess,
      isError,
      error
    } = useGetRoutinesQuery({token: auth?.credentials?.token},
      {
        pollingInterval: 100000, //60000
        refetchOnFocus: true,
        skipPollingIfUnfocused: true,
        refetchOnMountOrArgChange: true
      }
    )
    
    const sortedRoutines = useMemo(() => {
      const sortedRoutines = []
      for (let [key, val] of Object.entries(routines.entities)) {
        sortedRoutines.push(val)
      } 
      // Sort in ascending 'order', if same then descending updatedAt order
      sortedRoutines.sort((a, b) => 
        {
          const ord = a.order - b.order
          if (ord === 0) {
            return b.updatedAt.localeCompare(a.updatedAt)
          }
          return ord
        }
      )
      return sortedRoutines
    }, [routines])

    const toHome = () => {
      navigate('/')
    }

    let content = null

    if (isLoading) {
      content = <section className='routines-loading__section'>
              <h1 className='routines-loading__h1'>Is loading...</h1>
            </section>
    } else if (isSuccess) {
      // dispatch(errorStatusCleared())
      // const { ids, entities } = sortedRoutines
      const routineComps = createRoutineComps(sortedRoutines, isFetching) // isFetching will cause re-render
      const containerClassname = classnames('routines__div', {
        disabled: isFetching
      })

      const h1Class = 'routines__h1 routines__h1--color-' + theme
      
      content = 
        <>
          <div className='routines_title__div'>
            <h1 className={h1Class}>Routines</h1>
            <div className="routines_title_underline"></div>
          </div>
          <button className='cursor_pointer routines_add__button' onClick={addRoutineHandler}>Add Routine</button>
          <div className={containerClassname}>
            { routineComps }
            {/* <button onClick={refetch}>manual refetch</button>
            <button onClick={toHome}>to Home</button> */}
          </div>
        </>
      // console.log(content)
    } 
    // else if (isError) {
    //   // console.log('error: ', error)
    //   // dispatch(errorStatusSet(errorTextConversion(error)))
    //   // return <Navigate to='/error'></Navigate>
    //   /*
    //   dispatch(loggedOut())
    //   navigate('/login')
    //   */
    //   content = <h2 className="routines-error__h2">{error?.data?.message ?? 'Error with server.'}</h2>
    // }

    useEffect(() => {
      if (isError) {
        dispatch(errorStatusSet(errorTextConversion(error)))
      } else {
        dispatch(errorStatusCleared())
      }
    }, [isError])

  return (
    <section className='routines__section'>
      { content }
    </section>
  )
}

export default Routines