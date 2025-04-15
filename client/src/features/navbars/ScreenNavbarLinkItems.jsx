import React from 'react'
// import { useMemo } from 'react'
import { useGetRoutinesQuery } from '../routines/routinesApiSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { FaDoorOpen } from 'react-icons/fa6'
import ScreenNavbarLinkChildItem from './ScreenNavbarLinkChildItem'

const createChildLinkItems = (sortedRoutines, urlTemplate) => {
    const comps = sortedRoutines.map((e) => {
        return <ScreenNavbarLinkChildItem
            key={e.id}
            info={e}
            urlTemplate={urlTemplate}
        ></ScreenNavbarLinkChildItem>
    })
    return comps

}

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

    // const sortedRoutines = useMemo(() => {
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
    // return sortedRoutines
        // }, [routines])

  return (
    <section className='screen-nav-link-items__section'>
        <div className='screen-nav-link-item'>
            <h1 className='screen-nav-link-item__h1'>{currentCategory}</h1>

            <ul className='link-items-main__ul'>
                <li className='link-items-main__li'>
                    <FaDoorOpen className='link-item-parent-icon__icon'></FaDoorOpen>
                    <Link className='link-item-parent__title' to={categoryInfo[currentCategory]?.parent?.URL}>{categoryTitle}</Link>
                </li>
                <ul className='link-items-sub__ul'>

                </ul>
            </ul>

            {/* to remove, and fit into list above */}
            <div className='screen-nav-link-item__div'>
                <div className='screen-nav-link-item-content__div'>
                    <div className='link-item-parent-icon__div'>
                        <FaDoorOpen className='link-item-parent-icon__icon'></FaDoorOpen>
                    </div>

                    <div className='screen-nav-link-item-content-links__div'>
                        <Link className='link-item-parent__title' to={categoryInfo[currentCategory]?.parent?.URL}>{categoryTitle}</Link>
                        {createChildLinkItems(sortedRoutines, categoryInfo[currentCategory]?.children?.URL)}
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default ScreenNavbarLinkItems