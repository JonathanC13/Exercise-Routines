import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const AddRoutine = () => {
    const navigate = useNavigate()

    // controlled inputs
    const [order, setOrder] = useState(0)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [msg, setMsg] = useState('')
    // get getRoutine from apislice later

    const addRoutineHandler = () => {
        if (name.length === 0) {
            setMsg('Please provide a name!')
            return
        }
        // check if required name is present
        return
    }

  return (
    <section className="addRoutine__section">
        <form action={addRoutineHandler} className="addRoutine__form">
            <div className="addRoutine__div">
                <label htmlFor="addRoutine-order__input" className="addRoutine-order__label">Order</label>
                <input type="number" className="addRoutine-order__input" id="addRoutine-order__input" 
                    value={order}
                    onChange={(e) => {setOrder(e.target.value)}}
                />
            </div>
            <div className="addRoutine__div">
                <label htmlFor="addRoutine-name__input" className="addRoutine-name__label">Name</label>
                <input required type="text" className="addRoutine-name__input" id="addRoutine-name__input"/>
            </div>
            <div className="addRoutine__div">
                <label htmlFor="" className="addRoutine-desc__label">Description</label>
                <textarea className="addRoutine-desc__ta" id="w3review" name="addRoutine-desc__ta"></textarea>
            </div>
            <div className="addRoutine__div">
                <button className="addRoutine__button" type="submit" disabled={isLoading}>
                    Add Routine
                </button>
            </div>
            <div className="addRoutine__div">
                <p className="addRoutine__p">{msg}</p>
            </div>
        </form>
    </section>
  )
}

export default AddRoutine