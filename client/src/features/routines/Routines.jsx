import React from 'react'
import { useMemo, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetRoutinesQuery } from './routinesApiSlice'
import { loggedOut } from '../auth/authSlice'
import Routine from './Routine'
import classnames from 'classnames'
import { routineAddFormOpenChanged } from '../modals/addFormModals/addFormModalsSlice'
import useRefreshToken from '../../hooks/useRefreshToken'
import { useNavigate } from 'react-router-dom'

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

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const refreshToken = useRefreshToken()

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

    const refreshRefetchHandler = async() => {
      try {
        console.log('11')
        await refreshToken()
        console.log('22')
        const responseRefetch = await refetch().unwrap()
        .then((payload) => {})
        .catch((error) => {
          return null
        })
        console.log('refetch: ', responseRefetch)
        return responseRefetch
      } catch {
        return null
      }
    }

    let content = null

    if (isLoading) {
      content = <h2 className='routines-loading__h2'>Is loading...</h2>
    } else if (isSuccess) {
      // const { ids, entities } = sortedRoutines
      const routineComps = createRoutineComps(sortedRoutines, isFetching) // isFetching will cause re-render
      const containerClassname = classnames('routines__div', {
        disabled: isFetching
      })

      content = <div className={containerClassname}>
          { routineComps }
          <button onClick={refetch}>manual refetch</button>
          <br />
          <button onClick={() => refreshToken()}>manual refresh access token</button>
        </div>
      // console.log(content)
    } else if (isError) {
      console.log(error)
      if (error?.status === 403) {
        console.log('aaaa')
        content = <button onClick={() => refreshToken()}>manual refresh access token</button>
        // retry query
        if (!refreshRefetchHandler()) {
          dispatch(loggedOut())
          useNavigate('/login')
        }
      } else {
        content = <h2 className="routines-error__h2">{error?.data?.message ?? 'Error with server.'}</h2>
      }
    }

  return (
    <section className='routines__section'>
      <div className='routines_title__div'>
        <h1 className='routines__h1'>Routines</h1>
        <div className="routines_title_underline"></div>
      </div>
      <button className='cursor_pointer routines_add__button' onClick={addRoutineHandler}>Add Routine</button>
      { content }
    </section>
  )
}

export default Routines