import React from 'react'
import { useState } from 'react'
import { useUpdateSessionQuery } from './sessionsApiSlice'

const editSession = ( { session = null } ) => {

    const [updateSession, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateSessionQuery()

    const [name, setName] = useState(session.name)
    const [order, setOrder] = useState(session.order)
    const [description, setDescription] = useState(session.description)

    const onNameChange = (e) => {
        setName(e.target.value)
    }

    const onOrderChange = (e) => {
        setOrder(e.target.value)
    }

    const onDescChange = (e) => {
        setDescription(e.target.value)
    }

    const updateSessionHandler = async(e) => {
        e.preventDefault()
        const form = e.currentTarget

        const { elements } = e.currentTarget
        const name = elements['update-ses-name__input'].value
        const order = elements['update-ses-order__input'].value
        const description = elements['update-ses-desc__input'].value

        const body = {
            name,
            order,
            description
        }

        try {
            const response = updateSession({ routineId, sessionId: session.id, body }).unwrap()

            form.reset()
        } catch (err) {
            console.log(err)
        }
    }   

    let content = ''

    if (session) {
        content = <>
            <h1>editSession</h1>
            <form onSubmit={(e) => {updateSessionHandler(e)}}>
                <label htmlFor="update-ses-name__input">Name:</label>
                <input type="text" id="update-ses-name__input" defaultValue="" required 
                    value={name}
                    onChange={onNameChange}
                />

                <label htmlFor="update-ses-order__input">Name:</label>
                <input type="number" id="update-ses-order__input" defaultValue="" required 
                    value={order}
                    onChange={onOrderChange}
                />

                <label htmlFor="update-ses-desc__input">Name:</label>
                <textarea type="text" id="update-ses-desc__input" defaultValue="" required 
                    value={description}
                    onChange={onDescChange}
                />

                <button type='submit'>UPDATE</button>
            </form>
        </>
    } else {
        <h1>No access</h1>
    }

  return (
    <section>
        { content }
    </section>
  )
}

export default editSession