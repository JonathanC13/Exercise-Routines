import React from 'react'
import { useMemo } from 'react'
import { useGetRoutinesQuery } from '../routines/routinesApiSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
// import ScreenNavbarLinkChildItem from './ScreenNavbarLinkChildItem'

// const createChildLinkItems = (sortedRoutines, urlTemplate) => {
//     const comps = sortedRoutines.map((e) => {
//         <ScreenNavbarLinkChildItem
//             key={e.id}
//             info={e}
//             urlTemplate={urlTemplate}
//         ></ScreenNavbarLinkChildItem>
//     })

//     return comps

// }

const ScreenNavbarLinkItems = () => {

    const auth = useSelector((state) => state.auth)
    const { currentCategory, categories } = useSelector((state) => state.nav)

    const {
        data: routines = {ids:[], entities:{}},
        refetch,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error
    } = useGetRoutinesQuery({token: auth?.credentials?.token})

    let content = <></>
    if (currentCategory === '' || !categories[currentCategory]?.parent?.title) {
        return content
    }

    const categoryInfo = categories[currentCategory]

    const categoryTitle = categoryInfo?.parent?.title

    // const sortedRoutines = useMemo(() => {
    //       const sortedRoutines = []
    //       for (let [key, val] of Object.entries(routines.entities)) {
    //         sortedRoutines.push(val)
    //       } 
    //       // Sort in ascending 'order', if same then descending updatedAt order
    //       sortedRoutines.sort((a, b) => 
    //         {
    //           const ord = a.order - b.order
    //           if (ord === 0) {
    //             return b.updatedAt.localeCompare(a.updatedAt)
    //           }
    //           return ord
    //         }
    //       )
    //       return sortedRoutines
    //     }, [routines])

  return (
    <section className='screen-nav-link-items__section'>
        <h1 className='screen-nav-link-items__h1'>{categoryTitle}</h1>
        <div className='screen-nav-link-items-parent__div'>
            <p>icon</p>
            <Link to={categoryInfo[currentCategory]?.parent?.URL}>{categoryTitle}</Link>
        </div>

        {/* {createChildLinkItems(sortedRoutines, categoryInfo[currentCategory]?.children?.URL)} */}
    </section>
  )
}

export default ScreenNavbarLinkItems