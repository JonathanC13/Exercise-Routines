import React from 'react'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../store/slices/api/authApiSlice'

const Login = () => {

    // authApiSlice mutations
    const [login, {isLoading}] = useLoginMutation()

    // controlled inputs
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const loginHandler = async() => {
        try {
            const response = await login({email: email, password: password}).unwrap()
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <section className="login__section">
        <form className="login__form" action={loginHandler}>
            <div className="email__div">
                <label htmlFor="login__input-email" className="login__label-email">Email:</label>
                <input type="text" className="login__input-email" id="login__input-email" 
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
            </div>
            <div className="password__div">
                <label htmlFor="login__input-password" className="login__label-email">Password:</label>
                <input className="login__input-password" id="login__input-password" 
                    type= {
                        showPassword ? "text" : "password"
                    }
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                <button type="button" className="toggleShowPassword" onClick={() => {setShowPassword(!showPassword)}}>
                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </button>
            </div>
            <button className="login__button" type="submit">
                Login
            </button>
        </form>
    </section>
  )
}

export default Login