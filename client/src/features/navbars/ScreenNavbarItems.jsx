import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ScreenNavbarItem from './ScreenNavbarItem'
import ScreenNavbarLinkItems from './ScreenNavbarLinkItems'

const createScreenNavbarItemComps = (categories) => {
    const comps = []

    for (let key of Object.keys(categories)) {
        
        comps.push(<ScreenNavbarItem
            key={key}
            title={key}
        ></ScreenNavbarItem>)
    }
    return comps
}

const ScreenNavbarItems = () => {
    const dispatch = useDispatch()
    const { categories, currentCategory, categoriesHidden } = useSelector((state) => state.nav)

    let content = <>
        <div className={'screen-nav-content-categories__div' + (categoriesHidden ? ' screen-nav-content-categories__div-hidden':'') }>
            <div className='screen-nav-items__div'>
                {createScreenNavbarItemComps(categories)}
            </div>
        </div>
        <div className={'screen-nav-content-group__div' + (categoriesHidden ? ' screen-nav-content-group__div-show':'') }>
            <ScreenNavbarLinkItems />
        </div>
    </>

  return (
    <>
        {content}
    </>
  )
}

export default ScreenNavbarItems