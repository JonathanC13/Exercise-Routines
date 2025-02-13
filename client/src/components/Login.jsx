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
    const [msg, setMsg] = useState('')
    const [showSpinner, setShowSpinner] = useState(false)

    const loginHandler = async() => {
        try {
            const response = await login({email: email, password: password}).unwrap()
            console.log(response)
        } catch (err) {
            setMsg(err)
            console.log(err)
        }
    }

  return (
    <section className="login__section">
        <form className="login__form" action={loginHandler}>
            <div className="login__form__div">
                <label htmlFor="login-email__input" className="login-email__label">Email</label>
                <input required type="text" className="login-email__input" id="login-email__input" 
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
            </div>
            <div className="login__form__div">
                <label htmlFor="login-password__input" className="login-password__label">Password</label>
                <input required className="login-password__input" id="login-password__input" 
                    type= {
                        showPassword ? "text" : "password"
                    }
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                <button type="button" className="show-password__button" onClick={() => {setShowPassword(!showPassword)}}>
                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </button>
            </div>
            <div className="login__form__div">
                <button className="login__button" type="submit" disabled={isLoading}>
                    Login
                </button>
            </div>
            <div className="login__form__div">
                <p className="login__p">{msg}</p>
            </div>
            <div className="login__form__div">
                {
                    isLoading ? 
                    <div className="loader"></div> :
                    <></>
                }
            </div>
        </form>
    </section>
  )
}

export default Login