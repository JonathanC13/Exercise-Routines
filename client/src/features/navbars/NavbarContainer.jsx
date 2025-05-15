import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'

const NavbarContainer = ( {open=false, child=<></>, boundingRect={}} ) => {
    // console.log(boundingRect)

    const theme = useSelector(state => state.auth.preferredTheme)

    const [keepOpen, setKeepOpen] = useState(open)
    const [leftPx, setLeftPx] = useState(0)

    const containerRef = useRef(null)
    let bottomPx = boundingRect?.height ? boundingRect.height - 10 : 0

    const enableContainer = () => {
        setKeepOpen(true)
    }

    const disableContainer = () => {
        setKeepOpen(false)
    }

    useEffect(() => {
        if (containerRef.current !== null) {
            containerRef.current.addEventListener('mouseenter', enableContainer)
            containerRef.current.addEventListener('focusin', enableContainer)
            containerRef.current.addEventListener('mouseleave', disableContainer)
            containerRef.current.addEventListener('focusout', disableContainer)

            const containerRect = containerRef.current.getBoundingClientRect()
            let left = boundingRect.left + (boundingRect.width / 2) - (containerRect.width / 2)
            left = isNaN(left) ? 0 : left
            setLeftPx(left)
        }

        const cleanUp = () => {
            if (containerRef.current !== null) {
                containerRef.current.removeEventListener('mouseenter', enableContainer)
                containerRef.current.removeEventListener('focusin', enableContainer)
                containerRef.current.removeEventListener('mouseleave', disableContainer)
                containerRef.current.removeEventListener('focusout', disableContainer)
            }
        }
        return cleanUp
    }, [containerRef.current])

  return (
    <div className={`navbar-container__div navbar-container__div--color-${theme}` + ' ' + (open || keepOpen ? '' : 'offscreen')} ref={containerRef} style={{bottom: bottomPx, left: leftPx}}>
        <section className={`navbar-container__section navbar-container__section--color-${theme}`}>
            {child}
        </section>
        <div className={`container-footer`}>
            <div className={`arrow-down arrow-down--color-${theme}`}></div>
        </div>
    </div>
  )
}

export default NavbarContainer