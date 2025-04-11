import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ScreenNavbarItem from './ScreenNavbarItem'

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
    const { categories, currentCategory } = useSelector((state) => state.nav)

    let content = '' 
    switch (currentCategory) {
        case '':
            content = createScreenNavbarItemComps(categories)
            break
        default:
            content = ''
            break
    }

  return (
    <>
        {content}
    </>
  )
}

export default ScreenNavbarItems