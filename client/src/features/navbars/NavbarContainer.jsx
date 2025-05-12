import React from 'react'
import { useState, useRef, useEffect } from 'react'

const NavbarContainer = ( {open=false, child=<></>, boundingRect={}} ) => {
    // console.log(boundingRect)

    const [keepOpen, setKeepOpen] = useState(open)

    const containerRef = useRef(null)

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
    <div className={'manage-account-container__div ' + (open || keepOpen ? '' : 'offscreen')} ref={containerRef} style={{bottom: boundingRect.height - 10}}>
        <section className='manage-account-container__section'>
            {child}
        </section>
        <div className='container-footer'>
            <div className='arrow-down'></div>
        </div>
    </div>
  )
}

export default NavbarContainer