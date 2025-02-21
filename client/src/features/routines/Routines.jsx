import React from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { useGetRoutinesQuery } from './routinesApiSlice'
import AddRoutine from './AddRoutine'
import Routine from './Routine'

const createRoutineComps = (routineIds, isFetching) => {
  
  const comps = routineIds.map((routineId) => {
    return <Routine
        key={ routineId }
        routineId={ routineId }
        isFetching={ isFetching }
      >
      </Routine>
  })

  return comps
} 

const Routines = () => {

    //Calling the `useGetRoutinesQuery()` hook automatically fetches data!
    const {
      data: routines,
      isLoading,
      isFetching,
      isSuccess,
      isError,
      error
    } = useGetRoutinesQuery('routinesList',
      {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
      }
    )
    
    const sortedRoutines = useMemo(() => {
      const sortedRoutines = routines.slice()
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
      const { ids, entities } = sortedRoutines
      const routineComps = createRoutineComps(ids, isFetching)

      const containerClassname = classnames('routines__div', {
        disabled: isFetching,
        cursor_pointer: !isFetching
      })

      content = <div className={containerClassname}>{ routineComps }</div>
    } else if (isError) {
      content = <h2 className="routines-error__h2">{error.toString()}</h2>
    }

  return (
    <section className='routines__section'>
        <h1 className='routines__h1'>Routines</h1>
        { content }
        {/* todo, add Routines button */}
    </section>
  )
}

export default Routines