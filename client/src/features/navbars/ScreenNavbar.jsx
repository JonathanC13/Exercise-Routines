import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { screenNavDispaySet } from './navbarSlice'

const ScreenNavbar = () => {
    const dispatch = useDispatch()
    const {screenNavOpen} = useSelector((state) => state.nav)

    const screenNavClasses = 'screen-nav__section' + (screenNavOpen ? '':' offscreen')

    const closeScreenNavHandler = () => {
        dispatch(screenNavDispaySet({displayState: false}))
    }

  return (
        <section className={screenNavClasses}>
            <p>PPPPP</p>
            <button onClick={closeScreenNavHandler}>CLICK ME TO CLOSE</button>
        </section>
    )
}

export default ScreenNavbar