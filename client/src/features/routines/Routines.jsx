import React from 'react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useGetRoutinesQuery } from './routinesApiSlice'
import AddRoutine from './AddRoutine'
import Routine from './Routine'
import classnames from 'classnames'

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

    //Calling the `useGetRoutinesQuery()` hook automatically fetches data!
    const {
      data: routines = {ids:[], entities:{}},
      refetch,
      isLoading,
      isFetching,
      isSuccess,
      isError,
      error
    } = useGetRoutinesQuery('routinesList',
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
          const ord = a - b
          if (ord === 0) {
            return b.updatedAt.localeCompare(a.updatedAt)
          }
          return ord
        }
      )
      return sortedRoutines
    }, [routines])

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
        </div>
      // console.log(content)
    } else if (isError) {
      content = <h2 className="routines-error__h2">{error?.error ?? 'Error with server.'}</h2>
    }

  return (
    <section className='routines__section'>
      <div className='routines_title__div'>
        <h1 className='routines__h1'>Routines</h1>
        <div className="routines_title_underline"></div>
      </div>
      { content }
      {/* todo, add Routines button */}
    </section>
  )
}

export default Routines