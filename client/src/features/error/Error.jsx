import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Error = () => {
    const { status, message } = useSelector((state) => state.errorState)
    
    let errorTitle = ''
    let errorMessage = ''
    switch (status) {
        case 'FETCH_ERROR': {
            errorTitle = 'Server error.'
            errorMessage = 'Server may be offline.'
            break
        }
        default:
            errorTitle = status
            errorMessage = message
            break
    }

  return (
    <div className='error__div'>
        <section className='error__section'>
            <h1 className='error__h1'>{errorTitle}</h1>
            <p>{errorMessage}</p>
            <Link to="/">Reload home.</Link>
        </section>
    </div>
  )
}

export default Error