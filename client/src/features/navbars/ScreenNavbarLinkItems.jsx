import React from 'react'
// import { useMemo } from 'react'
import { useGetRoutinesQuery } from '../routines/routinesApiSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { FaDoorOpen } from 'react-icons/fa6'
import ScreenNavbarLinkChildItem from './ScreenNavbarLinkChildItem'
import { currentCategorySet, categoriesHiddenSet, screenNavDispaySet, screenNavClosed } from './navbarSlice'

const createChildLinkItems = (sortedRoutines, urlTemplate, gotoDestinationHandler) => {
    const comps = sortedRoutines.map((e) => {
        return <ScreenNavbarLinkChildItem
                    key={e.id}
                    info={e}
                    urlTemplate={urlTemplate}
                    gotoDestinationHandler={gotoDestinationHandler}
                ></ScreenNavbarLinkChildItem>
    })
    return comps

}

const ScreenNavbarLinkItems = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const gotoDestinationHandler = (targetURL) => {
        navigate(targetURL)

        dispatch(screenNavClosed())
    }

  return (
    <section className='screen-nav-link-items__section'>
        <div className='screen-nav-link-item'>
            <h1 className='screen-nav-link-item__h1'>{currentCategory}</h1>

            <ul className='link-items-main__ul'>
                <li className='link-items-main__li cursor_pointer' onClick={() => gotoDestinationHandler(categoryInfo?.parent?.URL)}>
                    {/* <Link className='link-item-parent__title' to={categoryInfo[currentCategory]?.parent?.URL}>
                        <FaDoorOpen className='link-item-parent-icon__icon'></FaDoorOpen>
                        <h2>{categoryInfo[currentCategory]?.parent.title}</h2>
                    </Link> */}
                    <div className='link-item-parent-icon__div'>
                        <FaDoorOpen className='link-item-parent-icon__icon'></FaDoorOpen>
                    </div>
                    <h2 className='screen-nav-link-item__h2'>{categoryInfo?.parent?.title}</h2>
                </li>
                <ul className='link-items-sub__ul'>
                    {createChildLinkItems(sortedRoutines, categoryInfo?.children?.URL, gotoDestinationHandler)}
                </ul>
            </ul>

        </div>
    </section>
  )
}

export default ScreenNavbarLinkItems